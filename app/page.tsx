import ClientPage from "@/components/ClientPage";

type Props = {
  params: { locale: string };
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <ClientPage locale={locale} />;
}
