import classes from "./MainRouterHeader.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";

function MainRouterHeader() {
	const location = useLocation();
	// To 'toggle' the Add Task button with a Incomplete Tasks button depending on the url
    // NavLink allows for css styling w.r.t the "current path" (from the isActive attribute) -> can assign a style based on whether it is active or not
	let secondLink = (
		<li>
			<NavLink
				to="/new"
				className={({ isActive }) =>
					isActive ? classes.active : undefined
				}
			>
				Add Task
			</NavLink>
		</li>
	);
	if (location.pathname.includes("completed")) {
		secondLink = (
			<li>
				<Link
					to="/"
				>
					Incomplete Tasks
				</Link>
			</li>
		);
	}

	return (
		<header className={classes.header}>
			<Link to="/">
				<h1>クリスプ</h1>
			</Link>
			<nav>
				<ul className={classes.list}>
					<li>
						<NavLink
							to="/completed"
							className={({ isActive }) =>
								isActive ? classes.active : undefined
							}
						>
							Completed Tasks
						</NavLink>
					</li>
                    {secondLink}
				</ul>
			</nav>
		</header>
	);
}

export default MainRouterHeader;
