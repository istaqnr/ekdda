import { notFound } from "next/navigation";
import { SectionHeader } from "@/lib/SectionHeader";
import { getTranslations } from "next-intl/server";

const sectionTitleMap: Record<string, string> = {
  seminaria: "SEMINARS",
  kalathi: "CART",
  "ypovoli-aitisis": "APPLICATION_SUBMIT",
  "dilosi-dikaiologitikon":
    "DECLARATION",
  "prosopopoiisi-logariasmou": "ACCOUNT_PERSONALIZATION",
  axiologisi: "EVALUATION",
  apergies: "STRIKES",
  "webex-ekpaideuseis": "WEBEX_TRAININGS",
  "prosopika-stoixeia": "PERSONAL_DETAILS",
  pistopoiitika: "CERTIFICATES",
  vevaiwseis: "ATTESTATIONS",
  "vevaiwseis-oikonomikwn": "FINANCIAL_ATTESTATIONS",
  "allagi-xristi": "SWITCH_USER",
};

type Props = {
  params: Promise<{ section: string }>;
};

export default async function PortalSectionPage({ params }: Props) {
  const { section } = await params;
  const t = await getTranslations();
  const sectionKey = sectionTitleMap[section];
  const sectionTitle = sectionKey ? t(`PORTAL_MENU.${sectionKey}`) : null;

  if (!sectionTitle) {
    notFound();
  }

  return (
    <div className="px-3 py-5">
      <SectionHeader pageTitle={sectionTitle} />
      <div className="mx-auto mt-6 max-w-4xl rounded-md border border-slate-200 bg-white p-6 text-slate-700">
        {t("PORTAL.PAGE_READY", { section: sectionTitle })}
      </div>
    </div>
  );
}
