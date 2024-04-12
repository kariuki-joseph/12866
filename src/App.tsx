import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./pages/Root.tsx";
import SchoolPage from "./pages/schools/SchoolPage.tsx";
import SingleSchoolPage from "./pages/schools/[schoold]/SingleSchoolPage.tsx";
import EditBasicInfoPage from "./pages/schools/[schoold]/edit/basic-info/EditBasicInfoPage.tsx";
import TeachersPage from "./pages/teachers/TeachersPage.tsx";
import ManagePostsPage from "./pages/manage-posts/ManagePostsPage.tsx";
import FinancesPage from "./pages/finances/FinancesPage.tsx";
import EditSchoolDetailsPage from "./pages/schools/[schoold]/edit/school-details/EditSchoolDetailsPage.tsx";
import ChangePasswordPage from "./pages/schools/[schoold]/edit/password/ChangePasswordPage.tsx";
import RegisterSchoolPage from "./pages/schools/register/RegisterSchoolPage.tsx";
import EditLocationDetails from "./pages/schools/[schoold]/edit/location-details/EditLocationDetails.tsx";

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
            path="schools/:schoolId/edit/school-details"
            element={<EditSchoolDetailsPage />}
          />
          <Route
            path="schools/:schoolId/edit/password"
            element={<ChangePasswordPage />}
          />
          <Route
            path="schools/:schoolId/edit/location-details"
            element={<EditLocationDetails />}
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
