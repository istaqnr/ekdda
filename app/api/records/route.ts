// src/app/api/records/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/db/mongo";
import { CanonicalEraRecordModel } from "@/db/models.mongo";

type RecordType = "infrastructure" | "vehicle";

interface CreateRecordPayload {
  sourceSystem: string;
  type: RecordType;
  importedAt?: string; // optional, we can override with now
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

// GET /api/records  -> list all
export async function GET(_req: NextRequest) {
  try {
    await connectToDatabase();

    const records = await CanonicalEraRecordModel.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return NextResponse.json({ records });
  } catch (err: any) {
    console.error("GET /api/records error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/records  -> create new record
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = (await req.json()) as CreateRecordPayload;

    if (!body.sourceSystem || !body.type) {
      return NextResponse.json(
        { error: "sourceSystem and type are required" },
        { status: 400 }
      );
    }

    if (body.type === "infrastructure" && !body.infrastructure) {
      return NextResponse.json(
        {
          error: "infrastructure payload is required for type 'infrastructure'",
        },
        { status: 400 }
      );
    }

    if (body.type === "vehicle" && !body.vehicle) {
      return NextResponse.json(
        { error: "vehicle payload is required for type 'vehicle'" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Build document
    const doc: any = {
      sourceSystem: body.sourceSystem,
      type: body.type,
      importedAt: body.importedAt ?? now,
    };

    if (body.type === "infrastructure") {
      const infra = body.infrastructure!;
      doc.infrastructure = {
        id: infra.id ?? crypto.randomUUID(),
        label: infra.label ?? "Unnamed infrastructure element",
        eraClass: infra.eraClass ?? "http://data.europa.eu/949/NetElement",
        countryCode: infra.countryCode,
        nuts3Code: infra.nuts3Code,
        latitude: infra.latitude,
        longitude: infra.longitude,
      };
    } else {
      const veh = body.vehicle!;
      doc.vehicle = {
        id: veh.id ?? crypto.randomUUID(),
        label: veh.label ?? "Unnamed vehicle type",
        eraClass: veh.eraClass ?? "http://data.europa.eu/949/VehicleType",
        maxSpeedKmH: veh.maxSpeedKmH,
        brakingModel: veh.brakingModel,
      };
    }

    const created = await CanonicalEraRecordModel.create(doc);

    return NextResponse.json({ record: created }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/records error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
