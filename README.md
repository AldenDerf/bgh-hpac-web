# BGH-HPAC Web Portal

A professional Hospital Personnel and Admin Control (HPAC) system designed for Batanes General Hospital. This application manages employee records and provides role-based access for administrative and clinical staff.

## 🚀 Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) via [Supabase](https://supabase.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Authentication:** [Supabase SSR](https://supabase.com/docs/guides/auth/server-side/nextjs) + JWT (Jose)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## ✨ Key Features

- **Role-Based Access Control (RBAC):**
  - `ADMIN`: Full system control and user management.
  - `HPAC_MEMBER`: Specialized access for committee operations.
  - `STANDARD`: General access for hospital employees.
- **Modern Authentication:** Secure login using Employee ID and encrypted passwords (Bcrypt).
- **Employee Mapping:** Seamless integration between `USER` accounts and the `bgh_employees` database.
- **Responsive Design:** Premium, mobile-friendly interface built with modern CSS practices.

## 🛠️ Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- A Supabase account and project

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd bgh-hpac-web
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your credentials:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   JWT_SECRET="your-secure-jwt-secret"
   ```

4. **Initialize Prisma:**
   ```bash
   npx prisma generate
   # To sync with your database:
   # npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `app/`: Next.js App Router (Pages and API routes)
  - `(auth)/`: Authentication-related pages (Login)
  - `admin/`: Admin-specific dashboard
  - `hpac/`: HPAC-specific dashboard
  - `standard/`: General user dashboard
- `prisma/`: Database schema and migrations
- `utils/`: Shared helper functions and Supabase clients
- `components/`: Reusable UI components

## 📄 License

This project is private and intended for use by Bataan General Hospital staff.
