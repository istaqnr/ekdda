/**
 * ERA 949 Railway Infrastructure Ontology
 * Structured representation of the JSON-LD ontology data
 */

export interface OntologyClass {
  id: string;
  type: "Class";
  label: string;
  comment?: string;
  created?: string;
  modified?: string[];
  subClassOf?: string[];
  disjointWith?: string[];
  shaclShape?: string;
  seeAlso?: string;
  scopeNote?: string;
  termStatus?: string;
}

export interface OntologyProperty {
  id: string;
  type: "ObjectProperty" | "DatatypeProperty" | "AnnotationProperty";
  label: string;
  comment?: string;
  domain?: string[];
  range?: string;
  created?: string;
  modified?: string[];
  applicable?: string;
  rinfIndex?: string[];
  shaclShape?: string[];
  xmlName?: string;
  legalDeadline?: string[];
  deprecated?: boolean;
  subPropertyOf?: string[];
  termStatus?: string;
}

export const era949Ontology: {
  classes: OntologyClass[];
  properties: OntologyProperty[];
} = {
  classes: [
    {
      id: "http://data.europa.eu/949/NetRelation",
      type: "Class",
      label: "Net Relation",
      comment: "Defines a relation between two elements.",
      created: "2024-11-29",
      modified: ["2025-03-10"],
      shaclShape: "http://data.europa.eu/949/shapes/NetRelationShape",
      seeAlso:
        "https://wiki.railtopomodel.org/wiki/Topological_structure_(network)",
      scopeNote:
        "Connectivity and the navigability between consecutive linear elements are resolved by using net relations...",
    },
    {
      id: "http://data.europa.eu/949/NonLinearElement",
      type: "Class",
      label: "Non-Linear Element",
      comment: "Represents a non-linear element in the network.",
      created: "2024-11-29",
      shaclShape: "http://data.europa.eu/949/shapes/NonLinearElementShape",
      subClassOf: ["http://data.europa.eu/949/NetElement"],
      scopeNote:
        "Non-linear elements complement the linear structure by serving as connection or interaction points...",
    },
    {
      id: "http://data.europa.eu/949/OperationalPoint",
      type: "Class",
      label: "Operational Point",
      comment:
        "An operational point (OP) means any location for train service operations, where train services may begin and end or change route...",
      created: "2020-07-29",
      modified: ["2022-07-07", "2025-01-30", "2025-03-01"],
      shaclShape: "http://data.europa.eu/949/shapes/OperationalPointShape",
      subClassOf: ["http://data.europa.eu/949/InfrastructureElement"],
      disjointWith: [
        "http://data.europa.eu/949/PlatformEdge",
        "http://data.europa.eu/949/PrimaryLocation",
        "http://data.europa.eu/949/RadioBlockCenter",
        "http://data.europa.eu/949/SectionOfLine",
        "http://data.europa.eu/949/Signal",
        "http://data.europa.eu/949/SpecialArea",
        "http://data.europa.eu/949/Switch",
        "http://data.europa.eu/949/Track",
        "http://data.europa.eu/949/Tunnel",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/RunningTrack",
      type: "Class",
      label: "Running track",
      comment:
        "A running track means any track used for train service movements...",
      created: "2020-07-29",
      modified: ["2022-07-07", "2024-09-19", "2024-11-20"],
      shaclShape: "http://data.europa.eu/949/shapes/RunningTrackShape",
      subClassOf: ["http://data.europa.eu/949/Track"],
      disjointWith: [
        "http://data.europa.eu/949/Siding",
        "http://data.europa.eu/949/Signal",
        "http://data.europa.eu/949/Switch",
        "http://data.europa.eu/949/Tunnel",
      ],
      termStatus: "stable",
      scopeNote:
        "There might be more than one track within the Section of Line...",
    },
    {
      id: "http://data.europa.eu/949/SectionOfLine",
      type: "Class",
      label: "Section Of Line",
      comment:
        "A section of line means the part of line between adjacent operational points and may consist of several tracks.",
      created: "2021-04-02",
      modified: ["2022-07-07", "2024-09-19", "2025-01-30", "2025-03-01"],
      shaclShape: "http://data.europa.eu/949/shapes/SectionOfLineShape",
      subClassOf: ["http://data.europa.eu/949/InfrastructureElement"],
      disjointWith: [
        "http://data.europa.eu/949/Signal",
        "http://data.europa.eu/949/SpecialArea",
        "http://data.europa.eu/949/Switch",
        "http://data.europa.eu/949/Track",
        "http://data.europa.eu/949/Tunnel",
      ],
      termStatus: "stable",
      scopeNote:
        "Each network shall be described using as many SoLs as necessary...",
    },
    {
      id: "http://data.europa.eu/949/PlatformEdge",
      type: "Class",
      label: "Platform edge",
      comment:
        "Platform for the purpose of RINF is understood as a platform edge...",
      created: "2021-08-02",
      modified: ["2023-11-10", "2025-01-30", "2025-03-01"],
      shaclShape: "http://data.europa.eu/949/shapes/PlatformEdgeShape",
      subClassOf: ["http://data.europa.eu/949/InfrastructureElement"],
      disjointWith: [
        "http://data.europa.eu/949/PrimaryLocation",
        "http://data.europa.eu/949/RadioBlockCenter",
        "http://data.europa.eu/949/RunningTrack",
        "http://data.europa.eu/949/SectionOfLine",
        "http://data.europa.eu/949/Siding",
        "http://data.europa.eu/949/Signal",
        "http://data.europa.eu/949/SpecialArea",
        "http://data.europa.eu/949/Switch",
        "http://data.europa.eu/949/Track",
        "http://data.europa.eu/949/Tunnel",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/Signal",
      type: "Class",
      label: "Signal",
      comment:
        "A railway signal is a visual display device (next to the tracks or via a DMI in the cabin)...",
      created: "2021-04-01",
      modified: ["2022-10-27", "2024-09-19", "2025-01-30", "2025-03-01"],
      shaclShape: "http://data.europa.eu/949/shapes/SignalShape",
      subClassOf: ["http://data.europa.eu/949/InfrastructureElement"],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/Switch",
      type: "Class",
      label: "Switch",
      comment:
        "A unit of track comprising two fixed rails (stock rails) and two movable rails (switch rails)...",
      modified: ["2025-01-30", "2025-03-01"],
      subClassOf: ["http://data.europa.eu/949/InfrastructureElement"],
      disjointWith: [
        "http://data.europa.eu/949/Track",
        "http://data.europa.eu/949/Tunnel",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/Track",
      type: "Class",
      label: "Track",
      comment: "A pair of rails over which rail borne vehicles can run.",
      created: "2024-11-20",
      modified: ["2025-01-30", "2025-03-01"],
      subClassOf: ["http://data.europa.eu/949/InfrastructureElement"],
      disjointWith: ["http://data.europa.eu/949/Tunnel"],
    },
    {
      id: "http://data.europa.eu/949/Tunnel",
      type: "Class",
      label: "Tunnel",
      comment:
        "A railway tunnel is an excavation or a construction around the track provided to allow the railway to pass...",
      created: "2020-07-29",
      modified: ["2022-07-07", "2024-09-19", "2025-01-30"],
      shaclShape: "http://data.europa.eu/949/shapes/TunnelShape",
      subClassOf: ["http://data.europa.eu/949/InfrastructureElement"],
      termStatus: "stable",
    },
  ],
  properties: [
    {
      id: "http://data.europa.eu/949/accelerationLevelCrossing",
      type: "ObjectProperty",
      label: "Acceleration allowed near level crossing",
      comment:
        "Existence of limit for acceleration of train if stopping or recovering speed close to a level crossing...",
      created: "2021-08-03",
      modified: ["2024-01-08", "2024-11-20"],
      applicable: "Y/N",
      rinfIndex: ["1.1.1.1.7.3"],
      xmlName: "IHS_AccelerationLevelCrossing",
      legalDeadline: [
        "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
      ],
      shaclShape: [
        "http://data.europa.eu/949/shapes/AccelerationLevelCrossing",
        "http://data.europa.eu/949/shapes/AccelerationLevelCrossingApplicability",
      ],
      range: "http://data.europa.eu/949/Document",
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/atoGradeAutomation",
      type: "ObjectProperty",
      label: "ATO Grade of Automation",
      comment: "ATO grade of automation installed lineside.",
      created: "2023-03-14",
      modified: ["2024-04-18", "2024-09-19"],
      applicable: "Y/N/NYA",
      rinfIndex: ["1.1.1.3.13.1", "1.2.1.1.10.1"],
      xmlName: undefined,
      legalDeadline: ["12 months after publication of Article 7 Guide"],
      shaclShape: [
        "http://data.europa.eu/949/shapes/AtoGradeAutomation",
        "http://data.europa.eu/949/shapes/AtoGradeAutomationSKOS",
      ],
      range: "http://www.w3.org/2004/02/skos/core#Concept",
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/belongsTo",
      type: "ObjectProperty",
      label: "belongs to",
      comment:
        "Indicates that an infrastructure element belongs to a certain subset that contains common characteristics.",
      created: "2024-05-24",
      modified: ["2024-10-24"],
      shaclShape: [
        "http://data.europa.eu/949/shapes/BelongsTo",
        "http://data.europa.eu/949/shapes/BelongsToUniqueIM",
      ],
      domain: ["http://data.europa.eu/949/InfrastructureElement"],
      range: "http://data.europa.eu/949/CommonCharacteristicsSubset",
    },
    {
      id: "http://data.europa.eu/949/cantDeficiency",
      type: "DatatypeProperty",
      label: "Cant deficiency",
      comment:
        "Maximum cant deficiency expressed in millimetres defined as difference between the applied cant...",
      created: "2020-08-24",
      modified: ["2021-09-10", "2024-09-19", "2025-02-28"],
      applicable: "Y",
      rinfIndex: ["1.1.1.1.4.2"],
      xmlName: "ITP_CantDeficiency",
      legalDeadline: [
        "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
      ],
      shaclShape: ["http://data.europa.eu/949/shapes/CantDeficiency"],
      range: "http://www.w3.org/2001/XMLSchema#integer",
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/conditionalRegenerativeBrake",
      type: "ObjectProperty",
      label: "Permission for regenerative braking",
      comment:
        "Indication whether regenerative braking is permitted, not permitted, or permitted under specific conditions.",
      created: "2020-08-24",
      modified: ["2023-01-20", "2024-09-25", "2024-12-10", "2025-02-28"],
      applicable: "Y/N",
      rinfIndex: ["1.1.1.2.2.4"],
      xmlName: "ECS_RegenerativeBraking",
      legalDeadline: [
        "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
      ],
      shaclShape: [
        "http://data.europa.eu/949/shapes/ConditionalRegenerativeBrake",
        "http://data.europa.eu/949/shapes/ConditionalRegenerativeBrakeSKOS",
      ],
      range: "http://www.w3.org/2004/02/skos/core#Concept",
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/conditionsSwitchClassBSystems",
      type: "ObjectProperty",
      label:
        "Special technical conditions required to switch over between ERTMS/ETCS and Class B systems",
      comment:
        "Name and/or reference of the document specifying the Special technical conditions required to switch over between ERTMS/ETCS and Class B systems.",
      created: "2022-10-28",
      modified: ["2023-03-14", "2024-04-18", "2024-11-04", "2025-02-28"],
      applicable: "Y/N/NYA",
      rinfIndex: ["1.1.1.3.8.3", "1.2.1.1.7.3"],
      shaclShape: [
        "http://data.europa.eu/949/shapes/ConditionsSwitchClassBSystems",
        "http://data.europa.eu/949/shapes/ConditionsSwitchClassBSystemsApplicability",
      ],
      legalDeadline: ["12 months after publication of Article 7 Guide"],
      range: "http://data.europa.eu/949/Document",
      subPropertyOf: [
        "http://data.europa.eu/949/transitionsBetweenSystemsObjParameter",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/conditionsSwitchTrainProtectionSystems",
      type: "DatatypeProperty",
      label:
        "Special conditions to switch over between different class B train protection, control and warning systems",
      comment:
        "Conditions to switch over between different class B train protection, control and warning systems.",
      created: "2022-10-28",
      applicable: "Y/N/NYA",
      rinfIndex: ["1.1.1.3.8.1.1", "1.2.1.1.7.1.1"],
      shaclShape: [
        "http://data.europa.eu/949/shapes/ConditionsSwitchTrainProtectionSystems",
      ],
      legalDeadline: ["12 months after publication of Article 7 Guide"],
      range: "http://www.w3.org/2001/XMLSchema#string",
      subPropertyOf: [
        "http://data.europa.eu/949/transitionsBetweenSystemsDataParameter",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/conditionsTrainFormation",
      type: "DatatypeProperty",
      label: "Conditions train formation",
      comment: "Conditions of use regarding train formation.",
      created: "2021-08-25",
      modified: ["2021-08-25"],
      range: "http://www.w3.org/2001/XMLSchema#string",
      subPropertyOf: [
        "http://data.europa.eu/949/vehicleTypeTechnicalDataCharacteristic",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/conditionsUseReflectivePlates",
      type: "ObjectProperty",
      label: "Conditions for use of reflective plates",
      comment:
        "Details of any conditions for using the reflective plates on freight corridors. Specific case for Portugal and Spain until 1.1.2025 and Belgium and France until 1.1.2026.",
      created: "2023-03-14",
      modified: ["2024-09-24"],
      applicable: "Y/N/NYA",
      rinfIndex: ["1.1.1.1.7.12.1"],
      shaclShape: [
        "http://data.europa.eu/949/shapes/ConditionsUseReflectivePlates",
        "http://data.europa.eu/949/shapes/ConditionsUseReflectivePlatesSKOS",
      ],
      legalDeadline: ["12 months after publication of Article 7 Guide"],
      range: "http://www.w3.org/2004/02/skos/core#Concept",
      subPropertyOf: [
        "http://data.europa.eu/949/healthSafetyAndEnvironmentObjParameter",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/connectedTo",
      type: "ObjectProperty",
      label: "connected to",
      comment:
        "Represents a bidirectional connection between two Track instances.",
      created: "2025-03-10",
      applicable: "Y/N/NYA",
      rinfIndex: ["1.1.1.0.1.2", "1.2.4.1"],
      legalDeadline: ["12 months after publication of Article 7 Guide"],
      domain: ["http://data.europa.eu/949/Track"],
      range: "http://data.europa.eu/949/Track",
      subPropertyOf: ["http://data.europa.eu/949/trackGenericObjParameter"],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/contactLineSystem",
      type: "ObjectProperty",
      label: "contact line system",
      comment:
        "System that is used to transmit electrical energy to road or rail vehicles.",
      created: "2020-08-24",
      modified: ["2021-09-11", "2025-02-28"],
      shaclShape: ["http://data.europa.eu/949/shapes/ContactLineSystem"],
      range: "http://data.europa.eu/949/ContactLineSystem",
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/contactLineSystemDataParameter",
      type: "DatatypeProperty",
      label: "Contact line system",
      created: "2024-10-31",
      rinfIndex: ["1.1.1.2.2"],
      subPropertyOf: ["http://data.europa.eu/949/energySubsystemDataParameter"],
    },
    {
      id: "http://data.europa.eu/949/contactLineSystemObjParameter",
      type: "ObjectProperty",
      label: "Contact line system",
      created: "2024-10-31",
      rinfIndex: ["1.1.1.2.2"],
      subPropertyOf: ["http://data.europa.eu/949/energySubsystemObjParameter"],
    },
    {
      id: "http://data.europa.eu/949/contactLineSystemType",
      type: "ObjectProperty",
      label: "Type of contact line system",
      comment: "Indication of the type of the contact line system.",
      created: "2021-08-06",
      modified: ["2021-08-06", "2025-02-28"],
      applicable: "Y/N",
      rinfIndex: ["1.1.1.2.2.1.1"],
      xmlName: "ECS_SystemType",
      shaclShape: [
        "http://data.europa.eu/949/shapes/ContactLineSystemType",
        "http://data.europa.eu/949/shapes/ContactLineSystemTypeNotElectrifiedApplicability",
        "http://data.europa.eu/949/shapes/ContactLineSystemTypeSKOS",
        "http://data.europa.eu/949/shapes/ContactLineSystemTypeThirdOrFourthRailApplicability",
      ],
      legalDeadline: [
        "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
      ],
      domain: ["http://data.europa.eu/949/ContactLineSystem"],
      range: "http://www.w3.org/2004/02/skos/core#Concept",
      subPropertyOf: [
        "http://data.europa.eu/949/contactLineSystemObjParameter",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/contactStripMaterial",
      type: "ObjectProperty",
      label: "Permitted contact strip material",
      comment:
        "Indication of which contact strip materials are permitted to be used.",
      created: "2020-08-25",
      modified: ["2021-09-12", "2024-09-25", "2025-02-28"],
      applicable: "Y/N",
      rinfIndex: ["1.1.1.2.3.4"],
      xmlName: "EPA_StripMaterial",
      shaclShape: [
        "http://data.europa.eu/949/shapes/ContactStripMaterialApplicability",
        "http://data.europa.eu/949/shapes/ContactStripMaterialSKOS",
      ],
      legalDeadline: [
        "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
      ],
      range: "http://www.w3.org/2004/02/skos/core#Concept",
      subPropertyOf: [
        "http://data.europa.eu/949/pantographObjParameter",
        "http://data.europa.eu/949/vehicleTypeTechnicalObjectCharacteristic",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/contactStripMaterialMetallicContent",
      type: "DatatypeProperty",
      label: "Contact strip material metallic content",
      comment:
        "Indication of max. percentage of contact strip material Impregnated Carbon permitted to be used.",
      created: "2023-01-25",
      modified: ["2024-09-25", "2025-02-28"],
      rinfIndex: ["1.1.1.2.3.4"],
      xmlName: "EPA_StripMaterial",
      shaclShape: [
        "http://data.europa.eu/949/shapes/ContactStripMaterialMetallicContent",
      ],
      legalDeadline: [
        "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
      ],
      range: "http://www.w3.org/2001/XMLSchema#integer",
      subPropertyOf: ["http://data.europa.eu/949/pantographDataParameter"],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/containerHandlingFlag",
      type: "DatatypeProperty",
      label: "container handling flag",
      created: "2024-06-03",
      shaclShape: ["http://data.europa.eu/949/shapes/ContainerHandlingFlag"],
      domain: ["http://data.europa.eu/949/PrimaryLocation"],
      range: "http://www.w3.org/2001/XMLSchema#boolean",
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/contains",
      type: "ObjectProperty",
      label: "contains",
      comment:
        "Indicates that a subset with common characteristics contains a certain infrastructure element.",
      created: "2024-10-31",
      shaclShape: ["http://data.europa.eu/949/shapes/Contains"],
      domain: ["http://data.europa.eu/949/CommonCharacteristicsSubset"],
      range: "http://data.europa.eu/949/InfrastructureElement",
    },
    {
      id: "http://data.europa.eu/949/crossSectionArea",
      type: "DatatypeProperty",
      label: "Cross section area",
      comment: "Smallest cross section area in square metres of the tunnel",
      created: "2021-08-03",
      modified: ["2021-08-03", "2024-09-19"],
      applicable: "Y/N",
      rinfIndex: ["1.1.1.1.8.8"],
      xmlName: "ITU_CrossSectionArea",
      shaclShape: [
        "http://data.europa.eu/949/shapes/CrossSectionAreaApplicability",
        "http://data.europa.eu/949/shapes/CrossSectionAreaT",
      ],
      legalDeadline: [
        "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
      ],
      range: "http://www.w3.org/2001/XMLSchema#integer",
      subPropertyOf: ["http://data.europa.eu/949/tunnelDataParameter"],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/currentLimitationRequired",
      type: "DatatypeProperty",
      label: "Current or power limitation on board required",
      comment:
        "Indication of whether an on board current or power limitation function on vehicles is required.",
      created: "2020-08-25",
      modified: ["2021-09-12", "2025-02-28"],
      applicable: "Y/N",
      rinfIndex: ["1.1.1.2.5.1"],
      xmlName: "ERS_PowerLimitOnBoard",
      shaclShape: [
        "http://data.europa.eu/949/shapes/CurrentLimitationRequired",
        "http://data.europa.eu/949/shapes/CurrentLimitationRequiredApplicability",
      ],
      legalDeadline: [
        "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
      ],
      domain: ["http://data.europa.eu/949/ContactLineSystem"],
      range: "http://www.w3.org/2001/XMLSchema#boolean",
      subPropertyOf: [
        "http://data.europa.eu/949/requirementsRollingStockDataParameter",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/currentlyValid",
      type: "DatatypeProperty",
      label: "Currently valid",
      created: "2022-12-13",
      domain: ["http://data.europa.eu/949/Feature"],
      range: "http://www.w3.org/2001/XMLSchema#boolean",
      deprecated: true,
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/dNvovtrp",
      type: "DatatypeProperty",
      label: "D_NVOVTRP",
      comment:
        "Maximum distance for overriding the train trip in metres, according to the specification referenced in Appendix A-1, index [C].",
      created: "2022-11-07",
      modified: ["2024-01-08", "2024-04-18", "2024-12-05"],
      applicable: "Y/N/NYA",
      rinfIndex: ["1.1.1.3.2.16.5", "1.2.1.1.1.16.5"],
      shaclShape: [
        "http://data.europa.eu/949/shapes/DNvovtrp",
        "http://data.europa.eu/949/shapes/DNvovtrpApplicability",
      ],
      legalDeadline: ["12 months after publication of Article 7 Guide"],
      range: "http://www.w3.org/2001/XMLSchema#double",
      subPropertyOf: [
        "http://data.europa.eu/949/etcsNationalValuesDataParameter",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/dNvpotrp",
      type: "DatatypeProperty",
      label: "D_NVPOTRP",
      comment:
        "Maximum distance for reversing in Post Trip mode in metres, according to the specification referenced in Appendix A-1, index [C].",
      created: "2022-11-07",
      modified: ["2023-03-14", "2024-04-18", "2024-12-05"],
      applicable: "Y/N/NYA",
      rinfIndex: ["1.1.1.3.2.16.7", "1.2.1.1.1.16.7"],
      shaclShape: [
        "http://data.europa.eu/949/shapes/DNvpotrp",
        "http://data.europa.eu/949/shapes/DNvpotrpApplicability",
      ],
      legalDeadline: ["12 months after publication of Article 7 Guide"],
      range: "http://www.w3.org/2001/XMLSchema#double",
      subPropertyOf: [
        "http://data.europa.eu/949/etcsNationalValuesDataParameter",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/dNvroll",
      type: "DatatypeProperty",
      label: "D_NVROLL",
      comment:
        "Parameter used by the ETCS on-board to supervise the distance allowed to be travelled under the roll-away protection and the reverse movement protection, in metres",
      created: "2022-11-07",
      modified: ["2023-03-14", "2024-04-18", "2024-12-05", "2025-02-28"],
      applicable: "Y/N/NYA",
      rinfIndex: ["1.1.1.3.2.16.1", "1.2.1.1.1.16.1"],
      shaclShape: [
        "http://data.europa.eu/949/shapes/DNvroll",
        "http://data.europa.eu/949/shapes/DNvrollApplicability",
      ],
      legalDeadline: ["12 months after publication of Article 7 Guide"],
      range: "http://www.w3.org/2001/XMLSchema#double",
      subPropertyOf: [
        "http://data.europa.eu/949/etcsNationalValuesDataParameter",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/dangerousGoodsTankCode",
      type: "DatatypeProperty",
      label: "Dangerous goods tank code",
      comment: "Dangerous goods for which the vehicle is suitable (tank code).",
      created: "2021-08-25",
      modified: ["2021-08-25"],
      domain: ["http://data.europa.eu/949/VehicleType"],
      range: "http://www.w3.org/2001/XMLSchema#string",
      subPropertyOf: [
        "http://data.europa.eu/949/vehicleTypeTechnicalDataCharacteristic",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/dataGSMRNetwork",
      type: "ObjectProperty",
      label: "Data GSM-R network",
      comment: "Data SIM Card GSM-R Home Network.",
      created: "2020-08-31",
      modified: ["2021-08-02"],
      domain: ["http://data.europa.eu/949/VehicleType"],
      range: "http://www.w3.org/2004/02/skos/core#Concept",
      subPropertyOf: [
        "http://data.europa.eu/949/vehicleTypeTechnicalObjectCharacteristic",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/dataRadioCompatible",
      type: "ObjectProperty",
      label: "Radio system compatibility data",
      comment:
        "Radio requirements used for demonstrating technical compatibility data.",
      created: "2020-08-31",
      modified: ["2021-09-12", "2024-04-18", "2024-09-19", "2025-03-04"],
      applicable: "Y/N/NYA",
      rinfIndex: ["1.1.1.3.3.10", "1.2.1.1.2.10"],
      shaclShape: [
        "http://data.europa.eu/949/shapes/DataRadioCompatible",
        "http://data.europa.eu/949/shapes/DataRadioCompatibleApplicability",
        "http://data.europa.eu/949/shapes/DataRadioCompatibleSKOS",
      ],
      legalDeadline: [
        "12 months after publication of Article 7 Guide for OP tracks",
        "16 January 2020",
      ],
      range: "http://www.w3.org/2004/02/skos/core#Concept",
      subPropertyOf: [
        "http://data.europa.eu/949/tsiCompliantRadioObjParameter",
        "http://data.europa.eu/949/vehicleTypeTechnicalObjectCharacteristic",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/definesSubset",
      type: "ObjectProperty",
      label: "Defines subset",
      comment:
        "(deprecated) not in use anymore. For the purposes of the register of infrastructure, each infrastructure manager may describe its railway network optionally via common characteristic subsets.",
      created: "2022-11-04",
      modified: ["2023-03-14"],
      domain: ["http://data.europa.eu/949/InfrastructureManager"],
      range: "http://data.europa.eu/949/CommonCharacteristicsSubset",
      deprecated: true,
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/demonstrationENE",
      type: "DatatypeProperty",
      label:
        "EI declaration of demonstration (as defined Recommendation 2014/881/EU) for track relating to compliance with the requirements from TSIs applicable to energy subsystem",
      comment:
        "Unique number for EI declarations following the same format requirements as specified for EC declarations in Annex VII of Commission Implementing Regulation (EU) 2019/250.",
      created: "2021-08-08",
      modified: ["2024-01-08", "2024-09-19"],
      applicable: "Y/N",
      rinfIndex: ["1.1.1.2.1.2"],
      xmlName: "EDE_EIDemonstration",
      shaclShape: ["http://data.europa.eu/949/shapes/DemonstrationENE"],
      legalDeadline: [
        "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
      ],
      range: "http://www.w3.org/2001/XMLSchema#string",
      subPropertyOf: [
        "http://data.europa.eu/949/energySubsystemDeclarationsVerificationTrackDataParameter",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/demonstrationINF",
      type: "DatatypeProperty",
      label:
        "EI declaration of demonstration (as defined in Commission 2014/881/EU (2)) relating to compliance with the requirements from TSIs applicable to infrastructure subsystem",
      comment:
        "Unique number for EI declarations following the same format requirements as specified for EC declarations in Annex VII of Commission Implementing Regulation (EU) 2019/250.",
      created: "2021-08-03",
      modified: ["2024-01-08", "2024-09-19"],
      applicable: "Y/N",
      rinfIndex: ["1.1.1.1.1.2", "1.2.1.0.1.2", "1.2.2.0.1.2"],
      xmlName: "IDE_EIDemonstration",
      shaclShape: [
        "http://data.europa.eu/949/shapes/DemonstrationINF",
        "http://data.europa.eu/949/shapes/DemonstrationINFS",
      ],
      legalDeadline: [
        "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
      ],
      range: "http://www.w3.org/2001/XMLSchema#string",
      subPropertyOf: [
        "http://data.europa.eu/949/infraSubsystemDeclarationsVerificationTrackDataParameter",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/demonstrationSRT",
      type: "DatatypeProperty",
      label:
        "EI declaration of demonstration (as defined in Recommendation 2014/881/EU) relating to compliance with the requirements from TSIs applicable to railway tunnel",
      comment:
        "Unique number for EI declarations following the same format requirements as specified for EC declarations in Annex VII of Commission Implementing Regulation (EU) 2019/250.",
      created: "2021-08-03",
      modified: ["2024-01-08", "2024-06-26", "2024-09-19"],
      applicable: "Y/N",
      rinfIndex: ["1.1.1.1.8.6", "1.2.1.0.5.4", "1.2.2.0.5.4"],
      xmlName: "ITU_EIDemonstration",
      shaclShape: ["http://data.europa.eu/949/shapes/DemonstrationSRT"],
      legalDeadline: [
        "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
      ],
      range: "http://www.w3.org/2001/XMLSchema#string",
      subPropertyOf: ["http://data.europa.eu/949/tunnelDataParameter"],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/dependencyNote",
      type: "AnnotationProperty",
      label: "dependency note",
      comment:
        "This property is used to specify dependencies in natural language not covered by skos:scopeNote",
      created: "2024-12-02",
      range: "http://www.w3.org/2001/XMLSchema#string",
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/designMassExceptionalPayload",
      type: "DatatypeProperty",
      label: "Design mass under exceptional payload",
      comment: "Design mass under exceptional payload.",
      created: "2020-08-24",
      modified: ["2020-11-03", "2024-06-26"],
      domain: ["http://data.europa.eu/949/VehicleType"],
      range: "http://www.w3.org/2001/XMLSchema#integer",
      subPropertyOf: [
        "http://data.europa.eu/949/vehicleTypeTechnicalDataCharacteristic",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/designMassNormalPayload",
      type: "DatatypeProperty",
      label: "Design mass under normal payload",
      comment: "Design mass under normal payload.",
      created: "2020-08-24",
      modified: ["2020-11-03", "2024-06-26"],
      domain: ["http://data.europa.eu/949/VehicleType"],
      range: "http://www.w3.org/2001/XMLSchema#integer",
      subPropertyOf: [
        "http://data.europa.eu/949/vehicleTypeTechnicalDataCharacteristic",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/designMassWorkingOrder",
      type: "DatatypeProperty",
      label: "Design mass in working order",
      comment: "Design mass in working order.",
      created: "2020-08-24",
      modified: ["2020-11-03", "2024-06-26"],
      domain: ["http://data.europa.eu/949/VehicleType"],
      range: "http://www.w3.org/2001/XMLSchema#integer",
      subPropertyOf: [
        "http://data.europa.eu/949/vehicleTypeTechnicalDataCharacteristic",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/dieselThermalAllowed",
      type: "DatatypeProperty",
      label: "Diesel or other thermal traction allowed",
      comment:
        "Indication whether it is allowed to use diesel or other thermal traction in the tunnel",
      created: "2021-08-09",
      modified: ["2021-08-09"],
      applicable: "Y/N",
      rinfIndex: ["1.2.1.0.5.9"],
      xmlName: "ITU_DieselThermAllowed",
      shaclShape: ["http://data.europa.eu/949/shapes/DieselThermalAllowed"],
      legalDeadline: ["1 January 2021"],
      domain: ["http://data.europa.eu/949/Tunnel"],
      range: "http://www.w3.org/2001/XMLSchema#boolean",
      subPropertyOf: ["http://data.europa.eu/949/tunnelDataParameter"],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/digitalSchematicOverview",
      type: "DatatypeProperty",
      label: "Digital schematic overview",
      comment:
        "Diagrammatic representation of the operational point in Well Known Text polyline",
      created: "2023-03-14",
      modified: ["2025-03-11"],
      applicable: "Y/N/NYA",
      rinfIndex: ["1.2.0.0.0.7.2"],
      shaclShape: ["http://data.europa.eu/949/shapes/DigitalSchematicOverview"],
      legalDeadline: [
        "12 months after publication of Article 7 Guide for OP tracks",
      ],
      domain: ["http://data.europa.eu/949/OperationalPoint"],
      range: "http://www.opengis.net/ont/geosparql#wktLiteral",
      subPropertyOf: ["http://data.europa.eu/949/opGenericDataParameter"],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/direction",
      type: "ObjectProperty",
      label: "direction",
      comment:
        "The direction of the orientation of a railway element, in relation to the carrier linear element",
      created: "2024-04-23",
      shaclShape: [
        "http://data.europa.eu/949/shapes/Direction",
        "http://data.europa.eu/949/shapes/DirectionSKOS",
      ],
      domain: ["http://data.europa.eu/949/Orientation"],
      range: "http://www.w3.org/2004/02/skos/core#Concept",
    },
    {
      id: "http://data.europa.eu/949/distSignToPhaseEnd",
      type: "DatatypeProperty",
      label: "Distance between signboard and phase separation ending",
      comment:
        "Distance between the signboard authorizing the driver to  raise pantograph  or  close the circuit breaker  after passing the phase separation and the end of the phase separation section.",
      created: "2021-08-08",
      modified: ["2021-09-12"],
      applicable: "Y/N",
      rinfIndex: ["1.1.1.2.4.3"],
      xmlName: "EOS_DistSignToPhaseEnd",
      shaclShape: ["http://data.europa.eu/949/shapes/DistSignToPhaseEnd"],
      legalDeadline: ["16 January 2020"],
      range: "http://www.w3.org/2001/XMLSchema#integer",
      subPropertyOf: [
        "http://data.europa.eu/949/oclSeparationSectionsDataParameter",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/documentRestrictionPositionContactLineSeparation",
      type: "ObjectProperty",
      label:
        "Document with restriction related to the position of Multiple Traction unit(s) to comply with contact line separation",
      comment:
        "Name and/or reference of the document specifying the restriction(s) related to the position of Multiple Traction unit(s) to comply with contact line separation.",
      created: "2023-03-14",
      modified: ["2024-11-04"],
      applicable: "Y/N/NYA",
      rinfIndex: ["1.1.1.2.5.5"],
      shaclShape: [
        "http://data.europa.eu/949/shapes/DocumentRestrictionPositionContactLineSeparation",
      ],
      legalDeadline: ["12 months after publication of Article 7 Guide"],
      range: "http://data.europa.eu/949/Document",
      subPropertyOf: [
        "http://data.europa.eu/949/requirementsRollingStockObjParameter",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/documentRestrictionPowerConsumption",
      type: "ObjectProperty",
      label:
        "Document with restriction related to power consumption of specific electric traction unit(s)",
      comment:
        "Name and/or reference of the document specifying the restriction(s) related to power consumption of specific electric traction unit(s).",
      created: "2023-03-14",
      modified: ["2024-11-04"],
      applicable: "Y/N/NYA",
      rinfIndex: ["1.1.1.2.5.4"],
      shaclShape: [
        "http://data.europa.eu/949/shapes/DocumentRestrictionPowerConsumption",
      ],
      legalDeadline: ["12 months after publication of Article 7 Guide"],
      range: "http://data.europa.eu/949/Document",
      subPropertyOf: [
        "http://data.europa.eu/949/requirementsRollingStockObjParameter",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/documentUrl",
      type: "DatatypeProperty",
      label: "Document URL",
      comment:
        "URL that is used to download a document, e.g. url for a reference document in RINF.",
      created: "2024-04-23",
      shaclShape: ["http://data.europa.eu/949/shapes/DocumentUrl"],
      domain: ["http://data.europa.eu/949/Document"],
      range: "http://www.w3.org/2001/XMLSchema#anyURI",
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/drivingCabs",
      type: "DatatypeProperty",
      label: "Driving cabs",
      comment:
        "Number of driving cabs. For wagons the number of driving cabs is to be set to zero (0).",
      created: "2021-08-24",
      modified: ["2021-08-24"],
      domain: ["http://data.europa.eu/949/VehicleType"],
      range: "http://www.w3.org/2001/XMLSchema#integer",
      subPropertyOf: [
        "http://data.europa.eu/949/vehicleTypeTechnicalDataCharacteristic",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/eddyCurrentBrakePrevention",
      type: "DatatypeProperty",
      label: "Eddy current brake prevention",
      comment:
        "Possibility of preventing the use of the eddy current track brake (only if fitted with eddy current brake)",
      created: "2020-08-24",
      modified: ["2020-11-03"],
      domain: ["http://data.europa.eu/949/VehicleType"],
      range: "http://www.w3.org/2001/XMLSchema#boolean",
      subPropertyOf: [
        "http://data.europa.eu/949/vehicleTypeTechnicalDataCharacteristic",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/eddyCurrentBraking",
      type: "ObjectProperty",
      label: "Use of eddy current brakes",
      comment: "Indication of limitations on the use of eddy current brakes.",
      created: "2020-08-24",
      modified: ["2022-09-06", "2024-09-19", "2025-02-28", "2025-03-04"],
      applicable: "Y/N/NYA",
      rinfIndex: ["1.1.1.1.6.2", "1.2.1.0.4.2"],
      shaclShape: [
        "http://data.europa.eu/949/shapes/EddyCurrentBraking",
        "http://data.europa.eu/949/shapes/EddyCurrentBrakingSKOS",
      ],
      legalDeadline: [
        "12 months after publication of Article 7 Guide for OP tracks",
        "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
      ],
      range: "http://www.w3.org/2004/02/skos/core#Concept",
      subPropertyOf: [
        "http://data.europa.eu/949/trackObjParameter",
        "http://data.europa.eu/949/trackResistanceToAppliedLoadsObjParameter",
      ],
      termStatus: "stable",
    },
    {
      id: "http://data.europa.eu/949/eddyCurrentBrakingConditionsDocument",
      type: "ObjectProperty",
      label: "Document with the conditions for the use of eddy current brakes",
      comment:
        "Electronic document available in two EU languages from the IM stored by the Agency with conditions for the use of eddy current brakes identified in 1.1.1.1.6.2.",
      created: "2020-08-24",
      modified: ["2021-09-10", "2024-04-23", "2024-09-19"],
      applicable: "Y/N",
      rinfIndex: ["1.1.1.1.6.4"],
      xmlName: "ILR_ECBDocRef",
      shaclShape: [
        "http://data.europa.eu/949/shapes/EddyCurrentBrakingConditionsDocument",
        "http://data.europa.eu/949/shapes/EddyCurrentBrakingConditionsDocumentApplicability",
      ],
      legalDeadline: ["16 January 2020"],
      range: "http://data.europa.eu/949/Document",
      subPropertyOf: [
        "http://data.europa.eu/949/trackResistanceToAppliedLoadsObjParameter",
      ],
      termStatus: "stable",
    },
  ],
};

/**
 * Helper function to get class by ID
 */
export function getClassById(id: string): OntologyClass | undefined {
  return era949Ontology.classes.find((cls) => cls.id === id);
}

/**
 * Helper function to get property by ID
 */
export function getPropertyById(id: string): OntologyProperty | undefined {
  return era949Ontology.properties.find((prop) => prop.id === id);
}

/**
 * Helper function to get all classes related to a domain
 */
export function getClassesByDomain(domain: string): OntologyClass[] {
  return era949Ontology.classes.filter((cls) =>
    cls.subClassOf?.some((parent) => parent.includes(domain))
  );
}

/**
 * Helper function to get properties by RINF index
 */
export function getPropertiesByRinfIndex(index: string): OntologyProperty[] {
  return era949Ontology.properties.filter((prop) =>
    prop.rinfIndex?.includes(index)
  );
}
