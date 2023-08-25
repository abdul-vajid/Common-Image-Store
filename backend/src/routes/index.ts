import express from "express";
import { userAuthorization } from "../middlewares/authorization/userAuthorization";
import { authRouter } from "./authRouter";
import { storeRouter } from "./storeRouter";

const routes = express.Router();

routes.use("/auth", authRouter);

routes.use("/store", userAuthorization, storeRouter);

export default routes;