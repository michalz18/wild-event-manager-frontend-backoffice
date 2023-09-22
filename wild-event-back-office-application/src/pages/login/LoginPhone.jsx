import LoginForm from "../../components/loginForm/LoginForm"
import { MenuAppBar } from "../../components/menuAppBar/MenuAppBar"
import { PhoneLayout } from "../layout/PhoneLayout"

export const LoginPhone = () => {
	return (
		<PhoneLayout>

			<MenuAppBar />
			<LoginForm isMobileView={true}/>
		</PhoneLayout>
	)
}
