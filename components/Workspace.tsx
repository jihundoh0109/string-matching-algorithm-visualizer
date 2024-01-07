"use client";

import { useEffect } from "react";
import { useVisualization } from "@/context/VisualizationProvider";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import CharacterBox from "@/components/CharacterBox";
import ControlBar from "@/components/ControlBar";

export default function Workspace() {
  const {
    searchResult,
    currentProgressIndex,
    visualizationActive,
    visualizationSpeed,
    setCurrentProgressIndex,
    setVisualizationActive,
    setVisualizationFinished,
  } = useVisualization();

  const { toast } = useToast();

  const progress = searchResult?.progress;
  const result = searchResult?.result;

  const hasProgressToShow = !!progress && progress.length > 0;

  useEffect(() => {
    if (!hasProgressToShow) {
      return;
    }

    const interval = setInterval(() => {
      if (!visualizationActive) {
        return;
      }

      if (currentProgressIndex === progress.length - 1) {
        const patternFound = result?.found;
        const variant = patternFound ? "success" : "destructive";
        const title = `Pattern ${patternFound ? "" : "not "}found`;
        const description = patternFound
          ? `Pattern was found at index ${result?.index} of the input text.`
          : "Pattern was not found in the input text. Please try again.";

        toast({
          variant,
          title,
          description,
        });

        setVisualizationActive(false);
        setVisualizationFinished(true);
      } else {
        setCurrentProgressIndex((prevIndex) => prevIndex! + 1);
      }
    }, 1000 - (visualizationSpeed - 1) * (750 / 100));

    return () => clearInterval(interval);
  }, [progress, currentProgressIndex, visualizationActive]);

  return (
    <div className="h-2/3 md:h-full w-full md:w-2/3 divide-y">
      <ControlBar />
      <div className="h-[calc(100%-40px)] p-4 overflow-y-auto">
        {hasProgressToShow ? (
          <div className="flex flex-wrap">
            {progress[currentProgressIndex!].map((grid, index) => (
              <CharacterBox
                key={index}
                textCharacter={grid[0].char!}
                patternCharacter={grid[1].char}
                isBeingCompared={grid[0].isBeingCompared!}
                isMatch={grid[1].isMatch!}
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl">Oops! Data Needed</h3>
            <p className="w-2/3 text-sm text-slate-500">
              Looks like you haven't provided all the required information.
              Please fill in the text, pattern, and algorithm fields to begin
              the visualization.
            </p>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
