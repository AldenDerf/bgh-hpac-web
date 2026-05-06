import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { verifyPassword, login } from "@/utils/auth";

export async function POST(request: Request) {
  try {
    const { employeeId, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { employeeId },
      include: { employee: true },
    });

    if (!user || !(await verifyPassword(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid employee ID or password" },
        { status: 401 }
      );
    }

    await login({
      employeeId: user.employeeId,
      userType: user.userType,
    });

    // Determine redirect based on role
    let redirect = "/standard";
    if (user.userType === "ADMIN") redirect = "/admin";
    else if (user.userType === "HPAC_MEMBER") redirect = "/hpac";

    return NextResponse.json({ success: true, redirect });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
