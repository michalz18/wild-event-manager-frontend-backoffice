import { createBrowserRouter } from "react-router-dom";
import Test from "./test";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
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
        path: "/my-notifications/notification",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/my-notifications/notification/id",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/notification-management/notification",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/notification-management/notification/id",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/notification-management/notification/archive",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/notification-management/notification/archive/id",
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
