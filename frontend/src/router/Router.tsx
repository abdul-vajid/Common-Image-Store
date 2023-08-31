import React from "react";
import { Routes, Route, } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import UserProtect from "./protectRouter/UserProtect";
import GuestProtect from "./protectRouter/GuestProtect";
import { LandingPage } from "../pages/LandingPage";
import { SigninPage } from "../pages/SigninPage";
import { SignupPage } from "../pages/SignupPage";
import { SuccessPage } from "../pages/SuccessPage";
import { CancelPage } from "../pages/CancelPage";
import { NotFound } from "./NotFound";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/user" element={<UserProtect />}>
                <Route path="/user/home" element={<HomePage />} />
                <Route path="/user/success/:id" element={<SuccessPage />} />
                <Route path="/user/cancel/:id" element={<CancelPage />} />
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