import { DashboardComponent } from "../components/dashboard/DashboardComponent"
import { HeaderComponent } from "../components/header/HeaderComponent"
import { LogoutComponent } from "../components/logoutWindow/LogoutComponent"

export const LogoutPage = () => {
  
	return (
		<>
			<HeaderComponent />
			<DashboardComponent />
			<LogoutComponent />
		</>
	)
}
