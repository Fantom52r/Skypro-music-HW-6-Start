import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Compilation, TrackType } from "../../types";

interface TrackState {
  trackList: TrackType[];
  favoriteList: TrackType[];
  compilationList: Compilation[];
  currentTrack: TrackType | null;
  isCurrentTrackLike: boolean;
}

const initialState: TrackState = {
  trackList: [],
  favoriteList: [],
compilationList:[],
  currentTrack: null,
  isCurrentTrackLike: false,
};

const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.trackList = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setFavoriteList: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteList = action.payload;
    },

    setCompilationList: (state, action: PayloadAction<Compilation[]>) => {
      state.compilationList = action.payload;
    },

    setLikeTrack: (state, action: PayloadAction<boolean>) => {
      state.isCurrentTrackLike = action.payload;
    },
  },
});

export const { setTracks, setCurrentTrack, setFavoriteList, setLikeTrack,setCompilationList } =
  trackSlice.actions;
export default trackSlice.reducer;
