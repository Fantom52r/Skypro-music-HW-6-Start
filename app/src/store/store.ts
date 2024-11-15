import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/authSlice";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";
import filtersReducer from "./features/filterSlice";
import trackReducer from "./features/trackSlice";
import playerReducer from "./features/playerSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  filters: filtersReducer,
  tracks: trackReducer,
  player: playerReducer,
});

const makeStore = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof makeStore;
export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore<AppStore>();
export default makeStore;
