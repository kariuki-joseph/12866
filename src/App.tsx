import {
  BrowserRouter,
  Navigate,
  redirect,
  Route,
  Routes,
} from "react-router-dom";
import Root from "./pages/Root.tsx";
import SchoolPage from "./pages/schools/SchoolPage.tsx";
import SingleSchoolPage from "./pages/schools/[schoold]/SingleSchoolPage.tsx";
import EditBasicInfoPage from "./pages/schools/[schoold]/edit/basic-info/EditBasicInfoPage.tsx";
import TeachersPage from "./pages/teachers/TeachersPage.tsx";
import ManagePostsPage from "./pages/manage-posts/ManagePostsPage.tsx";
import FinancesPage from "./pages/payments/FinancesPage.tsx";
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
import EditGalleryPage from "./pages/schools/[schoold]/edit/gallery/EditGalleryPage.tsx";
import EditPaymentRatePage from "./pages/schools/[schoold]/jobs/[jobId]/edit/EditPaymentRatePage.tsx";
import EditJobBasicInfo from "./pages/schools/[schoold]/jobs/[jobId]/edit/EditJobBasicInfo.tsx";
import EditJobDetails from "./pages/schools/[schoold]/jobs/[jobId]/edit/EditJobDetails.tsx";
import SingleJobPage from "./pages/schools/[schoold]/jobs/[jobId]/SingleJobPage.tsx";
import { useEffect, useState } from "react";
import { User } from "./interfaces/api.ts";
import LoginPage from "./pages/login/LoginPage.tsx";
import weteachApi from "./configs/weteach-api.ts";
import ManagePayments from "./pages/payments/manage/ManagePayments.tsx";

function ProtectedRoutes({
  setUser,
  user,
  children,
}: {
  setUser: any;
  user: User | null;
  children: any;
}) {
  if (!user) return <Navigate to={"login"} />;

  return children;
}
export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (user) return;

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) redirect("/login");

      const userRes = await weteachApi.get("/api/v1/users/user");

      setUser({
        id: userRes.data.id,
        name: userRes.data.email ?? "-",
      });
    };

    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<LoginPage setUser={setUser} />} />

        <Route path="/" element={<Root user={user} />}>
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
            path="schools/:schoolId/edit/gallery"
            element={<EditGalleryPage />}
          />

          <Route
            path="schools/:schoolId/jobs/create"
            element={<CreateJobPage />}
          />
          <Route
            path="schools/:schoolId/jobs/:jobId"
            element={<SingleJobPage />}
          />
          <Route
            path="schools/:schoolId/jobs/:jobId/edit/basic-info"
            element={<EditJobBasicInfo />}
          />
          <Route
            path="schools/:schoolId/jobs/:jobId/edit/job-details"
            element={<EditJobDetails />}
          />
          <Route
            path="schools/:schoolId/jobs/:jobId/edit/payment-rate"
            element={<EditPaymentRatePage />}
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

          <Route path="payments" element={<FinancesPage />} />
          <Route path="payments/manage" element={<ManagePayments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
