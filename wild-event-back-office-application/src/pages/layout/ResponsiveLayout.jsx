import { useMediaQuery } from "react-responsive"
import { PhoneLayout } from "./PhoneLayout"
import { DesktopLayout } from "./DesktopLayout"

export const ResponsiveLayout = () => {
	const isPhone = useMediaQuery({ maxWidth: 767 })

	return <>{isPhone ? <PhoneLayout /> : <DesktopLayout />}</>
}
