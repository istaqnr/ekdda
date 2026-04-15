import { NextRequest, NextResponse } from "next/server";
import {
  deleteRecordById,
  getRecordById,
  updateRecordById,
} from "@/features/records/server/service";
import { UpdateRecordPayload } from "@/features/records/server/types";

interface RouteParams {
  params: { id: string };
}

// GET /api/records/:id  -> get one
export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const record = await getRecordById(id);

    if (!record) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ record });
  } catch (err: any) {
    if (err instanceof Error && err.message === "INVALID_ID") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    console.error("GET /api/records/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH /api/records/:id  -> partial update
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = (await req.json()) as UpdateRecordPayload;
    const updated = await updateRecordById(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ record: updated });
  } catch (err: any) {
    if (err instanceof Error && err.message === "INVALID_ID") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    console.error("PATCH /api/records/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/records/:id  -> delete
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const deleted = await deleteRecordById(id);

    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedId: id }, { status: 200 });
  } catch (err: any) {
    if (err instanceof Error && err.message === "INVALID_ID") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    console.error("DELETE /api/records/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
