import { PIECES_AND_NUMBERS } from '../config/configs';

const ALLOWED_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');

export type Character = keyof typeof PIECES_AND_NUMBERS;

export type BoardSquareValue = BoardSquarePiece | null;

export type BoardSquarePiece = {
  value: Character;
  id: string;
};

export const isBoardSquareCharacter = (letterToSave: string | null): letterToSave is Character => {
  if (letterToSave === null) return true;
  const char = letterToSave.toLowerCase();
  return ALLOWED_CHARACTERS.includes(char);
};
