import { NextRequest, NextResponse } from "next/server";
import { createRecord, listRecords } from "@/features/records/server/service";
import { CreateRecordPayload } from "@/features/records/server/types";

// GET /api/records  -> list all
export async function GET() {
  try {
    const records = await listRecords();
    return NextResponse.json({ records });
  } catch (err: unknown) {
    console.error("GET /api/records error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/records  -> create new record
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateRecordPayload;
    const created = await createRecord(body);

    return NextResponse.json({ record: created }, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message === "MISSING_REQUIRED_FIELDS") {
        return NextResponse.json(
          { error: "sourceSystem and type are required" },
          { status: 400 },
        );
      }
      if (err.message === "MISSING_INFRASTRUCTURE") {
        return NextResponse.json(
          {
            error:
              "infrastructure payload is required for type 'infrastructure'",
          },
          { status: 400 },
        );
      }
      if (err.message === "MISSING_VEHICLE") {
        return NextResponse.json(
          { error: "vehicle payload is required for type 'vehicle'" },
          { status: 400 },
        );
      }
    }

    console.error("POST /api/records error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
