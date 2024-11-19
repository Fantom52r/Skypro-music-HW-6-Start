import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Filters {
  AUTORS: string[];
  DATES: string[];
  GENRES: string[];
  selectedAuthor: string[];
  selectedDates: string[];
  selectedGenres: string[];
  searchInputText: string;
}

const initialState: Filters = {
  AUTORS: [],
  DATES: [],
  GENRES: [],
  selectedAuthor: [],
  selectedDates: [],
  selectedGenres: [],
  searchInputText:"",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addAuthorsFilter: (state, action: PayloadAction<string>) => {
      state.selectedAuthor = [...state.selectedAuthor, action.payload];
    },
    addDatesFilter: (state, action: PayloadAction<string>) => {
      state.selectedDates = [...state.selectedDates, action.payload];
    },
    addGenresFilter: (state, action: PayloadAction<string>) => {
      state.selectedGenres = [...state.selectedGenres, action.payload];
    },
    deleteAuthorsFilter: (state, action: PayloadAction<string>) => {
      state.selectedAuthor = state.selectedAuthor.filter(
        (author) => author !== action.payload
      );
    },
    deleteDatesFilter: (state, action: PayloadAction<string>) => {
      state.selectedDates = state.selectedDates.filter(
        (date) => date !== action.payload
      );
    },
    deleteGenresFilter: (state, action: PayloadAction<string>) => {
      state.selectedGenres = state.selectedGenres.filter(
        (genre) => genre !== action.payload
      );
    },
    setFilters: (state, action: PayloadAction<Filters>) => {
      return action.payload;
    },
    setSearchInputText: (state, action: PayloadAction<string>) => {
      state.searchInputText = action.payload;
    },
  },
});

export const {
  addAuthorsFilter,
  addDatesFilter,
  addGenresFilter,
  deleteAuthorsFilter,
  deleteDatesFilter,
  deleteGenresFilter,
  setFilters,
  setSearchInputText,
} = filterSlice.actions;
export default filterSlice.reducer;
