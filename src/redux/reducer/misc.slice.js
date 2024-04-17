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
      console.log(payload);
    },
    setIsAddMember: (state, { payload }) => {
      console.log(payload);
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
      console.log(payload);
    },
    setUploadingLoader: (state, { payload }) => {
      state.uploadingLoader = payload;
    },
    setSelectedDeleteChat: (state, { payload }) => {
      console.log(payload);
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
