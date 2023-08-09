import { Outlet } from "react-router-dom"
import Navigation from "../../components/navigation/Navigation"

const Layout = () => (
	<div className='Layout'>
		<Navigation />
		<Outlet />
	</div>
)

export default Layout
