import Image from "next/image";
import styles from "./page.module.css";
import { getTranslations } from "next-intl/server";
import Switcher from "@/components/Switcher";
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
  const t = await getTranslations("HomePage");
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Switcher />
        <HomePage />
      </main>
    </div>
  );
}
