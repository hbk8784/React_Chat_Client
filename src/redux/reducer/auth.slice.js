import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAdmin: false,
  loader: true,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,

  reducers: {
    useExists: (state, { payload }) => {
      state.user = payload;
      // console.log("this is reducers", payload);
      state.loader = false;
    },
    userNotExists: (state) => {
      (state.user = null), (state.loader = false);
    },
  },
  extraReducers: (builder) => {},
});

export const { useExists, userNotExists } = authSlice.actions;
export default authSlice.reducer;
