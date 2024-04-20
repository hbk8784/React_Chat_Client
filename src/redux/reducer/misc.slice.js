import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewGroup: false,
  isAddMember: false,
  isNotification: false,
  isMobileMenu: false,
  isSearch: false,
  isFileMenu: false,
  isDeleteMenu: false,
  uploadingLoader: false,
  selectedDeleteChat: {
    chatId: "",
    groupChat: false,
  },
};

const miscSlice = createSlice({
  name: "miscSlice",
  initialState,
  reducers: {
    setIsNewGroup: (state, { payload }) => {
      state.isNewGroup = payload;
    },
    setIsAddMember: (state, { payload }) => {
      state.isAddMember = payload;
    },
    setIsNotification: (state, { payload }) => {
      state.isNotification = payload;
    },
    setIsMobileMenu: (state, { payload }) => {
      state.isMobileMenu = payload;
    },
    setIsSearch: (state, { payload }) => {
      state.isSearch = payload;
    },
    setIsFileMenu: (state, { payload }) => {
      state.isFileMenu = payload;
    },
    setIsDeleteMenu: (state, { payload }) => {
      state.isDeleteMenu = payload;
    },
    setUploadingLoader: (state, { payload }) => {
      state.uploadingLoader = payload;
    },
    setSelectedDeleteChat: (state, { payload }) => {
      state.selectedDeleteChat = {
        chatId: payload.chatId,
        groupChat: payload.groupChat,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setIsNewGroup,
  setIsAddMember,
  setIsNotification,
  setIsMobileMenu,
  setIsSearch,
  setIsFileMenu,
  setIsDeleteMenu,
  setUploadingLoader,
  setSelectedDeleteChat,
} = miscSlice.actions;

export default miscSlice.reducer;
