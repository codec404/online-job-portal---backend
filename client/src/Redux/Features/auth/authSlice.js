import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      //action -> payload -> data from backend
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
