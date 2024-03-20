import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardSquarePiece } from '../../utils/types';
import { MAX_RACK_SIZE } from '../../config/configs';

interface RackState {
  pieces: BoardSquarePiece[];
}

const initialState: RackState = {
  pieces: [],
};

export const rackSlice = createSlice({
  name: 'rack',
  initialState,
  reducers: {
    reset: (state) => {
      state.pieces = initialState.pieces;
    },
    addToRack: (state, action: PayloadAction<BoardSquarePiece[]>) => {
      if (state.pieces.length + action.payload.length > MAX_RACK_SIZE) {
        throw new Error('Rack is already quite full');
      }
      state.pieces.push(...action.payload);
    },
    removeFromRack: (state, action: PayloadAction<{ indices: number[] }>) => {
      const indicesToRemove = action.payload.indices;
      state.pieces = state.pieces.filter((_, index) => !indicesToRemove.includes(index));
    },
  },
});

export const { reset, addToRack, removeFromRack } = rackSlice.actions;

export default rackSlice.reducer;
