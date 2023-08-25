import express from "express"
import dotenv from "dotenv";
import helmet from 'helmet';
dotenv.config();
import morgan from "morgan";
import errorHandler from "./middlewares/error/errorHandler";
import cors from "./middlewares/security/cors";
import connectDatbase from "./config/database";
import routes from "./routes";

const app = express();

app.use(cors);;
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "dev") app.use(morgan("dev"));

connectDatbase();

app.use("/api/v1", routes);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ success: false, status: 404, message: "Not found" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server connection is now established and running on port ${port}`);
});