import { RouteList } from "../Constant/RouteList";
import AboutUs from "../Pages/AboutUs";
import ChangePassword from "../Pages/Auth/ChangePassword";
// import Banner from "../Pages/Banner";
// import Blog from "../Pages/Blog";
// import Category from "../Pages/Category";
import Chats from "../Pages/Chats";
// import Course from "../Pages/Course";
import Dashboard from "../Pages/Dashboard";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import Setting from "../Pages/Setting";
import TermsAndConditions from "../Pages/TermsAndConditions";
// import LatestNews from "../Pages/LatestNews";

export const AppRoutes = [
  { path: RouteList.Dashboard, element: <Dashboard /> },
  // { path: RouteList.Banner, element: <Banner /> },
  { path: RouteList.ChangePassword, element: <ChangePassword /> },
  { path: RouteList.Setting, element: <Setting /> },
  // { path: RouteList.Category, element: <Category /> },
  // { path: RouteList.Course, element: <Course /> },
  // { path: RouteList.Blog, element: <Blog /> },
  // { path: RouteList.LatestNews, element: <LatestNews /> },
  { path: RouteList.Chats, element: <Chats /> },
  { path: RouteList.AboutUs, element: <AboutUs /> },
  { path: RouteList.PrivacyPolicy, element: <PrivacyPolicy /> },
  { path: RouteList.TermsAndConditions, element: <TermsAndConditions /> },
];
