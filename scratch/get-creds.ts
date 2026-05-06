import { prisma } from "../utils/db";

async function main() {
  console.log("--- Users (Admin/HPAC) ---");
  const users = await prisma.user.findMany({
    include: { employee: true },
    take: 5
  });
  users.forEach(u => {
    console.log(`ID: ${u.employeeId}, Type: ${u.userType}, Name: ${u.employee.firstname} ${u.employee.lastname}`);
  });

  console.log("\n--- Standard Employees (No Password) ---");
  const employees = await prisma.employee.findMany({
    where: { user: null },
    take: 5
  });
  employees.forEach(e => {
    console.log(`ID: ${e.employeeId}, Name: ${e.firstname} ${e.lastname}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
