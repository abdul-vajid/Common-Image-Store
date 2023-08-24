import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/storeHook";


const UserProtect: React.FC = () => {
    const { accessToken } = useAppSelector(state => state.userReducer)
    const location = useLocation();

    return accessToken ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location.pathname }} replace={true} />
    )
}

export default UserProtect;