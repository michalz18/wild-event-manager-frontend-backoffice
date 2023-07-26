import { Outlet, NavLink } from "react-router-dom";

const Layout = () => (
    <div className="Layout">
        <nav>
            <ul>
                <li className="grow">
                    <NavLink to="/">MainPage</NavLink>
                </li>
                <li>
                    <NavLink to="/">
                        <button type="button">Btn</button>
                    </NavLink>
                </li>
            </ul>
        </nav>
        <Outlet />
    </div>
);

export default Layout;