import { ResponsiveLayout } from "../layout/ResponsiveLayout"
import { WelcomeWindow } from "../../components/welcomeWindow/WelcomeComponent"

export const MainPage = () => {
	return (
		<>
			<ResponsiveLayout />
			<WelcomeWindow />
		</>
	)
}
