import { DashboardComponent } from "../../components/dashboard/DashboardComponent"
import { HeaderComponent } from "../../components/header/HeaderComponent"

export const DesktopLayout = ({ children }) => {
	return (
		<>
			<HeaderComponent />
			<DashboardComponent />
			{children}
		</>
	)
}
