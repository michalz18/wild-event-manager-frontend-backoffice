import { PhoneLayout } from "../layout/PhoneLayout"
import EmployeeTable from "../../components/employeeManager/mainTable/EmployeeTable"

export const EmployeePagePhone = () => {
	return (
		<>
			<PhoneLayout>
				<EmployeeTable />
			</PhoneLayout>
		</>
	)
}
