import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root.tsx";
import SchoolPage from "./pages/schools/SchoolPage.tsx";
import SingleSchoolPage from "./pages/schools/[schoold]/SingleSchoolPage.tsx";
import TeachersPage from "./pages/teachers/TeachersPage.tsx";
import ManagePostsPage from "./pages/manage-posts/ManagePostsPage.tsx";
import FinancesPage from "./pages/finances/FinancesPage.tsx";
import EditSchoolDescription from "./pages/schools/[schoold]/school-description/edit/EditSchoolDescription.tsx";

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
        path: "schools/:schoolId",
        element: <SingleSchoolPage />,
      },
      {
        path: "schools/:schoolId/school-description/edit",
        element: <EditSchoolDescription />,
      },
      {
        path: "teachers",
        element: <TeachersPage />,
      },
      {
        path: "manage-posts",
        element: <ManagePostsPage />,
      },
      {
        path: "finances",
        element: <FinancesPage />,
      },
    ],
  },
]);
