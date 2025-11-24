import { WidgetConfig } from "@/types/service-models";
import { MetricCounter } from "./MetricCounter";

export const WidgetRegistry = ({
  config,
  basePrice,
}: {
  config: WidgetConfig;
  basePrice: number;
}) => {
  switch (config.type) {
    case "counter":
      return <MetricCounter config={config} basePrice={basePrice} />;
    case "custom_app":
      return (
        <div className="p-8 bg-gray-100 rounded-xl text-center">
          App Placeholder: {config.componentId}
        </div>
      );
    default:
      return <div>Unknown Widget</div>;
  }
};
