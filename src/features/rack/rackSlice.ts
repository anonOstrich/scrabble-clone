import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../utils/types';
import { MAX_RACK_SIZE } from '../../config/configs';

interface RackState {
  characters: Character[];
}

const initialState: RackState = {
  characters: [],
};

export const rackSlice = createSlice({
  name: 'rack',
  initialState,
  reducers: {
    reset: (state) => {
      state.characters = initialState.characters;
    },
    addToRack: (state, action: PayloadAction<Character[]>) => {
      console.log('am i here forrreal?');
      if (state.characters.length + action.payload.length > MAX_RACK_SIZE) {
        throw new Error('Rack is already quite full');
      }
      state.characters.push(...action.payload);
    },
    removeFromRack: (state, action: PayloadAction<{ indices: number[] }>) => {
      const indicesToRemove = action.payload.indices;
      state.characters = state.characters.filter((_, index) => !indicesToRemove.includes(index));
    },
  },
});

export const { reset, addToRack, removeFromRack } = rackSlice.actions;

export default rackSlice.reducer;
