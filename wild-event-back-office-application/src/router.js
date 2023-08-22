import { createBrowserRouter } from "react-router-dom"
import Test from "./test"
import EventList from "./pages/EventList"
import ErrorPage from "./pages/ErrorPage"
import Layout from "./pages/layout/Layout"
import LoginForm from "./components/loginForm/LoginForm"
import { LogoutPage } from "./pages/LogoutPage"
import { MainPage } from "./pages/MainPage"
import { DarkModeProvider } from "./components/darkMode/DarkModeProvider"
import { MyEventList } from "./pages/MyEventList"
import Calendar from "./components/eventManager/calendar/Calendar";
import EventForm from "./components/eventManager/newEventForm/EventForm";


const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<DarkModeProvider>
				<Layout />
			</DarkModeProvider>
		),
		errorElement: <ErrorPage />,
		children: [
      {
        path: "/calendar",
        element: <Calendar isAdmin={true} />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/add-event",
        element: <EventForm />,
        errorElement: <ErrorPage />,
      },
			{
				path: "/signup",
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
				element: <MyEventList />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/my-events/event/:id",
				element: <Test />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/event-management/event",
				element: <EventList />,
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
			},
			{
				path: "/logout",
				element: <LogoutPage />, // Dodaj tę ścieżkę
				errorElement: <ErrorPage />,
			},
		],
	},
])

export default router
