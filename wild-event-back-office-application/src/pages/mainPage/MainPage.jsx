import { ResponsiveLayout } from "../layout/ResponsiveLayout"
import { MainPageDesktop } from "./MainPageDesktop"
import { MainPagePhone } from "./MainPagePhone"

export const MainPage = () => {
	return (
		<ResponsiveLayout
			desktopComponent={<MainPageDesktop />}
			phoneComponent={<MainPagePhone />}
		/>
	)
}
