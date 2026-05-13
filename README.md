# BGH-HPAC Web Portal 🏥

A state-of-the-art Hospital Personnel and Admin Control (HPAC) system designed specifically for Batanes General Hospital. This portal serves as the central hub for administrative oversight, employee management, and award proposal workflows.

---

## 🏗️ Core Architecture & Tech Stack

This project is built using modern web standards to ensure high performance, security, and a premium user experience.

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) using Turbopack for development.
- **Database:** [PostgreSQL](https://www.postgresql.org/) hosted via [Supabase](https://supabase.com/) with connection pooling (PgBouncer).
- **ORM:** [Prisma](https://www.prisma.io/) for type-safe database interactions.
- **State Management & Mutations:** [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) for all database changes with automatic `revalidatePath` cache purging.
- **Security:** 
  - **Middleware Enforced:** Custom `proxy.ts` middleware for role-based route protection and mandatory security redirects.
  - **Auth:** JWT-based sessions (Jose) with secure, http-only cookies and `callbackUrl` support for seamless post-login redirection.
  - **Hashing:** `bcryptjs` for secure password storage.
- **Design:** Vanilla CSS with a focus on "Glassmorphism," micro-animations, and high-contrast accessibility.

---

## ✨ Key Features & Workflows

### 1. Administrative User Management (`/admin/users`)
*   **Employee Records:** Full CRUD operations for hospital personnel mapping to a dedicated `bgh_employees` table.
*   **Safe Deletion with Undo:** Deleting an employee triggers a 60-second "Soft-Delete" window. An interactive toast allows admins to **Undo** the action before it becomes permanent in the database.
*   **Promotion Manager:** A custom, interactive modal for promoting employees to `ADMIN` or `HPAC_MEMBER` roles.
*   **Password Resets:** Admins can instantly reset any user's password to the default `hpacpassword`, which automatically triggers a mandatory change on their next login.

### 2. Award Proposal System (`/admin/awards`)
*   **Dynamic Dashboard:** Real-time summary cards for "Pending," "Authorized," and "Rejected" proposals.
*   **Status Management:** Streamlined workflow for approving or archiving award proposals.
*   **History Archive:** Rejected awards are moved to a searchable archive where they can be viewed or restored to a pending state.

### 3. Mandatory Security Policy (`/change-password`)
*   **First-Login Enforcement:** New users or those with reset passwords are automatically intercepted by middleware and forced to a mandatory `/change-password` route.
*   **Validation:** Enforces a minimum 8-character password policy with live "Show Password" toggles.
*   **Success Feedback:** A premium success screen confirms the update before redirecting the user back to the login page for a fresh, secure session.

### 4. Health Worker's Week 2026 (`/health_worker_week_2026`)
*   **Peer Recognition:** An interactive portal where employees can nominate colleagues for specialized award categories.
*   **Smart Categorization:** Awards are dynamically split into "Available" and "Completed" sections. Once a vote is cast, it moves to the personal "Your Nominations" archive.
*   **Transparency:** Users can review their cast votes, including the nominee's name, the award description, and the specific reason provided for the nomination.
*   **Full-Width Experience:** Optimized layout for a focused, distraction-free recognition workflow.

---

## 🔐 Security Model & Access Control

### Role Definitions:
- **`ADMIN`**: Can manage employees, assign/remove roles, reset passwords, and oversee all award proposals.
- **`HPAC_MEMBER`**: Can create award proposals and view authorized results.
- **`EMPLOYEE`**: General access to personal dashboard and event attendance.

### Data Integrity:
- **Soft Delete:** The `deletedAt` field on the `Employee` model prevents accidental data loss and enables the "Undo" feature.
- **Relational Integrity:** Users are strictly mapped to an `employeeId` to ensure all system accounts correspond to verified hospital personnel.

---

## 🛠️ Development Guide for AI Agents

When working on this codebase, adhere to these standards:

1.  **Mutations:** Always use **Server Actions** in `actions.ts` files. Do not use plain API fetch calls for database changes unless strictly necessary for third-party integrations.
2.  **Revalidation:** Every Server Action must call `revalidatePath()` for the relevant route to keep the App Router cache synchronized.
3.  **UI/UX:** Maintain the premium aesthetic. Use `animate-in`, `fade-in`, and `zoom-in` classes for modals. Use HSL-based color palettes for consistent glassmorphism.
4.  **Database Changes:** 
    *   Update `schema.prisma`.
    *   Run `$env:DATABASE_URL="..."; npx prisma db push`.
    *   Run `npx prisma generate`.
    *   **CRITICAL:** Clear the `.next` folder if Turbopack doesn't pick up schema changes.
5.  **Middleware:** Any new protected routes must be added to the matchers in `proxy.ts`.

---

## 📁 Project Structure Highlights

- `/app/admin/users/actions.ts`: Contains all server-side logic for the User Management portal.
- `/app/health_worker_week_2026`: The core recognition portal logic and nomination workflows.
- `/proxy.ts`: The central security gateway enforcing authentication and password policies.
- `/utils/db.ts`: Singleton Prisma client initialization with PostgreSQL adapter support.
- `/utils/auth.ts`: Session management, encryption, and password hashing utilities.

---

## 📄 License & Ownership
This project is proprietary and intended for the exclusive use of **Batanes General Hospital**.
Developed with ❤️ by the Alden Derf.
