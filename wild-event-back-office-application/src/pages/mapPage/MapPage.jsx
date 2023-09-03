import { ResponsiveLayout } from "../layout/ResponsiveLayout"
import { MapPagePhone } from "./MapPagePhone"
import { MapPageDesktop } from "./MapPageDesktop"

export const MapPage = () => {
	return (
		<ResponsiveLayout
			phoneComponent={<MapPagePhone />}
			desktopComponent={<MapPageDesktop />}
		/>
	)
}
