import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import {
  messList,
  messDetails,
  addMess,
  editMess,
  removeMess,
} from "../controller/messController.js";

const messRoute = express.Router();

messRoute.get("/", messList);
messRoute.get("/:id", messDetails);
messRoute.post("/add", addMess);
messRoute.patch("/update/:id", authAdmin, editMess);
messRoute.delete("/delete/:id", authAdmin, removeMess);

export default messRoute;
