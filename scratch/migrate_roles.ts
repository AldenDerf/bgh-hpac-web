import { Pool } from "pg";

const connectionString = "postgresql://postgres.iabzzuglcqiuqmfxjrzp:BGH_hpacp%40ssw0rd@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres";

async function migrateRoles() {
  const pool = new Pool({ connectionString });
  try {
    console.log("Checking for 'STANDARD' roles in USER table...");
    const res = await pool.query("SELECT id, user_type FROM \"USER\" WHERE user_type::text = 'STANDARD'");
    console.log(`Found ${res.rowCount} users with legacy 'STANDARD' role.`);

    if (res.rowCount > 0) {
      console.log("Migrating 'STANDARD' roles to 'EMPLOYEE'...");
      // We need to handle the enum issue. If the enum hasn't been updated yet, we might need to cast or use a temporary type.
      // But actually, we can just update the string value if it's currently allowed.
      // Wait, if Prisma failed to update the enum, it means 'EMPLOYEE' isn't in the enum yet!
      
      // I should add 'EMPLOYEE' to the enum first, then update rows, then remove 'STANDARD'.
      // But Prisma tries to do it all at once.
      
      // I'll try to update them to 'HPAC_MEMBER' temporarily or just run a raw SQL to alter the enum.
      
      await pool.query("ALTER TYPE \"UserType\" ADD VALUE IF NOT EXISTS 'EMPLOYEE'");
      await pool.query("UPDATE \"USER\" SET user_type = 'EMPLOYEE' WHERE user_type::text = 'STANDARD'");
      console.log("Migration successful.");
    }
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await pool.end();
  }
}

migrateRoles();
