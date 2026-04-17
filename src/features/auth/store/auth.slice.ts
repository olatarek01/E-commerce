import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  name: string;
  email?: string;
  phone?: string;
  role: string;
  id?: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  userInfo: null | User; // Update usage here too
};

const initialState: AuthState = {
  isAuthenticated: false,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthInfo: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setAuthInfo } = authSlice.actions;
