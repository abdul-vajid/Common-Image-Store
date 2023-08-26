import React from "react";
import { Routes, Route, } from "react-router-dom";
import {HomePage} from "../Pages/HomePage";
import NotFound from "./NotFound";
import UserProtect from "./protectRouter/UserProtect";
import GuestProtect from "./protectRouter/GuestProtect";
import {LandingPage} from "../Pages/LandingPage";
import {SigninPage} from "../Pages/SigninPage";
import {SignupPage} from "../Pages/SignupPage";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/home" element={<UserProtect />}>
                <Route path="/home" element={<HomePage />} />
            </Route>
            <Route path="/" element={<GuestProtect />}>
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/" element={<LandingPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Router