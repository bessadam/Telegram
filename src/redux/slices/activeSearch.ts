import { createSlice }  from "@reduxjs/toolkit";

const activeSearch = createSlice({
  name: "activeSearch",
  initialState: {
    chatsSearch: {
      isActive: false,
      searchValue: ""
    },
    contactsSearch: {
      isActive: false,
      searchValue: ""
    },
    channelInfoSearch: {
      isActive: false,
      searchValue: "", 
      searchOutputActive: false
    },
  },
  reducers: {
    setChatsSearchActive(state, action) {
      state.chatsSearch.isActive = action.payload.active;
    },
    setChatsSearchValue(state, action) {
      state.chatsSearch.searchValue = action.payload.searchValue;
    },
    setContactsSearchActive(state, action) {
      state.contactsSearch.isActive = action.payload.active;
    },
    setContactsSearchValue(state, action) {
      state.contactsSearch.searchValue = action.payload.searchValue;
    },
    setChannelInfoSearchActive(state, action) {
      state.channelInfoSearch.isActive = action.payload.active;
    },
    setChannelInfoSearchValue(state, action) {
      state.channelInfoSearch.searchValue = action.payload.searchValue;
    },
    setSearchOutputActive(state, action) {
      state.channelInfoSearch.searchOutputActive = action.payload.active;
    }
  }
})

export const { 
  setChatsSearchActive, 
  setChatsSearchValue, 
  setContactsSearchActive,
  setContactsSearchValue,
  setChannelInfoSearchActive, 
  setChannelInfoSearchValue,
  setSearchOutputActive
} = activeSearch.actions;

export default activeSearch.reducer;