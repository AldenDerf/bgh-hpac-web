"use server";

import { prisma } from "@/utils/db";
import { getSession } from "@/utils/auth";

export async function getNominationSummary() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  // Only ADMIN and HPAC_MEMBER can see results
  if (session.user.userType !== "ADMIN" && session.user.userType !== "HPAC_MEMBER") {
    throw new Error("Forbidden");
  }

  try {
    // 1. Total Nominations Cast
    const totalNominations = await prisma.nomination.count();

    // 2. Unique Voters (Total employees who participated)
    const uniqueVoters = await prisma.nomination.groupBy({
      by: ['nominatorId'],
    });

    // 3. Nominations per Section
    const nominationsBySection = await prisma.nomination.findMany({
      select: {
        nominator: {
          select: {
            section: true,
          },
        },
      },
    });

    const sectionCounts: Record<string, number> = {};
    nominationsBySection.forEach((n) => {
      const section = n.nominator.section;
      sectionCounts[section] = (sectionCounts[section] || 0) + 1;
    });

    // 4. Results per Award
    const awardsWithResults = await prisma.award.findMany({
      where: { status: "APPROVED" },
      include: {
        nominations: {
          include: {
            nominee: {
              select: {
                firstname: true,
                lastname: true,
                section: true,
              }
            }
          }
        }
      }
    });

    const resultsPerAward = awardsWithResults.map((award) => {
      const nomineeStats: Record<string, { name: string; section: string; count: number }> = {};
      
      award.nominations.forEach((n) => {
        const id = n.nomineeId;
        if (!nomineeStats[id]) {
          nomineeStats[id] = {
            name: `${n.nominee.firstname} ${n.nominee.lastname}`,
            section: n.nominee.section,
            count: 0,
          };
        }
        nomineeStats[id].count++;
      });

      return {
        id: award.id,
        name: award.name,
        totalVotes: award.nominations.length,
        topNominees: Object.values(nomineeStats).sort((a, b) => b.count - a.count),
      };
    });

    return {
      totalNominations,
      uniqueVoters: uniqueVoters.length,
      sectionCounts: Object.entries(sectionCounts).map(([section, count]) => ({ section, count })),
      resultsPerAward,
    };
  } catch (error) {
    console.error("Failed to fetch nomination summary:", error);
    throw new Error("Failed to load results");
  }
}
