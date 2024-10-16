import AuthRoutes from "./auth";
import JournalRoutes from "./journal";
import express from "express";
const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/journal", JournalRoutes);
export default router;
