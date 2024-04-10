import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./pages/Root.tsx";
import SchoolPage from "./pages/schools/SchoolPage.tsx";
import SingleSchoolPage from "./pages/schools/[schoold]/SingleSchoolPage.tsx";
import EditSchoolDescription from "./pages/schools/[schoold]/edit/school-description/EditSchoolDescription.tsx";
import TeachersPage from "./pages/teachers/TeachersPage.tsx";
import ManagePostsPage from "./pages/manage-posts/ManagePostsPage.tsx";
import FinancesPage from "./pages/finances/FinancesPage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<SchoolPage />} />

          <Route path="schools/:schoolId" element={<SingleSchoolPage />} />

          <Route
            path="schools/:schoolId/edit/school-description"
            element={<EditSchoolDescription />}
          />
          <Route
            path="schools/:schoolId/edit/contact-details"
            element={<EditSchoolDescription />}
          />

          <Route path="teachers" element={<TeachersPage />} />
          <Route path="manage-posts" element={<ManagePostsPage />} />
          <Route path="finances" element={<FinancesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
