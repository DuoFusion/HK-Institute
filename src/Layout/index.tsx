import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../Utils/ScrollToTop";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import ToastNotification from "../CoreComponents/ToastNotification";
// import { useEffect } from "react";
// import { message } from "antd";

const Layout = () => {
  const location = useLocation();

  // useEffect(() => {
  //   const handler = (e: KeyboardEvent | MouseEvent) => {
  //     const key = (e as KeyboardEvent).key?.toLowerCase?.() || "";

  //     // ✅ Block Inspect / View Source / PrintScreen
  //     if (
  //       e.type === "contextmenu" || // right click
  //       (e.type === "keydown" && (key === "f12" || key === "printscreen" || key === "prt sc" || ((e as KeyboardEvent).altKey && key.includes("print")) || ((e as KeyboardEvent).ctrlKey && key === "u") || ((e as KeyboardEvent).ctrlKey && (e as KeyboardEvent).shiftKey && ["i", "j", "c", "s"].includes(key))))
  //     ) {
  //       e.preventDefault();
  //       e.stopPropagation();
  //       message.error("Content is protected 🚫");

  //       // ✅ Clear clipboard on PrintScreen attempt
  //       if (key.includes("print")) {
  //         navigator.clipboard.writeText("Screenshots are disabled ❌").catch(() => {});
  //       }
  //       return false;
  //     }
  //   };

  //   document.addEventListener("contextmenu", handler);
  //   document.addEventListener("keydown", handler);

  //   return () => {
  //     document.removeEventListener("contextmenu", handler);
  //     document.removeEventListener("keydown", handler);
  //   };
  // }, []);

  // // ✅ Extra: DevTools detection
  // useEffect(() => {
  //   const check = setInterval(() => {
  //     if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
  //       message.error("DevTools detected 🚫");
  //       // 👉 redirect user or block page
  //       window.close(); 
  //       window.location.href = "/blocked";
  //       // OR window.close(); (may not work in all browsers)
  //     }
  //   }, 1000);

  //   return () => clearInterval(check);
  // }, []);

  return (
    <>
      <ScrollToTop />
      <ToastNotification />
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
