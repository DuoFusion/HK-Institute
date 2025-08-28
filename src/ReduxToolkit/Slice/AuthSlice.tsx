import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../Constant";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) || {},
    isAuthenticated: Boolean(localStorage.getItem(STORAGE_KEYS.TOKEN)),
  },
  reducers: {
    login(state, action) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(action.payload));
      localStorage.setItem(STORAGE_KEYS.TOKEN, action.payload.token);
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      state.user = null;
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
