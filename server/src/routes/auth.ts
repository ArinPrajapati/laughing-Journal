import { login, magicLogin, signup } from "../controller/auth";
import express from "express";

const routes = express.Router();
routes.post("/signup", signup);
routes.post("/migicLink", magicLogin);
routes.post("/login", login);

export default routes;
