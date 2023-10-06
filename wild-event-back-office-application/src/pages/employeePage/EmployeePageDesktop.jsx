import { DesktopLayout } from "../layout/DesktopLayout"
import EmployeeTable from "../../components/employeeManager/mainTable/EmployeeTable";

export const EmployeePageDesktop = () => {
	return (
		<>
			<DesktopLayout>
				<EmployeeTable />
				</DesktopLayout>
		</>
	)
}
