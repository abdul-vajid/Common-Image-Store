import express from "express";
import { userAuthorization } from "../middlewares/authorization/userAuthorization";
import { authRouter } from "./userRouter";
import { storeRouter } from "./storeRouter";
import { subsRouter } from "./subscriptionRouter";

const routes = express.Router();

routes.use("/auth", authRouter);

routes.use("/store", userAuthorization, storeRouter);

routes.use("/subscription", userAuthorization, subsRouter);

export default routes;