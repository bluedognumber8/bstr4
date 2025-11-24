export type WidgetType =
  | "counter"
  | "range_slider"
  | "dropdown_select"
  | "custom_app";

export interface WidgetConfig {
  type: WidgetType;
  label?: string;
  // Counter/Slider props
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  pricePerUnit?: number;
  // Custom
  componentId?: string;
}

export type ServiceTemplate = "standard_sidebar" | "immersive_app";

export interface ServiceProduct {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  gameSlug: string;
  heroImage: string;
  basePrice: number;
  template: ServiceTemplate; // Determines the Page Layout
  widget: WidgetConfig; // Determines the Calculator
  // Content
  features?: string[]; // e.g. ["VPN", "24/7 Support"]
  faq?: { q: string; a: string }[];
}
