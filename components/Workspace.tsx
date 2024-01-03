"use client";

import { useUserInput } from "@/context/UserInputProvider";
import CharacterBox from "@/components/CharacterBox";

export default function Workspace() {
  const { text, pattern } = useUserInput();

  return (
    <div className="h-2/3 md:h-full w-full md:w-2/3 p-4 overflow-y-auto">
      {text ? (
        <div className="flex flex-wrap">
          {text.split("").map((character, index) => (
            <CharacterBox
              key={index}
              character={character}
              isText={true}
              showMore={index < pattern.length}
            />
          ))}
        </div>
      ) : (
        <div className="h-full flex flex-col justify-center items-center text-center">
          <h3 className="text-2xl">Oops! Data Needed</h3>
          <p className="w-2/3 text-sm text-slate-500">
            Looks like you haven't provided all the required information. Please
            fill in the text, pattern, and algorithm fields to begin the
            visualization.
          </p>
        </div>
      )}
    </div>
  );
}
