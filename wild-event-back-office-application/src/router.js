import { Outlet, createBrowserRouter } from "react-router-dom";
import Test from "./test";
import ErrorPage from "./pages/ErrorPage";
import LoginForm from "./components/loginForm/LoginForm";
import ResetPasswordForm from "./components/resetPasswordForm/ResetPasswordForm";
import {
  MainPage,
  LogoutPage,
  EventPage,
  MyEventPage,
  EmployeePage,
  MapPage,
} from "./pages/index";
import { UserProvider } from "./services/useUser";
import { DarkModeProvider } from "./components/darkMode/DarkModeProvider";
import { CalendarPage } from "./pages/CalendarPage";
import { MapUploader } from "./pages/MapUploader";
import EventForm from "./components/eventManager/newEventForm/EventForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DarkModeProvider>
        <UserProvider>
          <Outlet />
        </UserProvider>
      </DarkModeProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/calendar",
        element: <CalendarPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/add-event",
        element: <EventForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/",
        element: <LoginForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/main",
        element: <MainPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/my-events/event",
        element: <MyEventPage />,
        text: "My events",
        errorElement: <ErrorPage />,
      },
      {
        path: "/my-events/event/:id",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/event-management/event",
        element: <EventPage />,
        text: "Event management",
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
        path: "/staff-management",
        element: <EmployeePage />,
        text: "Employee management",
        errorElement: <ErrorPage />,
      },
      {
        path: "/map-config/map",
        element: <MapUploader />,
        text: "Map configuration",
        errorElement: <ErrorPage />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPasswordForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
