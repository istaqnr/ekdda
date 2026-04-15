import { Types } from "mongoose";

import { connectToDatabase } from "@/shared/server/db/mongo";
import { CanonicalEraRecordModel } from "@/shared/server/db/models.mongo";

import { CreateRecordPayload, UpdateRecordPayload } from "./types";

export async function listRecords() {
  await connectToDatabase();
  return CanonicalEraRecordModel.find().sort({ createdAt: -1 }).lean().exec();
}

export async function getRecordById(id: string) {
  await connectToDatabase();

  if (!Types.ObjectId.isValid(id)) {
    throw new Error("INVALID_ID");
  }

  return CanonicalEraRecordModel.findById(id).lean().exec();
}

export async function createRecord(body: CreateRecordPayload) {
  await connectToDatabase();

  if (!body.sourceSystem || !body.type) {
    throw new Error("MISSING_REQUIRED_FIELDS");
  }

  if (body.type === "infrastructure" && !body.infrastructure) {
    throw new Error("MISSING_INFRASTRUCTURE");
  }

  if (body.type === "vehicle" && !body.vehicle) {
    throw new Error("MISSING_VEHICLE");
  }

  const now = new Date().toISOString();
  const doc: Record<string, unknown> = {
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

  return CanonicalEraRecordModel.create(doc);
}

export async function updateRecordById(id: string, body: UpdateRecordPayload) {
  await connectToDatabase();

  if (!Types.ObjectId.isValid(id)) {
    throw new Error("INVALID_ID");
  }

  const update: Record<string, unknown> = {};

  if (body.sourceSystem !== undefined) {
    update.sourceSystem = body.sourceSystem;
  }
  if (body.type !== undefined) {
    update.type = body.type;
  }
  if (body.importedAt !== undefined) {
    update.importedAt = body.importedAt;
  }
  if (body.infrastructure !== undefined) {
    update.infrastructure = body.infrastructure;
  }
  if (body.vehicle !== undefined) {
    update.vehicle = body.vehicle;
  }

  return CanonicalEraRecordModel.findByIdAndUpdate(id, update, { new: true })
    .lean()
    .exec();
}

export async function deleteRecordById(id: string) {
  await connectToDatabase();

  if (!Types.ObjectId.isValid(id)) {
    throw new Error("INVALID_ID");
  }

  return CanonicalEraRecordModel.findByIdAndDelete(id).lean().exec();
}
