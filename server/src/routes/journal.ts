import {
  createJournal,
  deleteJournal,
  getAllbyUser,
  updateJournal,
} from "../controller/journal";
import express from "express";

const routes = express.Router();

routes.post("/create", createJournal);
routes.post("/update", updateJournal);
routes.post("/delete", deleteJournal);
routes.get("/getAll", getAllbyUser);

export default routes;
