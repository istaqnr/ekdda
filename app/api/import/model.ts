// src/lib/era/model.ts

// A very simplified subset of the ERA ontology
// We will expand this as we go.

export type EraUri = string;

// Example: infrastructure element (track, tunnel, station, operational point, etc.)
export interface InfrastructureElement {
  id: string; // internal UUID or database id
  label: string; // human-readable name
  eraClass: EraUri; // e.g. "http://data.europa.eu/949/NetElement"
  countryCode?: string; // ISO country code
  nuts3Code?: string; // NUTS3 region, related to era:inNUTS3
  latitude?: number;
  longitude?: number;
}

// Example: vehicle type (simplified from ERATV)
export interface VehicleType {
  id: string;
  label: string;
  eraClass: EraUri; // e.g. "http://data.europa.eu/949/VehicleType"
  maxSpeedKmH?: number;
  brakingModel?: string; // linked to “National Values used for the brake model”
}

// Unified “canonical” representation of what we store
export interface CanonicalEraRecord {
  sourceSystem: string; // name of source system (e.g. "LegacyDB", "CSV-RINF-Export")
  importedAt: string; // ISO timestamp
  type: "infrastructure" | "vehicle";
  infrastructure?: InfrastructureElement;
  vehicle?: VehicleType;
}
