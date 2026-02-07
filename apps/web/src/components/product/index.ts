// src/components/product/index.ts

// Types
export * from "./types";

// Hooks
export { useCalculator } from "./hooks/useCalculator";

// Main Layout
export { ProductPageLayout } from "./ProductPageLayout";

// Calculator
export { CalculatorContainer } from "./Calculator/CalculatorContainer";
export { VisualRankSelector } from "./Calculator/inputs/VisualRankSelector";
export { QuantitySelector } from "./Calculator/inputs/QuantitySelector";
export { RangeSlider } from "./Calculator/inputs/RangeSlider";
export { AddOnsCheckbox } from "./Calculator/inputs/AddOnsCheckbox";
export { DropdownSelect } from "./Calculator/inputs/DropdownSelect";

// Content Sections
export { ContentTabs } from "./ContentSections/ContentTabs";
export { DescriptionSection } from "./ContentSections/DescriptionSection";
export { HowItWorksSection } from "./ContentSections/HowItWorksSection";
export { RequirementsSection } from "./ContentSections/RequirementsSection";
export { FAQSection } from "./ContentSections/FAQSection";
export { ReviewsSection } from "./ContentSections/ReviewsSection";

// Trust Elements
export { TrustBadgesBar } from "./TrustElements/TrustBadgesBar";
export { SecurityExplainer } from "./TrustElements/SecurityExplainer";
export { BoostersShowcase } from "./TrustElements/BoostersShowcase";

// Cross-Sell
export { FrequentlyBoughtTogether } from "./CrossSell/FrequentlyBoughtTogether";
export { RelatedProducts } from "./CrossSell/RelatedProducts";

// Mobile
export { MobileStickyBar } from "./Mobile/MobileStickyBar";
export { MobileCalculatorDrawer } from "./Mobile/MobileCalculatorDrawer";
