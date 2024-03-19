import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardSquareValue } from '../../utils/types';
import { BOARD_SIZE } from '../../config/configs';

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

const initialState: BoardState = {
  boardArray: Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => null)),
  boardArrayOneDimensional: Array.from({ length: BOARD_SIZE * BOARD_SIZE }, () => null),
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    reset: (state) => {
      state.boardArray = initialState.boardArray;
    },
    writeValue: (state, action: PayloadAction<{ index: BoardIndex; value: BoardSquareValue }>) => {
      if (action.payload.index.dimensionality === 'one') {
        const index = action.payload.index.index;
        state.boardArrayOneDimensional[index] = action.payload.value;
        state.boardArray[Math.floor(index / BOARD_SIZE)][index % BOARD_SIZE] = action.payload.value;
      } else {
        const { row, col } = action.payload.index;
        state.boardArray[row][col] = action.payload.value;
        state.boardArrayOneDimensional[row * BOARD_SIZE + col] = action.payload.value;
      }
    },
  },
});

export const { reset, writeValue } = boardSlice.actions;

export default boardSlice.reducer;
