import { NextResponse } from "next/server";
import { connectDB } from "@/lib/databaseConnection";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({
      success: true,
      message: "Database connected successfully",
    });
  } catch (error) {
    console.error("DB ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
