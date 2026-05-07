<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## 🛡️ CRITICAL SECURITY OVERRIDES
1.  **Zero-Trust Client Components:** Assume the client is compromised. NEVER import `prisma` or any DB logic in 'use client' files. Use `server-only` as a hard boundary.
2.  **Server Action Shield:** Every Server Action is a public API. It MUST have:
    - Input Validation via **Zod**.
    - Identity Verification (Check session).
    - Authorization (Check if the user owns the data/has the role).
3.  **Data Scrubbing:** Never return raw database objects. Explicitly select fields to prevent leaking internal metadata or sensitive IDs.
4.  **No Public Secrets:** Any env var with `NEXT_PUBLIC_` is public knowledge. Strict ban on sensitive keys in public envs.
5.  **Data Preservation:** NEVER perform bulk deletions (e.g., `deleteMany({})`) or clear entire tables unless explicitly requested by the user. Always use `upsert` or target specific records by ID to preserve existing data during seeding or migrations.

<!-- END:nextjs-agent-rules -->