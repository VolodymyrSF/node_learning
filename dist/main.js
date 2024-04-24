"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./routers/user.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/users", user_router_1.userRouter);
app.use("/users", user_router_1.userRouter);
app.use("*", (err, req, res, next) => {
    return res.status(err.status || 500).json(err.message);
});
process.on("uncaughtException", (error) => {
    console.error("uncaughtException: ", error);
    process.exit(2);
});
const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}/`);
});
