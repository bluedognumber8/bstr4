import { getTranslations } from "next-intl/server";
import HomePage from "@/components/HomePage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MetadataHome" });
  return { title: t("title") };
}
export default async function Home() {
  return <HomePage />;
}
