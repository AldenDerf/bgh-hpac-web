import { prisma } from "../utils/db";

async function main() {
  const employees = await prisma.employee.count();
  const users = await prisma.user.count();
  console.log(`Employees: ${employees}`);
  console.log(`Users: ${users}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
