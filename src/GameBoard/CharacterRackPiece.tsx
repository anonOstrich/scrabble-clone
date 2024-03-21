interface CharacterHandPieceProps {
  character: string;
  toggleSelection: () => void;
  isChosen: boolean;
  isChoosingPiecesToSwap: boolean;
}

export default function CharacterRackPiece({
  character,
  toggleSelection,
  isChosen,
  isChoosingPiecesToSwap,
}: CharacterHandPieceProps) {
  if (isChoosingPiecesToSwap) {
    return (
      <button
        className="border-2 border-black
   w-[40px] h-[40px] flex justify-center items-center bg-slate-300 text-black text-xl font-semibold shadow-lg"
        style={{
          backgroundColor: isChosen ? 'blue' : 'rgb(203,213,225)',
          color: isChosen ? 'white' : 'black',
        }}
        onClick={toggleSelection}
      >
        {character}
      </button>
    );
  }
  return (
    <button
      className="border-2 border-black
     w-[40px] h-[40px] flex justify-center items-center bg-slate-300 text-black text-xl font-semibold shadow-lg"
    >
      {character}
    </button>
  );
}
