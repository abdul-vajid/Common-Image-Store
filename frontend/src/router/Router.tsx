import React from "react";
import { Routes, Route, } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import AuthPage from "../Pages/AuthPage";
import NotFound from "./NotFound";
import UserProtect from "./protectRouter/UserProtect";
import GuestProtect from "./protectRouter/GuestProtect";
import LandingPage from "../Pages/LandingPage";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<UserProtect />}>
                <Route path="/home" element={<HomePage />} />
            </Route>
            <Route path="/" element={<GuestProtect />}>
                <Route path="/login" element={<AuthPage />} />
                <Route path="/signup" element={<AuthPage />} />
                <Route path="/" element={<LandingPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Router