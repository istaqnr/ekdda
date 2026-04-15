// src/app/api/import/raw/route.ts
import { NextRequest, NextResponse } from "next/server";
import { CanonicalEraRecord } from "./model";
import { connectToDatabase } from "@/shared/server/db/mongo";
import { CanonicalEraRecordModel } from "@/shared/server/db/models.mongo";

interface RawImportPayload {
  sourceSystem: string;
  type: "infrastructure" | "vehicle";
  data: any; // will tighten this later
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RawImportPayload;

    if (!body.sourceSystem || !body.type || !body.data) {
      return NextResponse.json(
        { error: "sourceSystem, type and data are required" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    let record: CanonicalEraRecord;

    if (body.type === "infrastructure") {
      const {
        id,
        label,
        eraClass,
        countryCode,
        nuts3Code,
        latitude,
        longitude,
      } = body.data;

      record = {
        sourceSystem: body.sourceSystem,
        importedAt: now,
        type: "infrastructure",
        infrastructure: {
          id: id ?? crypto.randomUUID(),
          label: label ?? "Unnamed infrastructure element",
          eraClass: eraClass ?? "http://data.europa.eu/949/NetElement",
          countryCode: countryCode,
          nuts3Code: nuts3Code,
          latitude: latitude,
          longitude: longitude,
        },
      };
    } else {
      const { id, label, eraClass, maxSpeedKmH, brakingModel } = body.data;

      record = {
        sourceSystem: body.sourceSystem,
        importedAt: now,
        type: "vehicle",
        vehicle: {
          id: id ?? crypto.randomUUID(),
          label: label ?? "Unnamed vehicle type",
          eraClass: eraClass ?? "http://data.europa.eu/949/VehicleType",
          maxSpeedKmH,
          brakingModel,
        },
      };
    }

    // --- DB: connect and save ---
    await connectToDatabase();
    const created = await CanonicalEraRecordModel.create(record);

    return NextResponse.json(
      {
        record: created,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Import error:", err);
    return NextResponse.json(
      { error: "Invalid JSON or server error" },
      { status: 500 }
    );
  }
}
