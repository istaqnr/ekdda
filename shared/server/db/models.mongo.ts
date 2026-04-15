import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const InfrastructureSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    eraClass: { type: String, required: true },
    countryCode: { type: String },
    nuts3Code: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
  },
  { _id: false }
);

const VehicleSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    eraClass: { type: String, required: true },
    maxSpeedKmH: { type: Number },
    brakingModel: { type: String },
  },
  { _id: false }
);

const CanonicalEraRecordSchema = new Schema(
  {
    sourceSystem: { type: String, required: true },
    importedAt: { type: String, required: true },
    type: {
      type: String,
      enum: ["infrastructure", "vehicle"],
      required: true,
    },
    infrastructure: { type: InfrastructureSchema },
    vehicle: { type: VehicleSchema },
  },
  { timestamps: true }
);

export type CanonicalEraRecordDocument = InferSchemaType<
  typeof CanonicalEraRecordSchema
>;

export const CanonicalEraRecordModel: Model<CanonicalEraRecordDocument> =
  (models.CanonicalEraRecord as Model<CanonicalEraRecordDocument>) ||
  model<CanonicalEraRecordDocument>(
    "CanonicalEraRecord",
    CanonicalEraRecordSchema
  );
