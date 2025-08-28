import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slice/AuthSlice";
import LayoutSlice from "./Slice/LayoutSlice";
import CourseSlice from "./Slice/CourseSlice";
import BlogSlice from "./Slice/BlogSlice";
import LatestNewsSlice from "./Slice/LatestNewsSlice";
import ChatSlice from "./Slice/ChatSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    layout: LayoutSlice,
    course: CourseSlice,
    blog: BlogSlice,
    latestNews: LatestNewsSlice,
    chat: ChatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
