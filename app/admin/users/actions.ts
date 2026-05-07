"use server";

import { prisma } from "@/utils/db";
import { UserType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getSession } from "@/utils/auth";

async function checkAdmin() {
  const session = await getSession();
  if (!session || session.user.userType !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

export async function createEmployee(data: any) {
  await checkAdmin();
  try {
    await prisma.employee.create({
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
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create employee" };
  }
}

export async function updateEmployee(employeeId: string, data: any) {
  await checkAdmin();
  try {
    await prisma.employee.update({
      where: { employeeId },
      data,
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update employee" };
  }
}

export async function deleteEmployeeAction(employeeId: string) {
  await checkAdmin();
  try {
    await prisma.employee.update({
      where: { employeeId },
      data: { deletedAt: new Date() },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete employee" };
  }
}

export async function restoreEmployeeAction(employeeId: string) {
  await checkAdmin();
  try {
    await prisma.employee.update({
      where: { employeeId },
      data: { deletedAt: null },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { error: "Failed to restore employee" };
  }
}

export async function assignRoleAction(employeeId: string, userType: UserType) {
  await checkAdmin();
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { employeeId } });
    
    if (existingUser) {
      await prisma.user.update({
        where: { employeeId },
        data: { userType },
      });
    } else {
      await prisma.user.create({
        data: {
          employeeId,
          userType,
          requiresPasswordChange: true,
          password: await (await import("@/utils/auth")).hashPassword("hpacpassword"),
        },
      });
    }
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { error: "Failed to assign role" };
  }
}

export async function removeRoleAction(employeeId: string) {
  await checkAdmin();
  try {
    await prisma.user.delete({ where: { employeeId } });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { error: "Failed to remove role" };
  }
}

export async function resetPasswordAction(employeeId: string) {
  await checkAdmin();
  try {
    const hashedPassword = await (await import("@/utils/auth")).hashPassword("hpacpassword");
    await prisma.user.update({
      where: { employeeId },
      data: { 
        password: hashedPassword,
        requiresPasswordChange: true 
      },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { error: "Failed to reset password" };
  }
}
