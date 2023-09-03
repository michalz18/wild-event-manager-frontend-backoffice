import { ResponsiveLayout } from "../layout/ResponsiveLayout"
import { EmployeePageDesktop } from "./EmployeePageDesktop"
import { EmployeePagePhone } from "./EmployeePagePhone"

export const EmployeePage = () => {
	return (
		<ResponsiveLayout
			phoneComponent={<EmployeePagePhone />}
			desktopComponent={<EmployeePageDesktop />}
		/>
	)
}
