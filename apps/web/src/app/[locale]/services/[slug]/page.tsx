"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { DEMO_SERVICES } from "@/data/demo-services";
import { StandardSidebarTemplate } from "@/components/commerce/templates/StandardSidebarTemplate";
import { ImmersiveAppTemplate } from "@/components/commerce/templates/ImmersiveAppTemplate";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function ServicePage({ params }: Props) {
  const { slug } = use(params);
  const service = DEMO_SERVICES.find((s) => s.slug === slug);

  if (!service) return notFound();

  return (
    <div className="container mx-auto px-4 pb-20">
      {service.template === "immersive_app" ? (
        <ImmersiveAppTemplate service={service} />
      ) : (
        <StandardSidebarTemplate service={service} />
      )}
    </div>
  );
}
