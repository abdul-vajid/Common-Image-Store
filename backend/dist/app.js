"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = __importDefault(require("./middlewares/error/errorHandler"));
const cors_1 = __importDefault(require("./middlewares/security/cors"));
const database_1 = __importDefault(require("./config/database"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
app.use(cors_1.default);
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "dev")
    app.use((0, morgan_1.default)("dev"));
(0, database_1.default)();
app.use("/api/v1", index_1.default);
app.use(errorHandler_1.default);
app.use((req, res) => {
    res.status(404).json({ success: false, status: 404, message: "Not found" });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`The server connection is now established and running on port ${port}`);
});
//# sourceMappingURL=app.js.map