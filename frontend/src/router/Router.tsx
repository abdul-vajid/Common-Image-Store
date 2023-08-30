import React from "react";
import { Routes, Route, } from "react-router-dom";
import { HomePage } from "../Pages/HomePage";
import UserProtect from "./protectRouter/UserProtect";
import GuestProtect from "./protectRouter/GuestProtect";
import { LandingPage } from "../Pages/LandingPage";
import { SigninPage } from "../Pages/SigninPage";
import { SignupPage } from "../Pages/SignupPage";
import { SuccessPage } from "../Pages/SuccessPage";
import { CancelPage } from "../Pages/CancelPage";
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