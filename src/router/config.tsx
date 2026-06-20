import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import PrivacyPolicy from "../pages/privacy/page";
import AccountDeleteRequest from "../pages/account-delete/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/account-delete",
    element: <AccountDeleteRequest />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
