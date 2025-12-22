import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import {
  addMess,
  editMess,
  messDetails,
  messList,
  removeMess,
} from "../controller/messController.js";
import upload from "../middleware/multer.js";

const messRoute = express.Router();

messRoute.get("/", messList);
messRoute.get("/:id", messDetails);
// messRoute.post("/add", upload.fields("image"), addMess);
messRoute.post("/add", addMess);
messRoute.patch("/update/:id", authAdmin, editMess);
messRoute.delete("/delete/:id", authAdmin, removeMess);

export default messRoute;
