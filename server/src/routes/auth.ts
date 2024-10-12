import { login, magicLogin, signup, updatePassword } from "../controller/auth";
import express from "express";

const routes = express.Router();
routes.post("/signup", signup);
routes.post("/migicLink", magicLogin);
routes.post("/login", login);
routes.post("/updatePassword", updatePassword);

export default routes;
