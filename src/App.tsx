import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./pages/Root.tsx";
import SchoolPage from "./pages/schools/SchoolPage.tsx";
import SingleSchoolPage from "./pages/schools/[schoold]/SingleSchoolPage.tsx";
import EditBasicInfoPage from "./pages/schools/[schoold]/edit/basic-info/EditBasicInfoPage.tsx";
import TeachersPage from "./pages/teachers/TeachersPage.tsx";
import ManagePostsPage from "./pages/manage-posts/ManagePostsPage.tsx";
import FinancesPage from "./pages/finances/FinancesPage.tsx";
import ContactDetailsPage from "./pages/schools/[schoold]/edit/contact-details/ContactDetailsPage.tsx";
import ChangePasswordPage from "./pages/schools/[schoold]/edit/password/ChangePasswordPage.tsx";
import RegisterSchoolPage from "./pages/schools/register/RegisterSchoolPage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<SchoolPage />} />

          <Route path="schools/:schoolId" element={<SingleSchoolPage />} />

          <Route
            path="schools/:schoolId/edit/basic-info"
            element={<EditBasicInfoPage />}
          />
          <Route
            path="schools/:schoolId/edit/contact-details"
            element={<ContactDetailsPage />}
          />
          <Route
            path="schools/:schoolId/edit/password"
            element={<ChangePasswordPage />}
          />

          <Route path="schools/register" element={<RegisterSchoolPage />} />

          <Route path="teachers" element={<TeachersPage />} />
          <Route path="manage-posts" element={<ManagePostsPage />} />
          <Route path="finances" element={<FinancesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
