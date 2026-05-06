import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { getSession, hashPassword } from "@/utils/auth";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.user.userType !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { employeeId, userType } = await request.json();
    const defaultPassword = await hashPassword("hpacpassword");

    const user = await prisma.user.upsert({
      where: { employeeId },
      update: {
        userType,
        requiresPasswordChange: true,
      },
      create: {
        employeeId,
        userType,
        password: defaultPassword,
        requiresPasswordChange: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to promote user" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session || session.user.userType !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { employeeId } = await request.json();
    
    // Check if trying to delete self
    if (employeeId === session.user.employeeId) {
      return NextResponse.json({ error: "Cannot remove your own admin role" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { employeeId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove user role" }, { status: 500 });
  }
}

// Reset Password
export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session || session.user.userType !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { employeeId } = await request.json();
    const defaultPassword = await hashPassword("hpacpassword");

    await prisma.user.update({
      where: { employeeId },
      data: {
        password: defaultPassword,
        requiresPasswordChange: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
}
