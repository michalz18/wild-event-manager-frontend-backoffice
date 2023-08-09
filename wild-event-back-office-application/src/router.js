import { createBrowserRouter } from "react-router-dom";
import Test from "./test";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/layout/Layout";
import LoginForm from "./components/loginForm/LoginForm";
import EmployeeTable from "./components/employeeManager/emplyeeTable/EmployeeTable"


const router = createBrowserRouter([
  {
    path: "/",
    element: <EmployeeTable />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/signup",
        element: <LoginForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/my-events/event",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/my-events/event/:id",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/event-management/event",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/event-management/event/id",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/event-management/event/waiting",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/staff-management/staff",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/staff-management/staff/id",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/map-config/location",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/map-config/location/id",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/map-config/map",
        element: <Test />,
        errorElement: <ErrorPage />,
      }
    ],
  },
])

export default router;
