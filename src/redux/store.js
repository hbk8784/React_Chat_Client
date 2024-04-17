import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/auth.slice";
import api from "../redux/api/api";
import miscSlice from "./reducer/misc.slice";
import chatSlice from "./reducer/chat.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    api: api.reducer,
    misc: miscSlice,
    chat: chatSlice,
  },
  middleware: (mid) => [...mid(), api.middleware],
});

export default store;
