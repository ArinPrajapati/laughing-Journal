import AuthRoutes from "./auth";
import express from "express";
const router = express.Router();

router.use("/auth", AuthRoutes);
export default router;
