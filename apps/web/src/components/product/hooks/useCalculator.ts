// src/components/product/hooks/useCalculator.ts
"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  CalculatorConfig,
  CalculatorState,
  VisualRankConfig,
  RangeSliderConfig,
  QuantityConfig,
  FixedConfig,
} from "../types";

export function useCalculator(config: CalculatorConfig) {
  // Initialize state based on config
  const getInitialState = useCallback((): CalculatorState => {
    const primaryInput = config.primaryInput;
    let primaryValue: CalculatorState["primaryValue"] = {};

    if (primaryInput.type === "visual_rank") {
      const rankConfig = primaryInput as VisualRankConfig;
      primaryValue = {
        from: rankConfig.defaultFrom || rankConfig.ranks[0]?.id,
        to: rankConfig.defaultTo || rankConfig.ranks[2]?.id,
      };
    } else if (primaryInput.type === "range_slider") {
      const sliderConfig = primaryInput as RangeSliderConfig;
      primaryValue = {
        value: sliderConfig.defaultValue || sliderConfig.min,
      };
    } else if (primaryInput.type === "quantity") {
      const quantityConfig = primaryInput as QuantityConfig;
      primaryValue = {
        value: quantityConfig.default,
      };
    } else if (primaryInput.type === "fixed") {
      primaryValue = {};
    }

    // Initialize modifiers
    const modifiers: Record<string, string> = {};
    config.modifiers?.forEach((mod) => {
      modifiers[mod.id] = mod.defaultValue || mod.options[0]?.value || "";
    });

    // Initialize add-ons
    const addOns: Record<string, boolean> = {};
    config.addOns?.forEach((addon) => {
      addOns[addon.id] = addon.defaultChecked || false;
    });

    // Initialize radio selections
    const radioSelections: Record<string, string> = {};
    config.radioGroups?.forEach((group) => {
      radioSelections[group.id] =
        group.defaultValue || group.options[0]?.value || "";
    });

    return {
      primaryValue,
      modifiers,
      addOns,
      radioSelections,
      basePrice: 0,
      modifierTotal: 0,
      addOnTotal: 0,
      totalPrice: 0,
    };
  }, [config]);

  const [state, setState] = useState<CalculatorState>(getInitialState);

  // Calculate prices whenever state changes
  const calculatedState = useMemo(() => {
    let basePrice = 0;
    const primaryInput = config.primaryInput;

    // Calculate base price from primary input
    if (primaryInput.type === "visual_rank") {
      const rankConfig = primaryInput as VisualRankConfig;
      const fromRank = rankConfig.ranks.find(
        (r) => r.id === state.primaryValue.from
      );
      const toRank = rankConfig.ranks.find(
        (r) => r.id === state.primaryValue.to
      );

      if (fromRank && toRank) {
        const tierDiff = Math.max(0, toRank.tier - fromRank.tier);
        basePrice = rankConfig.basePrice + tierDiff * rankConfig.pricePerTier;
      }
    } else if (primaryInput.type === "range_slider") {
      const sliderConfig = primaryInput as RangeSliderConfig;
      basePrice = (state.primaryValue.value || 0) * sliderConfig.pricePerUnit;
    } else if (primaryInput.type === "quantity") {
      const quantityConfig = primaryInput as QuantityConfig;
      basePrice = (state.primaryValue.value || 0) * quantityConfig.pricePerUnit;
    } else if (primaryInput.type === "fixed") {
      const fixedConfig = primaryInput as FixedConfig;
      basePrice = fixedConfig.price;
    }

    // Calculate modifier adjustments
    let modifierTotal = 0;
    let modifierPercentage = 0;

    config.modifiers?.forEach((mod) => {
      const selectedOption = mod.options.find(
        (opt) => opt.value === state.modifiers[mod.id]
      );
      if (selectedOption) {
        if (selectedOption.priceType === "percentage") {
          modifierPercentage += selectedOption.priceModifier;
        } else {
          modifierTotal += selectedOption.priceModifier;
        }
      }
    });

    // Apply radio group modifiers
    config.radioGroups?.forEach((group) => {
      const selectedOption = group.options.find(
        (opt) => opt.value === state.radioSelections[group.id]
      );
      if (selectedOption) {
        if (selectedOption.priceType === "percentage") {
          modifierPercentage += selectedOption.priceModifier;
        } else {
          modifierTotal += selectedOption.priceModifier;
        }
      }
    });

    // Calculate add-on total
    let addOnTotal = 0;
    let addOnPercentage = 0;

    config.addOns?.forEach((addon) => {
      if (state.addOns[addon.id]) {
        if (addon.priceType === "percentage") {
          addOnPercentage += addon.price;
        } else {
          addOnTotal += addon.price;
        }
      }
    });

    // Calculate final price
    const percentageMultiplier =
      1 + (modifierPercentage + addOnPercentage) / 100;
    const totalPrice =
      basePrice * percentageMultiplier + modifierTotal + addOnTotal;

    return {
      ...state,
      basePrice,
      modifierTotal: modifierTotal + (basePrice * modifierPercentage) / 100,
      addOnTotal: addOnTotal + (basePrice * addOnPercentage) / 100,
      totalPrice: Math.max(0, totalPrice),
    };
  }, [state, config]);

  // Update handlers
  const setPrimaryValue = useCallback(
    (value: CalculatorState["primaryValue"]) => {
      setState((prev) => ({
        ...prev,
        primaryValue: { ...prev.primaryValue, ...value },
      }));
    },
    []
  );

  const setModifier = useCallback((id: string, value: string) => {
    setState((prev) => ({
      ...prev,
      modifiers: { ...prev.modifiers, [id]: value },
    }));
  }, []);

  const setAddOn = useCallback((id: string, checked: boolean) => {
    setState((prev) => ({
      ...prev,
      addOns: { ...prev.addOns, [id]: checked },
    }));
  }, []);

  const setRadioSelection = useCallback((groupId: string, value: string) => {
    setState((prev) => ({
      ...prev,
      radioSelections: { ...prev.radioSelections, [groupId]: value },
    }));
  }, []);

  const reset = useCallback(() => {
    setState(getInitialState());
  }, [getInitialState]);

  return {
    state: calculatedState,
    setPrimaryValue,
    setModifier,
    setAddOn,
    setRadioSelection,
    reset,
  };
}
