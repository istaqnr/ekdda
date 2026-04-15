import { NextRequest, NextResponse } from "next/server";

// Mock data matching the table structure from the image
const mockData = [
  {
    id: 1,
    track: 1,
    lineAxis: "TX1 - ΑΛΕΞΑΝΔΡΟΥΠΟΛΗ (ΚΣΑ)",
    lineSectionNo: 217,
    lineSectionBetweenPoints: "ΧΡΥΣΟ – ΓΑΖΩΡΟΣ",
    lineSectionCode: "25.36.00",
    line1: "25.00.00 TX1 - ΑΛΕΞΑΝΔΡΟΥΠΟΛΗ (ΚΣΑ)",
    geographicalPosition: "MAP",
    lineCategory: "Γ2Β:Γ3Β:Γ4Β",
    nominalTrackGauge: 1435,
    startOfKilometrage: "ΠΟΛΥΚΑΣΤΡΟ Π.",
  },
  {
    id: 2,
    track: 1,
    lineAxis: "ΑΛΕΞΑΝΔΡΟΥΠΟΛΗ (ΛΙΜΑΝΙ) - ΟΡΜΕΝΙΟ (ΣΥΝΟΡΑ ΒΟΥΛΓΑΡΙΑΣ)",
    lineSectionNo: 251,
    lineSectionBetweenPoints: "ΧΕΙΜΩΝΙΟ - Ν. ΟΡΕΣΤΙΑΔΑ",
    lineSectionCode: "27.22.00",
    line1: "27.00.00 ΑΛΕΞΑΝΔΡΟΥΠΟΛΗ (ΛΙΜΑΝΙ) - ΟΡΜΕΝΙΟ (ΣΥΝΟΡΑ ΒΟΥΛΓΑΡΙΑΣ)",
    geographicalPosition: "MAP",
    lineCategory: "Γ2Β",
    nominalTrackGauge: 1435,
    startOfKilometrage: "ΑΛΕΞΑΝΔΡΟΥΠΟΛΗ (ΚΣΑ)",
  },
  {
    id: 3,
    track: 1,
    lineAxis: "ΛΑΡΙΣΑ - ΒΟΛΟΣ",
    lineSectionNo: 152,
    lineSectionBetweenPoints: "ΧΑΛΚΗ - ΜΕΛΙΑ",
    lineSectionCode: "13.04.00",
    line1: "13.00.00 ΛΑΡΙΣΑ - ΒΟΛΟΣ",
    geographicalPosition: "MAP",
    lineCategory: "Γ2Α",
    nominalTrackGauge: 1435,
    startOfKilometrage: "ΠΟΛΥΚΑΣΤΡΟ",
  },
  {
    id: 4,
    track: 1,
    lineAxis: "ΑΜΥΝΤΑΙΟ - ΚΟΖΑΝΗ",
    lineSectionNo: 221,
    lineSectionBetweenPoints: "ΦΩΤΟΛΙΒΟΣ - ΔΡΑΜΑ",
    lineSectionCode: "25.44.00",
    line1: "25.00.00 ΑΜΥΝΤΑΙΟ - ΚΟΖΑΝΗ",
    geographicalPosition: "MAP",
    lineCategory: "Γ2Β",
    nominalTrackGauge: 1435,
    startOfKilometrage: "ΠΕΙΡΑΙΑΣ",
  },
  {
    id: 5,
    track: 1,
    lineAxis: "ΦΙΛΩΤΑΣ - ΠΤΟΛΕΜΑΪΔΑ",
    lineSectionNo: 176,
    lineSectionBetweenPoints: "ΦΕΡΡΕΣ – ΠΕΠΛΟΣ",
    lineSectionCode: "17.06.00",
    line1: "17.00.00 ΦΙΛΩΤΑΣ - ΠΤΟΛΕΜΑΪΔΑ",
    geographicalPosition: "MAP",
    lineCategory: "Γ2Β:Γ3Β:Γ4Β",
    nominalTrackGauge: 1435,
    startOfKilometrage: "ΠΟΛΥΚΑΣΤΡΟ Π.",
  },
  {
    id: 6,
    track: 1,
    lineAxis: "ΑΛΕΞΑΝΔΡΟΥΠΟΛΗ (ΚΣΑ) - ΘΕΣΣΑΛΟΝΙΚΗ",
    lineSectionNo: 243,
    lineSectionBetweenPoints: "ΧΡΥΣΟ – ΓΑΖΩΡΟΣ",
    lineSectionCode: "27.06.00",
    line1: "27.00.00 ΑΛΕΞΑΝΔΡΟΥΠΟΛΗ (ΚΣΑ) - ΘΕΣΣΑΛΟΝΙΚΗ",
    geographicalPosition: "MAP",
    lineCategory: "Γ2Β",
    nominalTrackGauge: 1435,
    startOfKilometrage: "ΑΛΕΞΑΝΔΡΟΥΠΟΛΗ (ΚΣΑ)",
  },
  {
    id: 7,
    track: 1,
    lineAxis: "ΛΑΡΙΣΑ - ΒΟΛΟΣ",
    lineSectionNo: 27,
    lineSectionBetweenPoints: "ΧΑΛΚΗ - ΜΕΛΙΑ",
    lineSectionCode: "01.28.00",
    line1: "01.00.00 ΛΑΡΙΣΑ - ΒΟΛΟΣ",
    geographicalPosition: "MAP",
    lineCategory: "Γ2Α",
    nominalTrackGauge: 1435,
    startOfKilometrage: "ΠΟΛΥΚΑΣΤΡΟ",
  },
  {
    id: 8,
    track: 2,
    lineAxis: "ΑΘΗΝΑ - ΘΕΣΣΑΛΟΝΙΚΗ",
    lineSectionNo: 128,
    lineSectionBetweenPoints: "ΛΑΡΙΣΑ - ΚΑΤΕΡΙΝΗ",
    lineSectionCode: "12.08.00",
    line1: "12.00.00 ΑΘΗΝΑ - ΘΕΣΣΑΛΟΝΙΚΗ",
    geographicalPosition: "MAP",
    lineCategory: "Γ1",
    nominalTrackGauge: 1435,
    startOfKilometrage: "ΑΘΗΝΑ",
  },
  {
    id: 9,
    track: 2,
    lineAxis: "ΠΑΤΡΑ - ΚΥΠΑΡΙΣΣΙΑ",
    lineSectionNo: 95,
    lineSectionBetweenPoints: "ΚΑΛΑΜΑΤΑ - ΜΕΣΣΗΝΗ",
    lineSectionCode: "09.15.00",
    line1: "09.00.00 ΠΑΤΡΑ - ΚΥΠΑΡΙΣΣΙΑ",
    geographicalPosition: "MAP",
    lineCategory: "Γ2Α",
    nominalTrackGauge: 1435,
    startOfKilometrage: "ΠΑΤΡΑ",
  },
  {
    id: 10,
    track: 1,
    lineAxis: "ΘΕΣΣΑΛΟΝΙΚΗ - ΑΛΕΞΑΝΔΡΟΥΠΟΛΗ",
    lineSectionNo: 198,
    lineSectionBetweenPoints: "ΣΕΡΡΕΣ - ΔΡΑΜΑ",
    lineSectionCode: "26.18.00",
    line1: "26.00.00 ΘΕΣΣΑΛΟΝΙΚΗ - ΑΛΕΞΑΝΔΡΟΥΠΟΛΗ",
    geographicalPosition: "MAP",
    lineCategory: "Γ2Β",
    nominalTrackGauge: 1435,
    startOfKilometrage: "ΘΕΣΣΑΛΟΝΙΚΗ",
  },
  {
    id: 11,
    track: 2,
    lineAxis: "ΚΟΡΙΝΘΟΣ - ΚΑΛΑΜΑΤΑ",
    lineSectionNo: 142,
    lineSectionBetweenPoints: "ΤΡΙΠΟΛΗ - ΚΑΛΑΜΑΤΑ",
    lineSectionCode: "14.12.00",
    line1: "14.00.00 ΚΟΡΙΝΘΟΣ - ΚΑΛΑΜΑΤΑ",
    geographicalPosition: "MAP",
    lineCategory: "Γ2Α",
    nominalTrackGauge: 1435,
    startOfKilometrage: "ΚΟΡΙΝΘΟΣ",
  },
  {
    id: 12,
    track: 1,
    lineAxis: "ΑΘΗΝΑ - ΠΑΤΡΑ",
    lineSectionNo: 78,
    lineSectionBetweenPoints: "ΚΟΡΙΝΘΟΣ - ΠΑΤΡΑ",
    lineSectionCode: "07.18.00",
    line1: "07.00.00 ΑΘΗΝΑ - ΠΑΤΡΑ",
    geographicalPosition: "MAP",
    lineCategory: "Γ1",
    nominalTrackGauge: 1435,
    startOfKilometrage: "ΑΘΗΝΑ",
  },
  {
    id: 13,
    track: 2,
    lineAxis: "ΛΑΡΙΣΑ - ΒΟΛΟΣ",
    lineSectionNo: 163,
    lineSectionBetweenPoints: "ΒΟΛΟΣ - ΑΛΜΥΡΟΣ",
    lineSectionCode: "13.16.00",
    line1: "13.00.00 ΛΑΡΙΣΑ - ΒΟΛΟΣ",
    geographicalPosition: "MAP",
    lineCategory: "Γ2Α",
    nominalTrackGauge: 1435,
    startOfKilometrage: "ΛΑΡΙΣΑ",
  },
  {
    id: 14,
    track: 1,
    lineAxis: "ΘΕΣΣΑΛΟΝΙΚΗ - ΦΛΩΡΙΝΑ",
    lineSectionNo: 201,
    lineSectionBetweenPoints: "ΕΔΕΣΣΑ - ΦΛΩΡΙΝΑ",
    lineSectionCode: "20.21.00",
    line1: "20.00.00 ΘΕΣΣΑΛΟΝΙΚΗ - ΦΛΩΡΙΝΑ",
    geographicalPosition: "MAP",
    lineCategory: "Γ2Β",
    nominalTrackGauge: 1435,
    startOfKilometrage: "ΘΕΣΣΑΛΟΝΙΚΗ",
  },
  {
    id: 15,
    track: 2,
    lineAxis: "ΚΑΛΑΜΑΤΑ - ΚΥΠΑΡΙΣΣΙΑ",
    lineSectionNo: 89,
    lineSectionBetweenPoints: "ΚΥΠΑΡΙΣΣΙΑ - ΠΥΛΟΣ",
    lineSectionCode: "09.09.00",
    line1: "09.00.00 ΚΑΛΑΜΑΤΑ - ΚΥΠΑΡΙΣΣΙΑ",
    geographicalPosition: "MAP",
    lineCategory: "Γ2Α",
    nominalTrackGauge: 1435,
    startOfKilometrage: "ΚΑΛΑΜΑΤΑ",
  },
];

export async function POST(request: NextRequest) {
  try {
    // Parse query parameters from URL (client sends params in URL)

    const { searchParams } = new URL(request.url);
    const pageNo = parseInt(searchParams.get("pageNo") || "0");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const sortString = searchParams.get("sort");

    // Start with all data
    const processedData = [...mockData];

    // Apply sorting FIRST (before pagination)
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

    // Then apply pagination
    const totalElements = processedData.length;
    const startIndex = pageNo * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = processedData.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedData,
      totalElements,
    });
  } catch (error) {
    console.error("Error in rinf-lines API:", error);
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
    const sortString = searchParams.get("sort");

    // Start with all data
    const processedData = [...mockData];

    // Apply sorting FIRST (before pagination)
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

    // Then apply pagination
    const totalElements = processedData.length;
    const startIndex = pageNo * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = processedData.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedData,
      totalElements,
    });
  } catch (error) {
    console.error("Error in rinf-lines API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
