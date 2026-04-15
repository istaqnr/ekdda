import { connectToDatabase } from "@/db/mongo";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    return NextResponse.json({
      status: "connected",
      host: conn.connection.host,
      name: conn.connection.name,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        status: "error",
        message: e.message,
      },
      { status: 500 }
    );
  }
}
