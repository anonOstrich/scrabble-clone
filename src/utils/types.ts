const ALLOWED_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
export type Character =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

export type BoardSquareValue = Character | null;

export const isBoardSquareValue = (letterToSave: string | null): letterToSave is BoardSquareValue => {
  if (letterToSave === null) return true;
  const char = letterToSave.toLowerCase();
  return ALLOWED_CHARACTERS.includes(char);
};
