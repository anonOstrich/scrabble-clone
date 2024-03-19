import { PIECES_AND_NUMBERS } from '../config/configs';

const ALLOWED_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');

export type Character = keyof typeof PIECES_AND_NUMBERS;

export type BoardSquareValue = Character | null;

export type BoardSquarePiece = {
  value: BoardSquareValue;
  id: string;
};

export const isBoardSquareValue = (letterToSave: string | null): letterToSave is BoardSquareValue => {
  if (letterToSave === null) return true;
  const char = letterToSave.toLowerCase();
  return ALLOWED_CHARACTERS.includes(char);
};
