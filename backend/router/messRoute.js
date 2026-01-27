import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import authSuper from "../middleware/authSuper.js";
import {
  messList,
  messDetails,
  addMess,
  editMess,
  removeMess,
  verifyMess,
  unverifyMess,
} from "../controller/messController.js";

const messRoute = express.Router();

messRoute.get("/", messList);
messRoute.get("/:id", messDetails);
messRoute.post("/add", addMess);
messRoute.patch("/update/:id", authAdmin, editMess);
messRoute.patch("/verify/:id", authSuper, verifyMess);
messRoute.patch("/unverify/:id", authSuper, unverifyMess);
messRoute.delete("/delete/:id", authAdmin, removeMess);

export default messRoute;
