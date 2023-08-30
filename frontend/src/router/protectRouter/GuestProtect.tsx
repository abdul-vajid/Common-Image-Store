import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/storeHook";


const GuestProtect: React.FC = () => {
    const { accessToken } = useAppSelector(state => state.userReducer)
    const location = useLocation();

    return !accessToken || accessToken == null ? (
        <Outlet />
    ) : (
        <Navigate to="/user/home" state={{ from: location.pathname }} replace={true} />
    )
}

export default GuestProtect;