import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Url_Keys } from "../../Constant";
import { Get } from "../../Api";
import { FetchApiParams } from "../../Types/CoreComponents";
import { ChatApiResponse, ChatSliceType, UserUnreadMessages } from "../../Types/Chat";

const initialState: ChatSliceType = {
  isChatModal: false,
  allChat: null,
  isLoadingChat: true,
  singleEditingIdChat: null,
  singleChatData: null,
  selectedUser: null,
  isChatSearchData: null,
  unreadCount: 0,
  userUnreadCounts: {},
  userUnreadMessages: {},
  userLatestMessages: {},
};

export const fetchChatApiData = createAsyncThunk<ChatApiResponse, FetchApiParams>("admin/Chat", async ({ senderId, receiverId }) => {
  let url = Url_Keys.Chat.Chat;
  if (senderId) url += `?senderId=${senderId}&receiverId=${receiverId}`;
  const response = await Get<ChatApiResponse>(url);
  return response?.data;
});

// export const fetchSingleChatApiData = createAsyncThunk<ChatType, FetchApiParams>("admin/single-Chat", async ({ id }) => {
//   const response = await Get<ChatType>(`${Url_Keys.Chat.Chat}/${id}`);
//   return response?.data;
// });

const ChatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    setChatModal: (state) => {
      state.isChatModal = !state.isChatModal;
    },
    setSingleEditingIdChat(state, action) {
      state.singleEditingIdChat = action.payload;
    },
    setSelectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setChatSearchData(state, action) {
      state.isChatSearchData = action.payload;
    },
    updateUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
    setUserUnreadCount: (state, action: PayloadAction<{ userId: string; count: number }>) => {
      state.userUnreadCounts[action.payload.userId] = action.payload.count;
    },
    clearUserUnreadCount: (state, action: PayloadAction<string>) => {
      delete state.userUnreadCounts[action.payload];
    },
    setUserUnreadMessages: (state, action: PayloadAction<{ userId: string; messages: any[] }>) => {
      state.userUnreadMessages[action.payload.userId] = action.payload.messages;
    },
    addUserUnreadMessage: (state, action: PayloadAction<{ userId: string; message: any }>) => {
      if (!state.userUnreadMessages[action.payload.userId]) {
        state.userUnreadMessages[action.payload.userId] = [];
      }
      state.userUnreadMessages[action.payload.userId].push(action.payload.message);
    },
    clearUserUnreadMessages: (state, action: PayloadAction<string>) => {
      delete state.userUnreadMessages[action.payload];
    },
    setUserLatestMessage: (state, action: PayloadAction<{ userId: string; message: any }>) => {
      state.userLatestMessages[action.payload.userId] = action.payload.message;
    },
    clearUserLatestMessage: (state, action: PayloadAction<string>) => {
      delete state.userLatestMessages[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatApiData.fulfilled, (state, action) => {
      state.allChat = action.payload;
      state.isLoadingChat = false;
    });
    // builder.addCase(fetchSingleChatApiData.fulfilled, (state, action) => {
    //   state.singleChatData = action.payload;
    // });
  },
});

export const { 
  setChatModal, 
  setSingleEditingIdChat, 
  setSelectUser, 
  setChatSearchData, 
  updateUnreadCount, 
  setUserUnreadCount, 
  clearUserUnreadCount,
  setUserUnreadMessages,
  addUserUnreadMessage,
  clearUserUnreadMessages,
  setUserLatestMessage,
  clearUserLatestMessage
} = ChatSlice.actions;
export default ChatSlice.reducer;
