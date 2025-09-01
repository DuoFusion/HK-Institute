import { useEffect } from "react";
import { useAppDispatch } from "../ReduxToolkit/Hooks";
import { setSideBarToggle } from "../ReduxToolkit/Slice/LayoutSlice";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import Loader from "./Loader";
import ScrollToTop from "../Utils/ScrollToTop";

const Layout = () => {
  const location = useLocation();
  // const dispatch = useAppDispatch();
  // const updateSidebarBasedOnWidth = () => {
  //   const windowWidth = window.innerWidth;
  //   if (windowWidth <= 1200) dispatch(setSideBarToggle(false));
  //   else dispatch(setSideBarToggle(true));
  // };
  // useEffect(() => {
  //   updateSidebarBasedOnWidth();
  //   window.addEventListener("resize", () => updateSidebarBasedOnWidth());
  // }, []);

  return (
    <>
     <ScrollToTop />
      <div className="page-wrapper compact-wrapper">
        <Header />
        <div className="page-body-wrapper">
          <Sidebar />
          <div className={`page-body ${location.pathname === "/dashboard" ? "dashboard-body" : ""}`}>
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
      <Loader />
    </>
  );
};

export default Layout;
