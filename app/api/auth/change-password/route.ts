import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { decrypt, encrypt, hashPassword } from "@/utils/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await decrypt(session);
    const { password } = await request.json();

    if (password.length < 8) {
      return NextResponse.json({ error: "Password too short" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    // Update user in DB
    const updatedUser = await prisma.user.update({
      where: { employeeId: payload.user.employeeId },
      data: {
        password: hashedPassword,
        requiresPasswordChange: false,
      },
    });

    // Create a new session with updated requiresPasswordChange flag
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const newSession = await encrypt({
      user: {
        ...payload.user,
        requiresPasswordChange: false,
      },
      expires,
    });

    cookieStore.set("session", newSession, {
      expires,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    // Determine redirect
    let redirect = "/employee";
    if (updatedUser.userType === "ADMIN") redirect = "/admin";
    else if (updatedUser.userType === "HPAC_MEMBER") redirect = "/hpac";

    return NextResponse.json({ success: true, redirect });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}
