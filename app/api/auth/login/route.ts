import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { verifyPassword, login } from "@/utils/auth";

export async function POST(request: Request) {
  try {
    const { employeeId, password } = await request.json();

    // 1. Check if the ID exists in the bgh_employees table
    const employee = await prisma.employee.findUnique({
      where: { employeeId },
      include: { user: true },
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Employee ID not found in BGH records" },
        { status: 404 }
      );
    }

    // 2. Determine User Type and Authentication
    let userType: "ADMIN" | "HPAC_MEMBER" | "EMPLOYEE" | "STANDARD";
    let redirect = "/employee";

    if (employee.user) {
      // Administrative User (Admin or HPAC Member)
      if (!password) {
        return NextResponse.json(
          { error: "Password is required for this account type", requiresPassword: true },
          { status: 401 }
        );
      }

      const isValid = await verifyPassword(password, employee.user.password);
      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid password" },
          { status: 401 }
        );
      }

      const userRole = employee.user.userType as string;
      userType = userRole === "STANDARD" ? "EMPLOYEE" : userRole as any;
      
      if (userType === "ADMIN") redirect = "/admin";
      else if (userType === "HPAC_MEMBER") redirect = "/hpac";
      else redirect = "/employee";
    } else {
      // Employee User (Employee but not in User table)
      userType = "EMPLOYEE";
      redirect = "/employee";
    }

    // 3. Create Session
    await login({
      id: employee.user?.id,
      employeeId: employee.employeeId,
      userType: userType,
    });

    return NextResponse.json({ success: true, redirect });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
