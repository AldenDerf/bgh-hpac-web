"use server";

import { prisma } from "@/utils/db";
import { getSession } from "@/utils/auth";
import { revalidatePath } from "next/cache";

export async function getEmployees() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  try {
    return await prisma.employee.findMany({
      where: { deletedAt: null },
      orderBy: { lastname: "asc" }
    });
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    return [];
  }
}

export async function submitNomination(formData: { awardId: string; nomineeId: string; reason?: string }) {
  const session = await getSession();
  if (!session) return { error: "You must be logged in to nominate." };

  try {
    // Check if user already nominated for this award
    const existing = await prisma.nomination.findUnique({
      where: {
        awardId_nominatorId: {
          awardId: formData.awardId,
          nominatorId: session.user.employeeId
        }
      }
    });

    if (existing) {
      return { error: "You have already nominated someone for this category." };
    }

    await prisma.nomination.create({
      data: {
        awardId: formData.awardId,
        nomineeId: formData.nomineeId,
        nominatorId: session.user.employeeId,
        reason: formData.reason
      }
    });

    revalidatePath("/health_worker_week_2026");
    return { success: true };
  } catch (error) {
    console.error("Nomination failed:", error);
    return { error: "Failed to submit nomination. Please try again." };
  }
}

export async function getUserNominations() {
  const session = await getSession();
  if (!session) return [];

  try {
    const nominations = await prisma.nomination.findMany({
      where: { nominatorId: session.user.employeeId },
      select: { awardId: true }
    });
    return nominations.map(n => n.awardId);
  } catch (error) {
    console.error("Failed to fetch user nominations:", error);
    return [];
  }
}
