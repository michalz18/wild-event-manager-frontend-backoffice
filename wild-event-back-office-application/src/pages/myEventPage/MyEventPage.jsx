import { ResponsiveLayout } from "../layout/ResponsiveLayout"
import { MyEventPageDesktop } from "./MyEventPageDesktop"
import { MyEventPagePhone } from "./MyEventPagePhone"

export const MyEventPage = () => {
	return (
		<>
			<ResponsiveLayout
				phoneComponent={<MyEventPagePhone />}
				desktopComponent={<MyEventPageDesktop />}
			/>
		</>
	)
}
