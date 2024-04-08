import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root.tsx";
import SchoolPage from "./pages/schools/SchoolPage.tsx";
import OneSchoolPage from "./pages/schools/[schoold]/OneSchoolPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <SchoolPage />,
      },
      {
        path: "/schools/:schoolId",

        element: <OneSchoolPage />,
      },
    ],
  },
]);
