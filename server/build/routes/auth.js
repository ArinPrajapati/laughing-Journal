"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controller/auth");
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
routes.post("/signup", auth_1.signup);
routes.post("/migicLink", auth_1.magicLogin);
routes.post("/login", auth_1.login);
exports.default = routes;
