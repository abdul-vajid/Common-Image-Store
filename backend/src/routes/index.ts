import express from "express";
import { userAuthorization } from "../middlewares/authorization/userAuthorization";
import { authRouter } from "./authRouter";
import { storeRouter } from "./storeRouter";

const routes = express.Router();

routes.use("/auth", userAuthorization, authRouter);

routes.use("/", userAuthorization, storeRouter);

export default routes;