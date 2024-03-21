interface CharacterHandPieceProps {
  character: string;
}

export default function CharacterRackPiece({ character }: CharacterHandPieceProps) {
  return (
    <div
      className="border-2 border-black
     w-[40px] h-[40px] flex justify-center items-center bg-slate-300 text-black text-xl font-semibold shadow-lg"
    >
      {character}
    </div>
  );
}
