import { prisma } from "../utils/db";

async function main() {
  try {
    console.log("Checking database connection...");
    const employeeCount = await prisma.employee.count();
    console.log(`Found ${employeeCount} employees.`);
    
    const firstEmployee = await prisma.employee.findFirst({
      include: { user: true }
    });
    console.log("First employee:", JSON.stringify(firstEmployee, null, 2));
  } catch (error) {
    console.error("Database check failed:", error);
  } finally {
    process.exit();
  }
}

main();
