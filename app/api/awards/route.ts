import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { decrypt } from "@/utils/auth";
import { cookies } from "next/headers";

// GET all awards (with optional status filter)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  try {
    const awards = await prisma.award.findMany({
      where: status ? { status: status as any } : {},
      include: {
        createdBy: {
          select: {
            employee: {
              select: {
                firstname: true,
                lastname: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(awards);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch awards" }, { status: 500 });
  }
}

// POST new award (HPAC_MEMBER or ADMIN only)
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await decrypt(session);
    const userType = payload.user.userType;

    if (userType !== "HPAC_MEMBER" && userType !== "ADMIN") {
      return NextResponse.json({ error: "Only HPAC members or Admins can create awards" }, { status: 403 });
    }

    const { name, description } = await request.json();

    if (!name || !description) {
      return NextResponse.json({ error: "Name and description are required" }, { status: 400 });
    }

    // Fallback: If id is missing in payload, fetch it from DB using employeeId
    let userId = payload.user.id;
    if (!userId) {
      const user = await prisma.user.findUnique({
        where: { employeeId: payload.user.employeeId },
        select: { id: true },
      });
      userId = user?.id;
    }

    if (!userId) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    const award = await prisma.award.create({
      data: {
        name,
        description,
        createdById: userId,
        status: "PENDING", // Default
      },
    });

    return NextResponse.json(award);
  } catch (error) {
    console.error("Create award error:", error);
    return NextResponse.json({ error: "Failed to create award" }, { status: 500 });
  }
}
