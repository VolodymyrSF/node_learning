"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./configs/config");
const user_router_1 = require("./routers/user.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/users", user_router_1.userRouter);
app.use("*", (err, req, res, next) => {
    return res.status(err.status || 500).json(err.message);
});
process.on("uncaughtException", (error) => {
    console.error("uncaughtException: ", error);
    process.exit(2);
});
app.listen(config_1.config.PORT, config_1.config.HOST, async () => {
    await mongoose_1.default.connect(config_1.config.MONGO_URL);
    console.log(`Server is running at http://${config_1.config.HOST}:${config_1.config.PORT}/`);
});
