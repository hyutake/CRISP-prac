import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import MainRouterHeader from "../components/Layout/MainRouterHeader";

const RootLayout = () => {
    return (
        <Fragment>
            <MainRouterHeader />
            <main>
                <Outlet />
            </main>
        </Fragment>
    )
};

export default RootLayout