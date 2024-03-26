import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardSquarePiece, BoardSquareValue, Character } from '../../utils/types';
import { BOARD_SIZE, getAllPlayingPieces, MAX_RACK_SIZE } from '../../config/configs';
import { getRandomElements } from '../../utils/random';
import { PlacementDirection } from '../../GameBoard/GameBoard';

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
  score: number;
}

const initialState: GameState = {
  board: initialBoardState,
  rack: initialRackState,
  sack: initialSackState,
  score: 0,
};

function fillRackHelper(state: GameState) {
  const sack = state.sack.piecesByIds;
  const spaceInRack = MAX_RACK_SIZE - state.rack.pieces.length;
  const piecesToAdd = getRandomElements(Object.values(sack), spaceInRack);
  state.rack.pieces.push(...piecesToAdd);
  for (const piece of piecesToAdd) {
    delete sack[piece.id];
  }
}

export const gameSlice = createSlice({
  initialState,
  name: 'game',
  reducers: {
    reset: (state) => {
      state.board = initialBoardState;
      state.rack = initialRackState;
      state.sack = initialSackState;
    },
    writeBoardValue: (state, action: PayloadAction<{ index: BoardIndex; valueChar: Character }>) => {
      const rack = state.rack.pieces;
      const valueIsInRack = rack.some((piece) => piece.value === action.payload.valueChar);
      if (!valueIsInRack) return;

      const rackPiece = rack.find((piece) => piece.value === action.payload.valueChar);
      if (rackPiece == null) {
        throw new Error('HUH?');
      }
      const val = {
        id: rackPiece?.id,
        value: action.payload.valueChar,
      };

      if (action.payload.index.dimensionality === 'one') {
        const existingValue = state.board.boardArrayOneDimensional[action.payload.index.index];
        if (existingValue !== null) {
          return;
        }

        const index = action.payload.index.index;
        // THIS IS THE CRUCIAL PART
        // DO THIS!!!!!!!!!!!!!

        state.board.boardArrayOneDimensional[index] = val;

        state.board.boardArray[Math.floor(index / BOARD_SIZE)][index % BOARD_SIZE] = val;
      } else {
        const { row, col } = action.payload.index;
        const existingValue = state.board.boardArray[row][col];
        if (existingValue !== null) {
          return;
        }

        state.board.boardArray[row][col] = val;
        state.board.boardArrayOneDimensional[row * BOARD_SIZE + col] = val;
      }

      const char = action.payload.valueChar;
      if (char != null) {
        const firstIdx = rack.map((e) => e.value).indexOf(char);
        rack.splice(firstIdx, 1);
      } else {
        throw new Error('Unintended');
      }
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

      // This should not be called every time
      const allPieceInfo = getAllPlayingPieces();

      const pieceIndexesInRack = pieces.map((p) => p.id).map((id) => state.rack.pieces.map((p) => p.id).indexOf(id));

      if (Object.values(piecesByIds).length < pieces.length) {
        throw new Error('Not enough pieces in sack');
      }

      // Add to rack
      // SHould there be a global map to find a piece by id?
      const newPieceIds = getRandomElements(Object.keys(piecesByIds), nofToReplace);
      const newPieces = newPieceIds.map((id) => allPieceInfo.find((p) => p.id === id) as BoardSquarePiece);

      for (let i = 0; i < nofToReplace; i++) {
        const pieceToPlace = newPieces[i];
        // Here I assign multiple things...
        state.rack.pieces[pieceIndexesInRack[i]] = pieceToPlace;
      }

      // Remove from sack
      newPieceIds.forEach((id) => delete piecesByIds[id]);

      // Add old pieces to the sack!!
      pieces.forEach((piece) => {
        piecesByIds[piece.id] = piece;
      });
    },
    attemptPlacingWord: (
      state,
      action: PayloadAction<{ startPosition: [number, number]; wordLength: number; direction: PlacementDirection }>,
    ) => {
      const board = state.board.boardArray;
      const [startRow, startCol] = action.payload.startPosition;
      const wordLength = action.payload.wordLength;

      const wordCells = Array.from({ length: action.payload.wordLength }, (_, i) => {
        const [row, col] =
          action.payload.direction === 'horizontal' ? [startRow, startCol + i] : [startRow + i, startCol];

        return board[row][col];
      });

      // DO SOME CHECK ON IF IT'S A VALID WORD

      // SCORE THE WORD
      state.score += wordLength;

      // FILL THE RACK

      // RESET THE BOARD STATE
      fillRackHelper(state);
    },
    cancelPlacingWord: (
      state,
      action: PayloadAction<{ startPosition: [number, number]; wordLength: number; direction: PlacementDirection }>,
    ) => {
      console.log('in canceling!');
      const board = state.board.boardArray;
      const [startRow, startCol] = action.payload.startPosition;
      const wordLength = action.payload.wordLength;

      for (let i = 0; i < wordLength; i++) {
        const [row, col] =
          action.payload.direction === 'horizontal' ? [startRow, startCol + i] : [startRow + i, startCol];
        const piece = board[row][col];
        if (piece != null) {
          state.rack.pieces.push(piece);
        } else {
          throw new Error("Trying to cancel a word that doesn't exist");
        }

        board[row][col] = null;
      }
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
  attemptPlacingWord,
  cancelPlacingWord,
} = gameSlice.actions;

export default gameSlice.reducer;
