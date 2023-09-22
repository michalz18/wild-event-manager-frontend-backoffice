import Calendar from "../../components/eventManager/calendar/Calendar";
import { PhoneLayout } from "../layout/PhoneLayout";

export const EventPagePhone = () => {
	return (
		<>
			<PhoneLayout>
				<Calendar isAdmin={true} isMobileView={true} />
			</PhoneLayout>
		</>
	)
}
