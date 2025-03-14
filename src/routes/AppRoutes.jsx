import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import UserRoles from "../pages/UserRoles";
import UserManagement from "../pages/UserManagement";
import Dashboard from "../pages/Dashboard";
import AutoResponse from "../pages/AutoResponse";
import Customers from "../pages/Customers";
import Subscriptions from "../pages/Subscriptions";
import Books from "../pages/Books";
import GreenLanterns from "../pages/GreenLanterns";
import GreenLanternCreate from "../components/greenLanterns/GreenLanternCreate";
import GreenLanternEdit from "../components/greenLanterns/GreenLanternEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Dashboard />,
      },
      {
        path: "user-roles",
        element: <UserRoles />,
      },
      {
        path: "user-management",
        element: <UserManagement />,
      },
      {
        path: "auto-response",
        element: <AutoResponse />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "subscriptions",
        element: <Subscriptions />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "green-lanterns",
        element: <GreenLanterns />,
        children: [
          {
            path: "create",
            element: <GreenLanternCreate />,
          },

          {
            path: ":id/edit",
            element: <GreenLanternEdit />,
          },
        ],
      },
    ],
  },
]);

export default router;
