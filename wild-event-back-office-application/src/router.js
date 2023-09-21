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
        path: "/my-events",
        element: <MyEventPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/event-management",
        element: <EventPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/staff-management",
        element: <EmployeePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/map-config",
				element: <MapPage/>,
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
