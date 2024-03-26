import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardSquarePiece, BoardSquareValue } from '../../utils/types';
import { BOARD_SIZE, getAllPlayingPieces, MAX_RACK_SIZE } from '../../config/configs';
import { getRandomElements } from '../../utils/random';

/* This is an ugly file. But actions have effect on sack, racks and board -- for now, seemed easiest to write the action handlers for a sclice that grants access to all of their states    */

/* OLD STUFF, MAYBE DIVIDE INTO DIFFERENT FILES? OR GO BACK TO MANY REDUCERS? */
type SackMap = {
  [id: string]: BoardSquarePiece;
};

interface SackState {
  piecesByIds: SackMap;
  nofPiecesInBeginning: number;
}

interface BoardState {
  boardArray: BoardSquareValue[][];
  boardArrayOneDimensional: BoardSquareValue[];
}

type BoardIndex =
  | {
      dimensionality: 'one';
      index: number;
    }
  | {
      dimensionality: 'two';
      row: number;
      col: number;
    };

const initialBoardState: BoardState = {
  boardArray: Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => null)),
  boardArrayOneDimensional: Array.from({ length: BOARD_SIZE * BOARD_SIZE }, () => null),
};

const initialPiecesArray = getAllPlayingPieces();

// Just for easily constructing once without polluting the scope
const getInitialPiecesByIds = () => {
  const piecesByIds = {} as SackMap;
  initialPiecesArray.forEach((piece) => {
    piecesByIds[piece.id] = piece;
  });
  return piecesByIds;
};

const initialPiecesByIds = getInitialPiecesByIds();

const initialSackState: SackState = {
  piecesByIds: initialPiecesByIds,
  nofPiecesInBeginning: initialPiecesArray.length,
};

interface RackState {
  pieces: BoardSquarePiece[];
}

const initialRackState: RackState = {
  pieces: [],
};

/* END OF OLD STUFF */

interface GameState {
  board: BoardState;
  rack: RackState;
  sack: SackState;
}

const initialState: GameState = {
  board: initialBoardState,
  rack: initialRackState,
  sack: initialSackState,
};

export const gameSlice = createSlice({
  initialState,
  name: 'game',
  reducers: {
    reset: (state) => {
      state.board = initialBoardState;
      state.rack = initialRackState;
      state.sack = initialSackState;
    },
    writeBoardValue: (state, action: PayloadAction<{ index: BoardIndex; value: BoardSquareValue }>) => {
      const rack = state.rack.pieces;
      const valueIsInRack = rack.some((piece) => piece.value === action.payload.value);
      if (!valueIsInRack) return;
      if (action.payload.index.dimensionality === 'one') {
        const existingValue = state.board.boardArrayOneDimensional[action.payload.index.index];
        if (existingValue !== null) {
          return;
        }

        const index = action.payload.index.index;
        state.board.boardArrayOneDimensional[index] = action.payload.value;
        state.board.boardArray[Math.floor(index / BOARD_SIZE)][index % BOARD_SIZE] = action.payload.value;
      } else {
        const { row, col } = action.payload.index;
        const existingValue = state.board.boardArray[row][col];
        if (existingValue !== null) {
          return;
        }

        state.board.boardArray[row][col] = action.payload.value;
        state.board.boardArrayOneDimensional[row * BOARD_SIZE + col] = action.payload.value;
      }

      const firstIdx = rack.map((e) => e.value).indexOf(action.payload.value);
      rack.splice(firstIdx, 1);
    },
    fillRack: (state) => {
      const sack = state.sack.piecesByIds;
      const spaceInRack = MAX_RACK_SIZE - state.rack.pieces.length;
      const piecesToAdd = getRandomElements(Object.values(sack), spaceInRack);
      state.rack.pieces.push(...piecesToAdd);
      for (const piece of piecesToAdd) {
        delete sack[piece.id];
      }
    },
    addToRack: (state, action: PayloadAction<BoardSquarePiece[]>) => {
      if (state.rack.pieces.length + action.payload.length > MAX_RACK_SIZE) {
        throw new Error('Rack is already quite full');
      }
      state.rack.pieces.push(...action.payload);
    },
    removeFromRack: (state, action: PayloadAction<{ indices: number[] }>) => {
      const indicesToRemove = action.payload.indices;
      state.rack.pieces = state.rack.pieces.filter((_, index) => !indicesToRemove.includes(index));
    },
    // This need not be an action that's dispatched? Should happen as part of other, sure...
    removeFromSack: (state, action: PayloadAction<{ idsToRemove: string[] }>) => {
      // TODO: Check that the pieces are indeed in the sack.
      action.payload.idsToRemove.forEach((id) => {
        delete state.sack.piecesByIds[id];
      });
    },
    // This need not be an action that's dispatched? Should happen as part of other, sure...

    addToSack: (state, action: PayloadAction<{ idsToAdd: string[] }>) => {
      action.payload.idsToAdd.forEach((id) => {
        const toAdd = initialPiecesByIds[id];
        if (!toAdd) {
          throw new Error('I am error');
        }
        state.sack.piecesByIds[id] = toAdd;
      });
    },
    replaceRackPieces: (state, action: PayloadAction<{ pieces: BoardSquarePiece[] }>) => {
      const { pieces } = action.payload;
      const nofToReplace = pieces.length;
      const piecesByIds = state.sack.piecesByIds;
      if (Object.values(piecesByIds).length < pieces.length) {
        throw new Error('Not enough pieces in sack');
      }

      // Remove from rack

      const pieceIds = pieces.map((p) => p.id);
      state.rack.pieces = state.rack.pieces.filter((p) => !pieceIds.includes(p.id));

      // Add to rack
      // SHould there be a global map to find a piece by id?
      const newPieceIds = getRandomElements(Object.keys(piecesByIds), nofToReplace);
      const newPieces = newPieceIds.map((id) => piecesByIds[id]);

      state.rack.pieces.push(...newPieces);

      // Remove from sack

      newPieceIds.forEach((id) => delete piecesByIds[id]);

      // Add old pieces to the sack!!
      pieces.forEach((piece) => {
        piecesByIds[piece.id] = piece;
      });
    },
  },
  selectors: {},
});

export const {
  reset,
  writeBoardValue,
  addToRack,
  addToSack,
  fillRack,
  removeFromRack,
  removeFromSack,
  replaceRackPieces,
} = gameSlice.actions;

export default gameSlice.reducer;
