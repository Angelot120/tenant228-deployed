import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Login from "./pages/login/Login.jsx";
import Error404 from "./pages/404/404.jsx";
import Registration from "./pages/registration/Registration.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminHousing from "./pages/admin/AdminHousing.jsx";
import AdminOrders from "./pages/admin/orders/AdminOrders.jsx";
import AdminOrdersInProgress from "./pages/admin/orders/AdminOrdersInProgress.jsx";
import AdminOrdersCompleted from "./pages/admin/orders/AdminOrdersCompleted.jsx";
import AdminOrdersCancelled from "./pages/admin/orders/AdminOrdersCancelled.jsx";
import AdminOrdersRefused from "./pages/admin/orders/AdminOrdersRefused.jsx";
import MyCompany from "./pages/admin/companies/MyCompany.jsx";
import UsersCompany from "./pages/admin/companies/UsersCompany.jsx";
import AllUsers from "./pages/admin/users/AllUsers.jsx";
import AllCategories from "./pages/categories/AllCategories.jsx";
import AllCategoriesType from "./pages/categories/AllCategoriesType.jsx";
import Start from "./pages/createHousingProcess/creation/pages/Start.jsx";
import CreateHousingStart from "./pages/createHousingProcess/creation/pages/CreateHousingStart.jsx";
import HousingProcessingStep1_1 from "./pages/createHousingProcess/creation/pages/step1/HousingProcessingStep1_1.jsx";
import HousingProcessingStep1_2 from "./pages/createHousingProcess/creation/pages/step1/HousingProcessingStep1_2.jsx";
import HousingProcessingStep1_3 from "./pages/createHousingProcess/creation/pages/step1/HousingProcessingStep1_3.jsx";
import HousingProcessingStep1_4 from "./pages/createHousingProcess/creation/pages/step1/HousingProcessingStep1_4.jsx";
import HousingProcessingStep1_5 from "./pages/createHousingProcess/creation/pages/step1/HousingProcessingStep1_5.jsx";
import HousingProcessingStep1_6 from "./pages/createHousingProcess/creation/pages/step1/HousingProcessingStep1_6.jsx";
import Step2Start from "./pages/createHousingProcess/creation/pages/step2/Step2Start.jsx";
import HousingProcessingStep2_1 from "./pages/createHousingProcess/creation/pages/step2/HousingProcessingStep2_1.jsx";
import HousingProcessingStep2_2 from "./pages/createHousingProcess/creation/pages/step2/HousingProcessingStep2_2.jsx";
import HousingProcessingStep2_3 from "./pages/createHousingProcess/creation/pages/step2/HousingProcessingStep2_3.jsx";
import HousingProcessingStep2_4 from "./pages/createHousingProcess/creation/pages/step2/HousingProcessingStep2_4.jsx";
import HousingProcessingStep2_5 from "./pages/createHousingProcess/creation/pages/step2/HousingProcessingStep2_5.jsx";
import Step3Start from "./pages/createHousingProcess/creation/pages/step3/Step3Start.jsx";
import HousingProcessingStep3_1 from "./pages/createHousingProcess/creation/pages/step3/HousingProcessingStep3_1.jsx";
import HousingProcessingStep3_2 from "./pages/createHousingProcess/creation/pages/step3/HousingProcessingStep3_2.jsx";
import HousingProcessingFinish from "./pages/createHousingProcess/creation/pages/step3/HousingProcessingFinish.jsx";
import Preview from "./pages/createHousingProcess/creation/pages/step3/Preview.jsx";
import HousingDetails from "./pages/HousingDetails.jsx";
import Cart from "./pages/cart/Cart.jsx";
import NewPassword from "./pages/otp/NewPassword.jsx";
import NewPasswordOtp from "./pages/otp/NewPasswordOtp.jsx";
import VerifyEmail from "./pages/otp/VerifyEmail.jsx";
import CompanyPage from "./pages/company/CompanyPage.jsx";
import MyProfile from "./pages/admin/Profile/MyProfile.jsx";
import NewPasswordCheckOtp from "./pages/otp/NewPasswordCheckOtp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/housing-details/:id",
    element: <HousingDetails />,
  },
  {
    path: "/show-company/:id",
    element: <CompanyPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/otp-code",
    element: <VerifyEmail />,
  },
  {
    path: "/new-password/otp",
    element: <NewPasswordOtp />,
  },
  {
    path: "/new-password/otp-check",
    element: <NewPasswordCheckOtp />,
  },
  {
    path: "/email/verify/otp",
    element: <VerifyEmail />,
  },
  {
    path: "/reset-password",
    element: <NewPassword />,
  },

  // Creating Housing Processing
  {
    path: "/processing/start",
    element: <Start />,
  },
  {
    path: "/processing/create-housing/start",
    element: <CreateHousingStart />,
  },
  {
    path: "/processing/create-housing/step1-1",
    element: <HousingProcessingStep1_1 />,
  },
  {
    path: "/processing/create-housing/step1-2",
    element: <HousingProcessingStep1_2 />,
  },
  {
    path: "/processing/create-housing/step1-3",
    element: <HousingProcessingStep1_3 />,
  },
  {
    path: "/processing/create-housing/step1-4",
    element: <HousingProcessingStep1_4 />,
  },
  {
    path: "/processing/create-housing/step1-5",
    element: <HousingProcessingStep1_5 />,
  },
  {
    path: "/processing/create-housing/step1-6",
    element: <HousingProcessingStep1_6 />,
  },
  {
    path: "/processing/create-housing/step2-start",
    element: <Step2Start />,
  },
  {
    path: "/processing/create-housing/step2-1",
    element: <HousingProcessingStep2_1 />,
  },
  {
    path: "/processing/create-housing/step2-2",
    element: <HousingProcessingStep2_2 />,
  },
  {
    path: "/processing/create-housing/step2-3",
    element: <HousingProcessingStep2_3 />,
  },
  {
    path: "/processing/create-housing/step2-4",
    element: <HousingProcessingStep2_4 />,
  },
  {
    path: "/processing/create-housing/step2-5",
    element: <HousingProcessingStep2_5 />,
  },
  {
    path: "/processing/create-housing/step3-start",
    element: <Step3Start />,
  },
  {
    path: "/processing/create-housing/step3-1",
    element: <HousingProcessingStep3_1 />,
  },
  {
    path: "/processing/create-housing/step3-2",
    element: <HousingProcessingStep3_2 />,
  },
  {
    path: "/processing/create-housing/finish",
    element: <HousingProcessingFinish />,
  },
  {
    path: "/processing/create-housing/preview",
    element: <Preview />,
  },

  // Admin paths
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/profile",
    element: <MyProfile />,
  },
  {
    path: "/admin/housing",
    element: <AdminHousing />,
  },
  {
    path: "/admin/orders",
    element: <AdminOrders />,
  },
  {
    path: "/admin/orders-in-progress",
    element: <AdminOrdersInProgress />,
  },
  {
    path: "/admin/orders-completed",
    element: <AdminOrdersCompleted />,
  },
  {
    path: "/admin/orders-cancelled",
    element: <AdminOrdersCancelled />,
  },
  {
    path: "/admin/orders-refused",
    element: <AdminOrdersRefused />,
  },
  {
    path: "/admin/my-company/",
    element: <MyCompany />,
  },
  {
    path: "/admin/users-company",
    element: <UsersCompany />,
  },
  {
    path: "/admin/users",
    element: <AllUsers />,
  },
  {
    path: "/admin/categories",
    element: <AllCategories />,
  },
  {
    path: "/admin/categories-type",
    element: <AllCategoriesType />,
  },

  {
    path: "/*",
    element: <Error404 />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
