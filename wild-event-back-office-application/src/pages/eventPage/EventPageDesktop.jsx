import { DesktopLayout } from "../layout/DesktopLayout"
import Calendar from "../../components/eventManager/calendar/Calendar"

export const EventPageDesktop = () => {
	return (
		<>
			<DesktopLayout>
				<Calendar isAdmin={true} />
			</DesktopLayout>
		</>
	)
}
