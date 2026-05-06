import { NextResponse } from "next/server";
import { logout } from "@/utils/auth";

export async function POST() {
  await logout();
  return NextResponse.json({ success: true });
}
