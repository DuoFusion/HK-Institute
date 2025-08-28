import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import Layout from "../Layout";
import { RouteList } from "../Constant/RouteList";
import Login from "../Pages/Auth/Login";
import PrivateRoute from "./PrivateRoute";
import RouteRedirect from "./RouteRedirect";
import Error404 from "../Pages/Error";

const RoutersComponent = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      { path: RouteList.Home, element: <Login />, index: true },
      { path: RouteList.Login, element: <Login /> },
    ],
  },
  {
    element: <RouteRedirect />,
    children: [
      {
        element: <Layout />,
        children: AppRoutes,
      },
    ],
  },
  { path: "*", element: <Error404 /> },
]);

export default RoutersComponent;
