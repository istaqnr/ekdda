export type RecordType = "infrastructure" | "vehicle";

export interface InfrastructurePayload {
  id?: string;
  label?: string;
  eraClass?: string;
  countryCode?: string;
  nuts3Code?: string;
  latitude?: number;
  longitude?: number;
}

export interface VehiclePayload {
  id?: string;
  label?: string;
  eraClass?: string;
  maxSpeedKmH?: number;
  brakingModel?: string;
}

export interface CreateRecordPayload {
  sourceSystem: string;
  type: RecordType;
  importedAt?: string;
  infrastructure?: InfrastructurePayload;
  vehicle?: VehiclePayload;
}

export interface UpdateRecordPayload {
  sourceSystem?: string;
  type?: RecordType;
  importedAt?: string;
  infrastructure?: InfrastructurePayload;
  vehicle?: VehiclePayload;
}
