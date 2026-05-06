import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { decrypt } from "@/utils/auth";
import { cookies } from "next/headers";

// PATCH award status (ADMIN only)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await decrypt(session);
    const userType = payload.user.userType;

    if (userType !== "ADMIN") {
      return NextResponse.json({ error: "Only Admins can approve/reject awards" }, { status: 403 });
    }

    const { status } = await request.json();

    if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const award = await prisma.award.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(award);
  } catch (error) {
    console.error("Update award status error:", error);
    return NextResponse.json({ error: "Failed to update award status" }, { status: 500 });
  }
}
