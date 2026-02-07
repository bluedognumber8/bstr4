// src/hooks/useCalculatorURLSync.ts
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useCallback, useRef } from "react";

interface MMRCalculatorState {
  mmrFrom: number;
  mmrTo: number;
  behavior: number;
  rankConfidence: number;
  hasLP: boolean;
  lpGames: number;
  duo: boolean;
  stream: boolean;
  express: boolean;
  offline: boolean;
  roles: boolean;
  doubleDown: boolean;
  selectedHeroes: number[];
  bannedHeroes: number[];
}

const STORAGE_KEY = "dota-mmr-calculator";

const DEFAULTS: MMRCalculatorState = {
  mmrFrom: 2000,
  mmrTo: 4000,
  behavior: 10000,
  rankConfidence: 100,
  hasLP: false,
  lpGames: 1,
  duo: false,
  stream: false,
  express: false,
  offline: true,
  roles: false,
  doubleDown: true,
  selectedHeroes: [],
  bannedHeroes: [],
};

export function useCalculatorURLSync(defaultMode?: "solo" | "duo") {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isInitialized = useRef(false);

  // Parse URL params into state
  const getStateFromURL = useCallback((): Partial<MMRCalculatorState> => {
    const state: Partial<MMRCalculatorState> = {};

    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const behavior = searchParams.get("behavior");
    const confidence = searchParams.get("confidence");
    const lp = searchParams.get("lp");
    const lpGames = searchParams.get("lpGames");
    const duo = searchParams.get("duo");
    const stream = searchParams.get("stream");
    const express = searchParams.get("express");
    const heroes = searchParams.get("heroes");
    const banned = searchParams.get("banned");

    if (from) state.mmrFrom = parseInt(from, 10);
    if (to) state.mmrTo = parseInt(to, 10);
    if (behavior) state.behavior = parseInt(behavior, 10);
    if (confidence) state.rankConfidence = parseInt(confidence, 10);
    if (lp) state.hasLP = lp === "true";
    if (lpGames) state.lpGames = parseInt(lpGames, 10);
    if (duo) state.duo = duo === "true";
    if (stream) state.stream = stream === "true";
    if (express) state.express = express === "true";
    if (heroes)
      state.selectedHeroes = heroes.split(",").map(Number).filter(Boolean);
    if (banned)
      state.bannedHeroes = banned.split(",").map(Number).filter(Boolean);

    return state;
  }, [searchParams]);

  // Get state from localStorage
  const getStateFromStorage = useCallback((): Partial<MMRCalculatorState> => {
    if (typeof window === "undefined") return {};

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to parse stored calculator state:", e);
    }
    return {};
  }, []);

  // Save state to localStorage
  const saveToStorage = useCallback((state: MMRCalculatorState) => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save calculator state:", e);
    }
  }, []);

  // Update URL with current state (without navigation)
  const updateURL = useCallback(
    (state: MMRCalculatorState) => {
      const params = new URLSearchParams();

      // Only add non-default values to keep URL clean
      if (state.mmrFrom !== DEFAULTS.mmrFrom)
        params.set("from", state.mmrFrom.toString());
      if (state.mmrTo !== DEFAULTS.mmrTo)
        params.set("to", state.mmrTo.toString());
      if (state.behavior !== DEFAULTS.behavior)
        params.set("behavior", state.behavior.toString());
      if (state.rankConfidence !== DEFAULTS.rankConfidence)
        params.set("confidence", state.rankConfidence.toString());
      if (state.hasLP) params.set("lp", "true");
      if (state.lpGames !== DEFAULTS.lpGames && state.hasLP)
        params.set("lpGames", state.lpGames.toString());
      if (state.duo) params.set("duo", "true");
      if (state.stream) params.set("stream", "true");
      if (state.express) params.set("express", "true");
      if (state.selectedHeroes.length > 0)
        params.set("heroes", state.selectedHeroes.join(","));
      if (state.bannedHeroes.length > 0)
        params.set("banned", state.bannedHeroes.join(","));

      const queryString = params.toString();
      const newURL = queryString ? `${pathname}?${queryString}` : pathname;

      // Use replaceState to update URL without adding to history
      window.history.replaceState(null, "", newURL);
    },
    [pathname]
  );

  // Get initial state (priority: URL > localStorage > defaults)
  const getInitialState = useCallback((): MMRCalculatorState => {
    const urlState = getStateFromURL();
    const hasURLParams = Object.keys(urlState).length > 0;

    if (hasURLParams) {
      // URL takes priority
      return { ...DEFAULTS, ...urlState };
    }

    // Try localStorage
    const storedState = getStateFromStorage();
    if (Object.keys(storedState).length > 0) {
      return { ...DEFAULTS, ...storedState };
    }

    // Apply default mode if specified
    if (defaultMode === "duo") {
      return { ...DEFAULTS, duo: true };
    }

    return DEFAULTS;
  }, [getStateFromURL, getStateFromStorage, defaultMode]);

  // Sync state changes to URL and localStorage
  const syncState = useCallback(
    (state: MMRCalculatorState) => {
      updateURL(state);
      saveToStorage(state);
    },
    [updateURL, saveToStorage]
  );

  return {
    getInitialState,
    syncState,
    defaults: DEFAULTS,
  };
}
