import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  isPlaying: boolean;
  isShuffle: boolean;
  isLoop: boolean;
  volume: number;
  currentTime: number;
}

const initialState: PlayerState = {
  isPlaying: false,
  isShuffle: false,
  isLoop: false,
  volume: 0.5,
  currentTime: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlay: (state,action: PayloadAction<boolean>) => {
      state.isPlaying =action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    toggleLoop: (state) => {
      state.isLoop = !state.isLoop;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
  },
});
export const {
  setPlay,
  toggleShuffle,
  toggleLoop,
  setVolume,
  setCurrentTime,
} = playerSlice.actions;

export default playerSlice.reducer;
