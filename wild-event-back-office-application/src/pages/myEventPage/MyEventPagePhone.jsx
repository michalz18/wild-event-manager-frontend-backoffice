import MyEventList from "../../components/myEvent/MyEventsList"
import { PhoneLayout } from "../layout/PhoneLayout"

export const MyEventPagePhone = () => {
	return (
		<>
			<PhoneLayout>
				<MyEventList isMobileView={true} />
			</PhoneLayout>
		</>
	)
}
