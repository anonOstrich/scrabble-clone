import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardSquarePiece } from '../../utils/types';
import { getAllPlayingPieces } from '../../config/configs';
import { addToRack } from '../rack/rackSlice';

// Alas, Map isn't serializable and not recommended to be stored in the redux store :/
export type SackMap = {
  [id: string]: BoardSquarePiece;
};

interface SackState {
  piecesByIds: SackMap;
  nofPiecesInBeginning: number;
}

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

const initialState: SackState = {
  piecesByIds: initialPiecesByIds,
  nofPiecesInBeginning: initialPiecesArray.length,
};

export const sackSlice = createSlice({
  name: 'sack',
  initialState,
  reducers: {
    reset: (state) => {
      state.piecesByIds = initialState.piecesByIds;
      // Of course, this should NOT have changed...
      state.nofPiecesInBeginning = initialState.nofPiecesInBeginning;
    },
    removeFromSack: (state, action: PayloadAction<{ idsToRemove: string[] }>) => {
      // TODO: Check that the pieces are indeed in the sack.
      action.payload.idsToRemove.forEach((id) => {
        delete state.piecesByIds[id];
      });
    },
    addToSack: (state, action: PayloadAction<{ idsToAdd: string[] }>) => {
      action.payload.idsToAdd.forEach((id) => {
        const toAdd = initialPiecesByIds[id];
        if (!toAdd) {
          throw new Error('I am error');
        }
        state.piecesByIds[id] = toAdd;
      });
    },
  },
  // Could react to other slices here...
  extraReducers: (builder) => {
    builder.addCase(addToRack, (state, action) => {
      const payload = action.payload;

      console.log('also: inside sackSlice extraReducers');
      console.log('the player wants: ', payload);
      const wantedIds = payload.map((p) => p.id);
      wantedIds.forEach((id) => {
        delete state.piecesByIds[id];
      });
    });
  },
});

export const { reset, removeFromSack, addToSack } = sackSlice.actions;

export default sackSlice.reducer;
