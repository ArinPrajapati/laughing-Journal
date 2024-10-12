"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = require("./config/connectDB");
const sanitizeInput_1 = __importDefault(require("./middleware/sanitizeInput"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8800;
// loading of configs & middlewares
(0, connectDB_1.connectDB)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(sanitizeInput_1.default);
app.get("/", (req, res) => {
    res.send("Yes, I am alive, I am working fine");
});
app.use("/api", routes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
