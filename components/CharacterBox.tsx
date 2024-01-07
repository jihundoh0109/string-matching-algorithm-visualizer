type CharacterBoxType = {
  textCharacter: string;
  patternCharacter: string | null;
  isBeingCompared: boolean;
  isMatch: boolean;
};

export default function CharacterBox({
  textCharacter,
  patternCharacter,
  isBeingCompared,
  isMatch,
}: CharacterBoxType) {
  return (
    <div className="h-[130px] space-y-1">
      <div
        className={`w-[50px] h-[50px] flex justify-center items-center border border-black text-3xl ${
          isBeingCompared ? "bg-slate-400" : "bg-slate-200"
        }`}
      >
        {textCharacter}
      </div>
      {patternCharacter && (
        <div
          className={`w-[50px] h-[50px] flex justify-center items-center border border-black text-3xl ${
            isBeingCompared
              ? isMatch
                ? "bg-green-400"
                : "bg-red-400"
              : "bg-green-200"
          }`}
        >
          {patternCharacter}
        </div>
      )}
    </div>
  );
}
