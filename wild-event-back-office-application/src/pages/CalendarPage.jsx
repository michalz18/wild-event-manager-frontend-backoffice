import { DashboardComponent } from "../components/dashboard/DashboardComponent"
import Calendar from "../components/eventManager/calendar/Calendar"
import { HeaderComponent } from "../components/header/HeaderComponent"

export const CalendarPage = () => {
  
	return (
		<>
			<HeaderComponent />
			<DashboardComponent />
			<Calendar isAdmin={true} />
		</>
	)
}