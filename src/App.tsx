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
import EditTeacherPasswordPage from "./pages/schools/[schoold]/edit/password/ChangePasswordPage.tsx";
import RegisterSchoolPage from "./pages/schools/register/RegisterSchoolPage.tsx";
import EditLocationDetailsPage from "./pages/schools/[schoold]/edit/location-details/EditLocationDetailsPage.tsx";
import CreateJobPage from "./pages/schools/[schoold]/jobs/create/CreateJobPage.tsx";
import SingleTeacherPage from "./pages/teachers/[teacherId]/SingleTeacherPage.tsx";
import RegisterTeacherPage from "./pages/teachers/register/RegisterTeacherPage.tsx";
import EditTeacherBasicInfoForm from "./pages/teachers/[teacherId]/edit/EditTeacherBasicInfo.tsx";
import EditTeacherLocationDetails from "./pages/teachers/[teacherId]/edit/EditTeacherLocationDetailsPage.tsx";
import EditTeacherDetailsPage from "./pages/teachers/[teacherId]/edit/EditTeacherDetailsPage.tsx";

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
            element={<EditLocationDetailsPage />}
          />
          <Route
            path="schools/:schoolId/jobs/create"
            element={<CreateJobPage />}
          />

          <Route path="schools/register" element={<RegisterSchoolPage />} />

          <Route path="teachers" element={<TeachersPage />} />
          <Route path="teachers/register" element={<RegisterTeacherPage />} />
          <Route path="teachers/:teacherId" element={<SingleTeacherPage />} />
          <Route
            path="teachers/:teacherId/edit/basic-info"
            element={<EditTeacherBasicInfoForm />}
          />
          <Route
            path="teachers/:teacherId/edit/teacher-details"
            element={<EditTeacherDetailsPage />}
          />
          <Route
            path="teachers/:teacherId/edit/location-details"
            element={<EditTeacherLocationDetails />}
          />
          <Route
            path="teachers/:teacherId/edit/password"
            element={<EditTeacherPasswordPage />}
          />

          <Route path="manage-posts" element={<ManagePostsPage />} />
          <Route path="finances" element={<FinancesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
