import { notFound } from "next/navigation";
import { SectionHeader } from "@/lib/SectionHeader";

const sectionTitleMap: Record<string, string> = {
  seminaria: "Σεμινάρια",
  kalathi: "Καλάθι",
  "ypovoli-aitisis": "Υποβολή Αίτησης",
  "dilosi-dikaiologitikon":
    "Δήλωση Δικαιολογητικών και Στοιχείων σε Επιμορφωτικά Προγράμματα",
  "prosopopoiisi-logariasmou": "Προσωποποίηση Λογαριασμού",
  axiologisi: "Αξιολόγηση",
  apergies: "Απεργίες",
  "webex-ekpaideuseis": "WEBEX-ΕΚΠΑΙΔΕΥΣΕΙΣ",
};

type Props = {
  params: Promise<{ section: string }>;
};

export default async function PortalSectionPage({ params }: Props) {
  const { section } = await params;
  const sectionTitle = sectionTitleMap[section];

  if (!sectionTitle) {
    notFound();
  }

  return (
    <div className="px-3 py-5">
      <SectionHeader pageTitle={sectionTitle} />
      <div className="mx-auto mt-6 max-w-4xl rounded-md border border-slate-200 bg-white p-6 text-slate-700">
        Η σελίδα για «{sectionTitle}» ενεργοποιήθηκε στο νέο menu.
      </div>
    </div>
  );
}
