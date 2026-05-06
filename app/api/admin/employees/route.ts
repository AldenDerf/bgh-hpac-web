import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { getSession } from "@/utils/auth";

export async function GET() {
  const session = await getSession();
  if (!session || session.user.userType !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const employees = await prisma.employee.findMany({
      where: { deletedAt: null },
      include: { user: true },
      orderBy: { lastname: "asc" },
    });
    return NextResponse.json(employees);
  } catch (error: any) {
    console.error("GET Employees Error Details:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });
    return NextResponse.json({ 
      error: "Failed to fetch employees",
      details: error.message 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.user.userType !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const employee = await prisma.employee.create({
      data: {
        employeeId: data.employeeId,
        firstname: data.firstname,
        middleName: data.middleName,
        lastname: data.lastname,
        suffix: data.suffix,
        position: data.position,
        section: data.section,
        employmentStatus: data.employmentStatus,
      },
    });
    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session || session.user.userType !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { employeeId, action, ...data } = await request.json();
    
    if (action === "restore") {
      const employee = await prisma.employee.update({
        where: { employeeId },
        data: { deletedAt: null },
      });
      return NextResponse.json(employee);
    }

    const employee = await prisma.employee.update({
      where: { employeeId },
      data,
    });
    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session || session.user.userType !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { employeeId } = await request.json();
    const employee = await prisma.employee.update({
      where: { employeeId },
      data: { deletedAt: new Date() },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
  }
}
