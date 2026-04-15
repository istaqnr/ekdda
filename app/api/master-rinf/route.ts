import { NextRequest, NextResponse } from "next/server";

// Mock data for Master RAF (Railway Asset Facility)
const mockData = [
  {
    id: 1,
    assetCode: "RAF-001",
    assetName: "Κεντρικός Σταθμός Αθηνών",
    assetType: "Station",
    category: "Major Hub",
    status: "Operational",
    location: "Athens",
    owner: "OSE",
    constructionYear: 1869,
    lastInspection: "2025-01-15",
    nextInspection: "2025-07-15",
    maintenanceStatus: "Good",
    criticality: "High",
    coordinates: "37.9908°N, 23.7133°E",
  },
  {
    id: 2,
    assetCode: "RAF-002",
    assetName: "Σταθμός Θεσσαλονίκης",
    assetType: "Station",
    category: "Major Hub",
    status: "Operational",
    location: "Thessaloniki",
    owner: "OSE",
    constructionYear: 1894,
    lastInspection: "2025-02-20",
    nextInspection: "2025-08-20",
    maintenanceStatus: "Excellent",
    criticality: "High",
    coordinates: "40.6401°N, 22.9444°E",
  },
  {
    id: 3,
    assetCode: "RAF-003",
    assetName: "Γέφυρα Γοργοποτάμου",
    assetType: "Bridge",
    category: "Infrastructure",
    status: "Operational",
    location: "Lamia",
    owner: "OSE",
    constructionYear: 1905,
    lastInspection: "2024-11-10",
    nextInspection: "2025-05-10",
    maintenanceStatus: "Fair",
    criticality: "Critical",
    coordinates: "38.9167°N, 22.3833°E",
  },
  {
    id: 4,
    assetCode: "RAF-004",
    assetName: "Τούνελ Τέμπων",
    assetType: "Tunnel",
    category: "Infrastructure",
    status: "Operational",
    location: "Vale of Tempe",
    owner: "OSE",
    constructionYear: 2003,
    lastInspection: "2025-01-05",
    nextInspection: "2025-07-05",
    maintenanceStatus: "Excellent",
    criticality: "Critical",
    coordinates: "39.8833°N, 22.5833°E",
  },
  {
    id: 5,
    assetCode: "RAF-005",
    assetName: "Αποθήκη Πειραιά",
    assetType: "Warehouse",
    category: "Logistics",
    status: "Operational",
    location: "Piraeus",
    owner: "OSE",
    constructionYear: 1952,
    lastInspection: "2024-12-15",
    nextInspection: "2025-06-15",
    maintenanceStatus: "Good",
    criticality: "Medium",
    coordinates: "37.9463°N, 23.6458°E",
  },
  {
    id: 6,
    assetCode: "RAF-006",
    assetName: "Συνεργείο Λάρισας",
    assetType: "Workshop",
    category: "Maintenance",
    status: "Operational",
    location: "Larissa",
    owner: "OSE",
    constructionYear: 1964,
    lastInspection: "2025-02-01",
    nextInspection: "2025-08-01",
    maintenanceStatus: "Good",
    criticality: "Medium",
    coordinates: "39.6391°N, 22.4191°E",
  },
  {
    id: 7,
    assetCode: "RAF-007",
    assetName: "Σταθμός Πάτρας",
    assetType: "Station",
    category: "Regional Hub",
    status: "Operational",
    location: "Patras",
    owner: "OSE",
    constructionYear: 1887,
    lastInspection: "2024-11-20",
    nextInspection: "2025-05-20",
    maintenanceStatus: "Fair",
    criticality: "High",
    coordinates: "38.2466°N, 21.7346°E",
  },
  {
    id: 8,
    assetCode: "RAF-008",
    assetName: "Γέφυρα Ασωπού",
    assetType: "Bridge",
    category: "Infrastructure",
    status: "Under Maintenance",
    location: "Thebes",
    owner: "OSE",
    constructionYear: 1904,
    lastInspection: "2024-10-15",
    nextInspection: "2025-04-15",
    maintenanceStatus: "Poor",
    criticality: "Critical",
    coordinates: "38.3250°N, 23.3181°E",
  },
  {
    id: 9,
    assetCode: "RAF-009",
    assetName: "Σταθμός Βόλου",
    assetType: "Station",
    category: "Regional Hub",
    status: "Operational",
    location: "Volos",
    owner: "OSE",
    constructionYear: 1884,
    lastInspection: "2025-01-25",
    nextInspection: "2025-07-25",
    maintenanceStatus: "Good",
    criticality: "Medium",
    coordinates: "39.3617°N, 22.9444°E",
  },
  {
    id: 10,
    assetCode: "RAF-010",
    assetName: "Ανισοπεδία Κορίνθου",
    assetType: "Level Crossing",
    category: "Infrastructure",
    status: "Operational",
    location: "Corinth",
    owner: "OSE",
    constructionYear: 1995,
    lastInspection: "2024-12-10",
    nextInspection: "2025-06-10",
    maintenanceStatus: "Good",
    criticality: "Medium",
    coordinates: "37.9381°N, 22.9317°E",
  },
  {
    id: 11,
    assetCode: "RAF-011",
    assetName: "Τούνελ Ιονίου",
    assetType: "Tunnel",
    category: "Infrastructure",
    status: "Operational",
    location: "Aigio",
    owner: "OSE",
    constructionYear: 2001,
    lastInspection: "2025-02-10",
    nextInspection: "2025-08-10",
    maintenanceStatus: "Excellent",
    criticality: "Critical",
    coordinates: "38.2496°N, 22.0815°E",
  },
  {
    id: 12,
    assetCode: "RAF-012",
    assetName: "Σταθμός Καλαμάτας",
    assetType: "Station",
    category: "Regional Hub",
    status: "Operational",
    location: "Kalamata",
    owner: "OSE",
    constructionYear: 1891,
    lastInspection: "2024-11-30",
    nextInspection: "2025-05-30",
    maintenanceStatus: "Fair",
    criticality: "Medium",
    coordinates: "37.0392°N, 22.1142°E",
  },
  {
    id: 13,
    assetCode: "RAF-013",
    assetName: "Συνεργείο Θεσσαλονίκης",
    assetType: "Workshop",
    category: "Maintenance",
    status: "Operational",
    location: "Thessaloniki",
    owner: "OSE",
    constructionYear: 1968,
    lastInspection: "2025-01-18",
    nextInspection: "2025-07-18",
    maintenanceStatus: "Excellent",
    criticality: "High",
    coordinates: "40.6401°N, 22.9444°E",
  },
  {
    id: 14,
    assetCode: "RAF-014",
    assetName: "Γέφυρα Πηνειού",
    assetType: "Bridge",
    category: "Infrastructure",
    status: "Operational",
    location: "Larissa",
    owner: "OSE",
    constructionYear: 1908,
    lastInspection: "2024-12-20",
    nextInspection: "2025-06-20",
    maintenanceStatus: "Good",
    criticality: "Critical",
    coordinates: "39.6391°N, 22.4191°E",
  },
  {
    id: 15,
    assetCode: "RAF-015",
    assetName: "Σταθμός Αλεξανδρούπολης",
    assetType: "Station",
    category: "Regional Hub",
    status: "Operational",
    location: "Alexandroupolis",
    owner: "OSE",
    constructionYear: 1896,
    lastInspection: "2025-02-05",
    nextInspection: "2025-08-05",
    maintenanceStatus: "Good",
    criticality: "High",
    coordinates: "40.8477°N, 25.8744°E",
  },
  {
    id: 16,
    assetCode: "RAF-016",
    assetName: "Αποθήκη Τρικάλων",
    assetType: "Warehouse",
    category: "Logistics",
    status: "Operational",
    location: "Trikala",
    owner: "OSE",
    constructionYear: 1958,
    lastInspection: "2024-11-15",
    nextInspection: "2025-05-15",
    maintenanceStatus: "Fair",
    criticality: "Low",
    coordinates: "39.5553°N, 21.7685°E",
  },
  {
    id: 17,
    assetCode: "RAF-017",
    assetName: "Σταθμός Κοζάνης",
    assetType: "Station",
    category: "Local Station",
    status: "Operational",
    location: "Kozani",
    owner: "OSE",
    constructionYear: 1965,
    lastInspection: "2025-01-12",
    nextInspection: "2025-07-12",
    maintenanceStatus: "Good",
    criticality: "Medium",
    coordinates: "40.3006°N, 21.7889°E",
  },
  {
    id: 18,
    assetCode: "RAF-018",
    assetName: "Τούνελ Μετσόβου",
    assetType: "Tunnel",
    category: "Infrastructure",
    status: "Operational",
    location: "Metsovo",
    owner: "OSE",
    constructionYear: 1999,
    lastInspection: "2024-12-28",
    nextInspection: "2025-06-28",
    maintenanceStatus: "Excellent",
    criticality: "Critical",
    coordinates: "39.7708°N, 21.1819°E",
  },
  {
    id: 19,
    assetCode: "RAF-019",
    assetName: "Σταθμός Δράμας",
    assetType: "Station",
    category: "Local Station",
    status: "Operational",
    location: "Drama",
    owner: "OSE",
    constructionYear: 1892,
    lastInspection: "2025-02-15",
    nextInspection: "2025-08-15",
    maintenanceStatus: "Fair",
    criticality: "Medium",
    coordinates: "41.1536°N, 24.1419°E",
  },
  {
    id: 20,
    assetCode: "RAF-020",
    assetName: "Συνεργείο Αθηνών Β'",
    assetType: "Workshop",
    category: "Maintenance",
    status: "Operational",
    location: "Athens",
    owner: "OSE",
    constructionYear: 1972,
    lastInspection: "2025-01-22",
    nextInspection: "2025-07-22",
    maintenanceStatus: "Good",
    criticality: "High",
    coordinates: "38.0458°N, 23.8144°E",
  },
];

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageNo = parseInt(searchParams.get("pageNo") || "0");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const sortString = searchParams.get("sort");

    // Start with all data
    const processedData = [...mockData];

    // Apply sorting if provided
    if (sortString) {
      const sortParts = sortString.split(",");
      for (const sortPart of sortParts) {
        const [field, direction] = sortPart.split(":");
        if (field && direction) {
          processedData.sort(
            (a: Record<string, unknown>, b: Record<string, unknown>) => {
              const aVal = a[field];
              const bVal = b[field];

              // Handle null/undefined values
              if (aVal == null && bVal == null) return 0;
              if (aVal == null) return 1;
              if (bVal == null) return -1;

              // Compare values
              const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
              return direction.toUpperCase() === "DESC"
                ? -comparison
                : comparison;
            }
          );
        }
      }
    }

    // Apply pagination
    const totalElements = processedData.length;
    const startIndex = pageNo * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = processedData.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedData,
      totalElements,
    });
  } catch (error) {
    console.error("Error in master-rinf API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageNo = parseInt(searchParams.get("pageNo") || "0");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    // const sortString = searchParams.get("sort");

    // Start with all data
    const processedData = [...mockData];
    console.log("🌊 : GET : processedData:", processedData);

    // Apply sorting if provided
    // if (sortString) {
    //   const sortParts = sortString.split(",");
    //   for (const sortPart of sortParts) {
    //     const [field, direction] = sortPart.split(":");
    //     if (field && direction) {
    //       processedData.sort(
    //         (a: Record<string, unknown>, b: Record<string, unknown>) => {
    //           const aVal = a[field];
    //           const bVal = b[field];

    //           // Handle null/undefined values
    //           if (aVal == null && bVal == null) return 0;
    //           if (aVal == null) return 1;
    //           if (bVal == null) return -1;

    //           // Compare values
    //           const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    //           return direction.toUpperCase() === "DESC"
    //             ? -comparison
    //             : comparison;
    //         }
    //       );
    //     }
    //   }
    // }

    // Apply pagination
    const totalElements = processedData.length;
    const startIndex = pageNo * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = processedData.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedData,
      totalElements,
    });
  } catch (error) {
    console.error("Error in master-raf API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
