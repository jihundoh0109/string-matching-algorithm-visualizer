type CharacterBoxType = {
  character: string;
  isText: boolean;
  showMore: boolean;
};

export default function CharacterBox({
  character,
  isText,
  showMore,
}: CharacterBoxType) {
  return (
    <div className="h-[130px] space-y-1">
      <div
        className={`w-[50px] h-[50px] flex justify-center items-center border border-black text-3xl ${
          isText ? "bg-slate-200" : "bg-green-500"
        }`}
      >
        {character}
      </div>
      {showMore && (
        <div
          className={`w-[50px] h-[50px] flex justify-center items-center border border-black text-3xl ${
            isText ? "bg-green-200" : "bg-green-500"
          }`}
        >
          {character}
        </div>
      )}
    </div>
  );
}
