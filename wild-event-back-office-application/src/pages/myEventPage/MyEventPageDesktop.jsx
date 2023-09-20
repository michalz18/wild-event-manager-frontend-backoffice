import MyEventList from "../../components/myEvent/MyEventsList"
import { DesktopLayout } from "../layout/DesktopLayout"

export const MyEventPageDesktop = () => {
	return (
		<>
			<DesktopLayout>
				<MyEventList />
			</DesktopLayout>
		</>
	)
}
