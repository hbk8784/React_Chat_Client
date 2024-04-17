import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";

const initialState = {
  notificationCount: 0,
  newMessagesAlert: getOrSaveFromStorage({
    key: NEW_MESSAGE_ALERT,
    get: true,
  }) || [{ chatId: "", count: 0 }],
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    incrementNotification: (state) => {
      state.notificationCount += 1;
    },
    resetNotificationCount: (state) => {
      state.notificationCount = 0;
    },
    setNewMessagesAlert: (state, { payload }) => {
      const index = state.newMessagesAlert.findIndex(
        (item) => item.chatId === payload.chatId
      );
      if (index != -1) {
        state.newMessagesAlert[index].count += 1;
      } else {
        state.newMessagesAlert.push({
          chatId: payload.chatId,
          count: 1,
        });
      }
    },
    removeNewMessagesAlert: (state, { payload }) => {
      // console.log("check payload", payload);
      state.newMessagesAlert = state.newMessagesAlert.filter(
        (item) => item.chatId !== payload.chatId
      );
    },
  },
  extraReducers: (builder) => {},
});

export const {
  incrementNotification,
  resetNotificationCount,
  setNewMessagesAlert,
  removeNewMessagesAlert,
} = chatSlice.actions;

export default chatSlice.reducer;
