"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var connectDB_1 = require("./config/connectDB");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 8800;
// loading of configs
(0, connectDB_1.connectDB)();
app.use(express_1.default.json());
app.get("/", function (req, res) {
    res.send("Yes, I am alive, I am working fine");
});
app.listen(port, function () {
    console.log("Server is running on port http://localhost:".concat(port));
});
