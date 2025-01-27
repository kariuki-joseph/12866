import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Root from "./pages/Root.tsx";
import SchoolsPage from "./pages/schools";
import SingleSchoolPage from "./pages/schools/[schoold]";
import EditBasicInfoPage from "./pages/schools/[schoold]/edit/basic-info/EditBasicInfoPage.tsx";
import ManagePostsPage from "./pages/manage-posts";
import FinancesPage from "./pages/payments/FinancesPage.tsx";
import EditSchoolDetailsPage from "./pages/schools/[schoold]/edit/school-details/EditSchoolDetailsPage.tsx";
import ChangePasswordPage from "./pages/schools/[schoold]/edit/password/ChangePasswordPage.tsx";
import EditTeacherPasswordPage from "./pages/schools/[schoold]/edit/password/ChangePasswordPage.tsx";
import RegisterSchoolPage from "./pages/schools/register/RegisterSchoolPage.tsx";
import EditLocationDetailsPage from "./pages/schools/[schoold]/edit/location-details/EditLocationDetailsPage.tsx";
import CreateJobPage from "./pages/schools/[schoold]/jobs/create/CreateJobPage.tsx";
import SingleTeachersPage from "./pages/teachers/[teacherId]";
import RegisterTeacherPage from "./pages/teachers/register/RegisterTeacherPage.tsx";
import EditTeacherBasicInfoForm from "./pages/teachers/[teacherId]/edit/EditTeacherBasicInfo.tsx";
import EditTeacherLocationDetails from "./pages/teachers/[teacherId]/edit/EditTeacherLocationDetailsPage.tsx";
import EditTeacherDetailsPage from "./pages/teachers/[teacherId]/edit/EditTeacherDetailsPage.tsx";
import EditGalleryPage from "./pages/schools/[schoold]/edit/gallery/EditGalleryPage.tsx";
import EditPaymentRatePage from "./pages/schools/[schoold]/jobs/[jobId]/edit/EditPaymentRatePage.tsx";
import EditJobBasicInfo from "./pages/schools/[schoold]/jobs/[jobId]/edit/EditJobBasicInfo.tsx";
import EditJobDetails from "./pages/schools/[schoold]/jobs/[jobId]/edit/EditJobDetails.tsx";
import SingleJobPage from "./pages/schools/[schoold]/jobs/[jobId]";
import { useState } from "react";
import { User } from "./interfaces/api.ts";
import LoginPage from "./pages/login/LoginPage.tsx";
import ManagePayments from "./pages/payments/manage/ManagePayments.tsx";
import CreatePaymentPage from "./pages/payments/manage/CreatePaymentPage.tsx";
import EditRatePage from "./pages/payments/manage/EditRatePage.tsx";
import MakeTeacherPayment from "./pages/teachers/[teacherId]/edit/make-payment";
import UnpublishTeacherProfilePage from "./pages/teachers/[teacherId]/edit/unpublish-profile";
import TeachersPage from "./pages/teachers";
import CreatePaymentProfileViewPaymentPage from "./pages/payments/manage/CreatePaymentProfleViewPaymentPage.tsx";
import EditProfilePaymentRate from "./pages/payments/manage/EditProfilePaymentRate.tsx";

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<LoginPage setUser={setUser} />} />

        <Route path="/" element={<Root user={user} setUser={setUser} />}>
          <Route index element={<SchoolsPage />} />

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
          <Route path="teachers/:teacherId" element={<SingleTeachersPage />} />
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
            path="teachers/:teacherId/edit/make-payment"
            element={<MakeTeacherPayment />}
          />
          <Route
            path="teachers/:teacherId/edit/unpublish-profile"
            element={<UnpublishTeacherProfilePage />}
          />
          <Route
            path="teachers/:teacherId/edit/password"
            element={<EditTeacherPasswordPage />}
          />

          <Route path="manage-posts" element={<ManagePostsPage />} />

          <Route path="payments" element={<FinancesPage />} />
          <Route path="payments/manage" element={<ManagePayments />} />
          <Route path="payments/create" element={<CreatePaymentPage />} />
          <Route
            path="payments/manage/:rateId/edit"
            element={<EditRatePage />}
          />
          <Route
            path="payments/manage/profile/:rateId/edit"
            element={<EditProfilePaymentRate />}
          />
          <Route
            path="payments/manage/teachers"
            element={<CreatePaymentProfileViewPaymentPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
