import Annual from "@/pages/Annual";
import Layout from "@/pages/Layout";
import Month from "@/pages/Month";
import New from "@/pages/New";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  //Layout
  {
    path: "/",
    Component: Layout,
    children: [
      //Monthly bills
      { index: true, Component: Month },
      //annual bills
      { path: "/annual", Component: Annual },
    ],
  },
  //New bills,
  {
    path: "/new",
    Component: New,
  },
]);

export default router;
