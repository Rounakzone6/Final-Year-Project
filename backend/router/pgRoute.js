import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import {
  addpg,
  editpg,
  pgDetails,
  pgList,
  removepg,
} from "../controller/pgController.js";
import upload from "../middleware/multer.js";

const pgRoute = express.Router();

pgRoute.get("/", pgList);
pgRoute.get("/:id", pgDetails);
pgRoute.post("/add", upload.fields("image"), addpg);
pgRoute.patch("/update/:id", authAdmin, editpg);
pgRoute.delete("/delete/:id", authAdmin, removepg);

export default pgRoute;