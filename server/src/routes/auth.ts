import { signup } from "../controller/auth";
import express from "express";
import sanitizeMiddleware from "../middleware/sanitizeInput";

const routes = express.Router();
routes.post("/signup", signup);

export default routes;
