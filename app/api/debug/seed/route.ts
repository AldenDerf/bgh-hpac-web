import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { hashPassword } from "@/utils/auth";

export async function GET() {
  try {
    const password = await hashPassword("password123");

    // Create Employees first
    await prisma.employee.upsert({
      where: { employeeId: "EMP-ADMIN" },
      update: {},
      create: {
        employeeId: "EMP-ADMIN",
        firstname: "Admin",
        lastname: "User",
        position: "Manager",
        section: "IT",
        employmentStatus: "Regular",
      },
    });

    await prisma.employee.upsert({
      where: { employeeId: "EMP-HPAC" },
      update: {},
      create: {
        employeeId: "EMP-HPAC",
        firstname: "Hpac",
        lastname: "Member",
        position: "Specialist",
        section: "HPAC",
        employmentStatus: "Regular",
      },
    });

    await prisma.employee.upsert({
      where: { employeeId: "EMP-STANDARD" },
      update: {},
      create: {
        employeeId: "EMP-STANDARD",
        firstname: "Standard",
        lastname: "Employee",
        position: "Staff",
        section: "Operations",
        employmentStatus: "Regular",
      },
    });

    // Create Users
    await prisma.user.upsert({
      where: { employeeId: "EMP-ADMIN" },
      update: { password, userType: "ADMIN" },
      create: {
        employeeId: "EMP-ADMIN",
        password,
        userType: "ADMIN",
      },
    });

    await prisma.user.upsert({
      where: { employeeId: "EMP-HPAC" },
      update: { password, userType: "HPAC_MEMBER" },
      create: {
        employeeId: "EMP-HPAC",
        password,
        userType: "HPAC_MEMBER",
      },
    });

    await prisma.user.upsert({
      where: { employeeId: "EMP-STANDARD" },
      update: { password, userType: "EMPLOYEE" },
      create: {
        employeeId: "EMP-STANDARD",
        password,
        userType: "EMPLOYEE",
      },
    });

    return NextResponse.json({ success: true, message: "Users seeded. Password: password123" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
