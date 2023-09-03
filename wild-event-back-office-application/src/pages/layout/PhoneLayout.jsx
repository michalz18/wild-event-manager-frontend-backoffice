import { MenuAppBar } from "../../components/menuAppBar/MenuAppBar"

export const PhoneLayout = ({ children }) => {
	return (
		<>
			<MenuAppBar />
			{children}
		</>
	)
}
