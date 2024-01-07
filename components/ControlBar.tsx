import { Pause, Play } from "lucide-react";
import { useVisualization } from "@/context/VisualizationProvider";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export default function ControlBar() {
  const {
    searchResult,
    visualizationActive,
    visualizationFinished,
    setVisualizationActive,
    setVisualizationFinished,
    setCurrentProgressIndex,
    setVisualizationSpeed,
  } = useVisualization();

  const progressGrids = searchResult?.progress;

  const hasProgressToShow = !!progressGrids && progressGrids.length > 0;

  function replay() {
    setVisualizationFinished(false);
    setCurrentProgressIndex(0);
    setVisualizationActive(true);
  }

  return (
    <div className="flex justify-between w-full h-[40px] p-4">
      <div className="flex items-center space-x-4">
        {hasProgressToShow && (
          <div className="flex">
            {visualizationActive ? (
              <Pause
                className="cursor-pointer"
                onClick={() => {
                  setVisualizationActive(false);
                }}
              />
            ) : (
              <Play
                className="cursor-pointer"
                onClick={() => {
                  setVisualizationActive(true);
                }}
              />
            )}
          </div>
        )}
        <div className="flex space-x-2 text-xs">
          <span>Slow</span>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className="w-[100px]"
            onValueChange={(speed) => setVisualizationSpeed(speed[0])}
          />
          <span>Fast</span>
        </div>
      </div>
      {hasProgressToShow && visualizationFinished && (
        <div className="flex items-center space-x-1">
          <Button className="h-[30px]" onClick={replay}>
            Replay
          </Button>
        </div>
      )}
    </div>
  );
}
