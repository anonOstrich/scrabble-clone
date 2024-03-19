import { BoardSquarePiece } from '../utils/types';

export const BOARD_SIZE = 15;
export const MAX_RACK_SIZE = 7;
export const PIECES_AND_NUMBERS = {
  a: 9,
  b: 2,
  c: 2,
  d: 4,
  e: 12,
  f: 2,
  g: 3,
  h: 2,
  i: 9,
  j: 1,
  k: 1,
  l: 4,
  m: 2,
  n: 6,
  o: 8,
  p: 2,
  q: 1,
  r: 6,
  s: 4,
  t: 6,
  u: 4,
  v: 2,
  w: 2,
  x: 1,
  y: 2,
  z: 1,
};

export const getAllPlayingPieces = (): BoardSquarePiece[] => {
  const pieces: BoardSquarePiece[] = [];
  for (const piece in PIECES_AND_NUMBERS) {
    // @ts-expect-error We are absolutely sure that the piece is a key of PIECES_AND_NUMBERS
    for (let i = 0; i < PIECES_AND_NUMBERS[piece]; i++) {
      pieces.push({
        // @ts-expect-error We are absolutely sure that the piece is a key of PIECES_AND_NUMBERS
        value: piece,
        id: `${piece}-${i}`,
      });
    }
  }
  return pieces;
};
