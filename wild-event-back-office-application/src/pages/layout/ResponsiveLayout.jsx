import { useMediaQuery } from "react-responsive"

export const ResponsiveLayout = ({ phoneComponent, desktopComponent }) => {
	const isPhone = useMediaQuery({ maxWidth: 767 })

	return isPhone ? phoneComponent : desktopComponent
}
