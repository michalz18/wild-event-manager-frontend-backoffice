import { ResponsiveLayout } from "../layout/ResponsiveLayout"
import { LogoutPagePhone } from "./LogoutPagePhone"
import { LogoutPageDesktop } from "./LogoutPageDesktop"

export const LogoutPage = () => {
	return (
		<ResponsiveLayout
			phoneComponent={<LogoutPagePhone />}
			desktopComponent={<LogoutPageDesktop />}
		/>
	)
}
