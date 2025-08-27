import { StudentsType } from "./Students";

type UserRole = "admin" | "user";

interface User {
  _id: string;
  role: UserRole;
}

export interface Chat {
  _id: string;
  senderId: User;
  receiverId: User;
  message: string;
  createdAt: string;
  updatedAt: string;
  seen: boolean;
  isDeleted: boolean;
}

export interface ChatApiResponse {
  allChats: Chat[];
  message: string;
  status: number;
  error?: Record<string, any>;
}

export interface UserUnreadMessages {
  [userId: string]: Chat[];
}

export interface ChatSliceType {
  isChatModal: boolean;
  allChat: ChatApiResponse;
  isLoadingChat: boolean;
  singleEditingIdChat: Chat;
  singleChatData: Chat;
  selectedUser: StudentsType;
  isChatSearchData: string;
  unreadCount: number;
  userUnreadCounts: Record<string, number>;
  userUnreadMessages: UserUnreadMessages;
  userLatestMessages: Record<string, Chat>;
}
