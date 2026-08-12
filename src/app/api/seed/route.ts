import { NextResponse } from "next/server";
import { seedDatabase } from "@/lib/seed-data";

export async function GET() {
  try {
    const result = await seedDatabase();
    return NextResponse.json(result);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || "Failed to seed database" },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
