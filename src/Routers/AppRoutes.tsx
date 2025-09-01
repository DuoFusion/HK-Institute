import { RouteList } from "../Constant/RouteList";
import AboutUs from "../Pages/AboutUs";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Blog from "../Pages/Blog";
import BlogDescription from "../Pages/Blog/BlogDescription";
import Category from "../Pages/Category";
import Chats from "../Pages/Chats";
import Course from "../Pages/Course";
import Dashboard from "../Pages/Dashboard";
import LatestNews from "../Pages/LatestNews";
import LatestNewsDescription from "../Pages/LatestNews/LatestNewsDescription";
import Lecture from "../Pages/Lecture";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import Setting from "../Pages/Setting";
import TermsAndConditions from "../Pages/TermsAndConditions";
// import LatestNews from "../Pages/LatestNews";

export const AppRoutes = [
  { path: RouteList.Dashboard, element: <Dashboard /> },
  // { path: RouteList.Banner, element: <Banner /> },
  { path: RouteList.ChangePassword, element: <ChangePassword /> },
  { path: RouteList.Setting, element: <Setting /> },
  { path: RouteList.Category, element: <Category /> },
  { path: RouteList.Course, element: <Course /> },
  // { path: RouteList.Blog, element: <Blog /> },
  // { path: RouteList.LatestNews, element: <LatestNews /> },
  { path: RouteList.Chats, element: <Chats /> },
  { path: RouteList.AboutUs, element: <AboutUs /> },
  { path: RouteList.PrivacyPolicy, element: <PrivacyPolicy /> },
  { path: RouteList.TermsAndConditions, element: <TermsAndConditions /> },
  { path: RouteList.Blog, element: <Blog /> },
  { path: `${RouteList.BlogDescription}/:id`, element: <BlogDescription /> },
  { path: RouteList.LatestNews, element: <LatestNews /> },
  { path: `${RouteList.LatestNewsDescription}/:id`, element: <LatestNewsDescription /> },
  { path: `${RouteList.Lecture}/:id`, element: <Lecture /> },
];
