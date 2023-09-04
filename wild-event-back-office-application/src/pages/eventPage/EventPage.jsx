import { ResponsiveLayout } from "../layout/ResponsiveLayout"
import { EventPageDesktop } from "./EventPageDesktop"
import { EventPagePhone } from "./EventPagePhone"

export const EventPage = () => {
	return (
		<>
			<ResponsiveLayout
				phoneComponent={<EventPagePhone />}
				desktopComponent={<EventPageDesktop />}
			/>
		</>
	)
}
