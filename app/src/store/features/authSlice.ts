import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthStateType = {
  authState: boolean;
  access: string;
  refresh: string;
  userName: string;
};

const initialState: AuthStateType = {
  authState: false,
  access: "",
  refresh: "",
  userName:
    typeof window !== "undefined" ? localStorage.getItem("userName") || "" : "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (
      state,
      action: PayloadAction<{ access: string; refresh: string; user: string }>
    ) => {
      const { access, refresh, user } = action.payload;
      state.authState = true;
      state.access = access;
      state.refresh = refresh;
      state.userName = user;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      state.authState = true;
    },

    setUserLogOut: (state) => {
      state.authState = false;
    },
  },
});

export const { setAuthState, setUserName, setUserLogOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
