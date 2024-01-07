"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { SearchResult } from "@/lib/types";

type VisualizationProviderContextType = {
  searchResult: SearchResult | null;
  setSearchResult: Dispatch<SetStateAction<SearchResult | null>>;
  currentProgressIndex: number | null;
  setCurrentProgressIndex: Dispatch<SetStateAction<number | null>>;
  visualizationActive: boolean;
  setVisualizationActive: Dispatch<SetStateAction<boolean>>;
  visualizationSpeed: number;
  setVisualizationSpeed: Dispatch<SetStateAction<number>>;
  visualizationFinished: boolean;
  setVisualizationFinished: Dispatch<SetStateAction<boolean>>;
};

type VisualizationProviderProps = {
  children: React.ReactNode;
};

const VisualizationContext = createContext<
  VisualizationProviderContextType | undefined
>(undefined);

export function VisualizationProvider({
  children,
}: VisualizationProviderProps) {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [currentProgressIndex, setCurrentProgressIndex] = useState<
    number | null
  >(null);
  const [visualizationActive, setVisualizationActive] = useState(false);
  const [visualizationSpeed, setVisualizationSpeed] = useState(50);
  const [visualizationFinished, setVisualizationFinished] = useState(false);

  return (
    <VisualizationContext.Provider
      value={{
        searchResult,
        setSearchResult,
        currentProgressIndex,
        setCurrentProgressIndex,
        visualizationActive,
        setVisualizationActive,
        visualizationSpeed,
        setVisualizationSpeed,
        visualizationFinished,
        setVisualizationFinished,
      }}
    >
      {children}
    </VisualizationContext.Provider>
  );
}

export function useVisualization() {
  const context = useContext(VisualizationContext);

  if (context === undefined) {
    throw new Error("useUserInput must be used within a useVisualization");
  }

  return context;
}
