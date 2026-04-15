import { NextRequest, NextResponse } from "next/server";

// Mock data for Τμήμα Γραμμής (Line Segment)
const mockData = [
  {
    id: 1,
    infrastructureManagerCode: "DY-001",
    operationalPointStart: "ATH-ST-001",
    segmentLengthStart: 0.0,
    operationalPointEnd: "ATH-ST-002",
    segmentLengthEnd: 12.5,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Όχι",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 2,
    infrastructureManagerCode: "DY-002",
    operationalPointStart: "THS-ST-001",
    segmentLengthStart: 0.0,
    operationalPointEnd: "THS-ST-002",
    segmentLengthEnd: 8.3,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Ναι - Χημικό εργοστάσιο",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 3,
    infrastructureManagerCode: "DY-001",
    operationalPointStart: "ATH-ST-002",
    segmentLengthStart: 12.5,
    operationalPointEnd: "ATH-ST-003",
    segmentLengthEnd: 25.8,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Όχι",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 4,
    infrastructureManagerCode: "DY-003",
    operationalPointStart: "LAR-ST-001",
    segmentLengthStart: 0.0,
    operationalPointEnd: "LAR-ST-002",
    segmentLengthEnd: 15.2,
    segmentType: "Δευτερεύουσα γραμμή",
    industrialHazards: "Ναι - Βιομηχανική ζώνη",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 5,
    infrastructureManagerCode: "DY-001",
    operationalPointStart: "ATH-ST-003",
    segmentLengthStart: 25.8,
    operationalPointEnd: "ATH-ST-004",
    segmentLengthEnd: 42.1,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Όχι",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Συντήρηση",
  },
  {
    id: 6,
    infrastructureManagerCode: "DY-004",
    operationalPointStart: "PAT-ST-001",
    segmentLengthStart: 0.0,
    operationalPointEnd: "PAT-ST-002",
    segmentLengthEnd: 6.7,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Όχι",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 7,
    infrastructureManagerCode: "DY-002",
    operationalPointStart: "THS-ST-002",
    segmentLengthStart: 8.3,
    operationalPointEnd: "THS-ST-003",
    segmentLengthEnd: 18.9,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Ναι - Λιμάνι",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 8,
    infrastructureManagerCode: "DY-001",
    operationalPointStart: "ATH-ST-004",
    segmentLengthStart: 42.1,
    operationalPointEnd: "ATH-ST-005",
    segmentLengthEnd: 58.4,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Όχι",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 9,
    infrastructureManagerCode: "DY-005",
    operationalPointStart: "VOL-ST-001",
    segmentLengthStart: 0.0,
    operationalPointEnd: "VOL-ST-002",
    segmentLengthEnd: 9.1,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Όχι",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 10,
    infrastructureManagerCode: "DY-003",
    operationalPointStart: "LAR-ST-002",
    segmentLengthStart: 15.2,
    operationalPointEnd: "LAR-ST-003",
    segmentLengthEnd: 28.6,
    segmentType: "Δευτερεύουσα γραμμή",
    industrialHazards: "Όχι",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 11,
    infrastructureManagerCode: "DY-001",
    operationalPointStart: "ATH-ST-005",
    segmentLengthStart: 58.4,
    operationalPointEnd: "ATH-ST-006",
    segmentLengthEnd: 75.2,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Ναι - Πετρελαιοπηγές",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 12,
    infrastructureManagerCode: "DY-006",
    operationalPointStart: "KAL-ST-001",
    segmentLengthStart: 0.0,
    operationalPointEnd: "KAL-ST-002",
    segmentLengthEnd: 11.4,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Όχι",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 13,
    infrastructureManagerCode: "DY-002",
    operationalPointStart: "THS-ST-003",
    segmentLengthStart: 18.9,
    operationalPointEnd: "THS-ST-004",
    segmentLengthEnd: 32.5,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Όχι",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 14,
    infrastructureManagerCode: "DY-001",
    operationalPointStart: "ATH-ST-006",
    segmentLengthStart: 75.2,
    operationalPointEnd: "ATH-ST-007",
    segmentLengthEnd: 91.8,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Όχι",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 15,
    infrastructureManagerCode: "DY-007",
    operationalPointStart: "ALE-ST-001",
    segmentLengthStart: 0.0,
    operationalPointEnd: "ALE-ST-002",
    segmentLengthEnd: 7.9,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Ναι - Βιομηχανική περιοχή",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 16,
    infrastructureManagerCode: "DY-003",
    operationalPointStart: "LAR-ST-003",
    segmentLengthStart: 28.6,
    operationalPointEnd: "LAR-ST-004",
    segmentLengthEnd: 41.3,
    segmentType: "Δευτερεύουσα γραμμή",
    industrialHazards: "Όχι",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Συντήρηση",
  },
  {
    id: 17,
    infrastructureManagerCode: "DY-001",
    operationalPointStart: "ATH-ST-007",
    segmentLengthStart: 91.8,
    operationalPointEnd: "ATH-ST-008",
    segmentLengthEnd: 108.5,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Όχι",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 18,
    infrastructureManagerCode: "DY-008",
    operationalPointStart: "KOZ-ST-001",
    segmentLengthStart: 0.0,
    operationalPointEnd: "KOZ-ST-002",
    segmentLengthEnd: 13.6,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Όχι",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 19,
    infrastructureManagerCode: "DY-002",
    operationalPointStart: "THS-ST-004",
    segmentLengthStart: 32.5,
    operationalPointEnd: "THS-ST-005",
    segmentLengthEnd: 47.2,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Ναι - Χημικό εργοστάσιο",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
  },
  {
    id: 20,
    infrastructureManagerCode: "DY-001",
    operationalPointStart: "ATH-ST-008",
    segmentLengthStart: 108.5,
    operationalPointEnd: "ATH-ST-009",
    segmentLengthEnd: 125.3,
    segmentType: "Κύρια γραμμή",
    industrialHazards: "Όχι",
    workingLanguage: "Ελληνικά",
    operationalStatus: "Ενεργό",
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
    console.error("Error in tmima-grammhs API:", error);
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

    // Start with all data
    const processedData = [...mockData];
    console.log("🌊 : GET : processedData:", processedData);

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
    console.error("Error in tmima-grammhs API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
