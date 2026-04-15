// src/app/api/records/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectToDatabase } from "@/db/mongo";
import { CanonicalEraRecordModel } from "@/db/models.mongo";

interface RouteParams {
  params: { id: string };
}

type RecordType = "infrastructure" | "vehicle";

interface UpdatePayload {
  sourceSystem?: string;
  type?: RecordType;
  importedAt?: string;
  infrastructure?: {
    id?: string;
    label?: string;
    eraClass?: string;
    countryCode?: string;
    nuts3Code?: string;
    latitude?: number;
    longitude?: number;
  };
  vehicle?: {
    id?: string;
    label?: string;
    eraClass?: string;
    maxSpeedKmH?: number;
    brakingModel?: string;
  };
}

// GET /api/records/:id  -> get one
export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const record = await CanonicalEraRecordModel.findById(id).lean().exec();

    if (!record) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ record });
  } catch (err: any) {
    console.error("GET /api/records/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH /api/records/:id  -> partial update
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();

    const { id } = params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = (await req.json()) as UpdatePayload;

    const update: any = {};

    if (body.sourceSystem !== undefined)
      update.sourceSystem = body.sourceSystem;
    if (body.type !== undefined) update.type = body.type;
    if (body.importedAt !== undefined) update.importedAt = body.importedAt;

    if (body.infrastructure !== undefined) {
      update.infrastructure = body.infrastructure;
    }

    if (body.vehicle !== undefined) {
      update.vehicle = body.vehicle;
    }

    const updated = await CanonicalEraRecordModel.findByIdAndUpdate(
      id,
      update,
      {
        new: true,
      }
    )
      .lean()
      .exec();

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ record: updated });
  } catch (err: any) {
    console.error("PATCH /api/records/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/records/:id  -> delete
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const deleted = await CanonicalEraRecordModel.findByIdAndDelete(id)
      .lean()
      .exec();

    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedId: id }, { status: 200 });
  } catch (err: any) {
    console.error("DELETE /api/records/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
