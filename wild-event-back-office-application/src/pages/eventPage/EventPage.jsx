import Calendar from "../../components/eventManager/calendar/Calendar"
import { ResponsiveLayout } from "../layout/ResponsiveLayout"

export const EventPage = () => {
	return (
		<>
			<ResponsiveLayout />
			<Calendar isAdmin={true} />
		</>
	)
}
