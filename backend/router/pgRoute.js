import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import upload from "../middleware/multer.js";
import {
  addpg,
  editpg,
  removepg,
  pgList,
  pgDetails,
} from "../controller/pgController.js";

const pgRoute = express.Router();

pgRoute.get("/", pgList);
pgRoute.get("/:id", pgDetails);
pgRoute.post("/add", upload.array("image",3), addpg);
pgRoute.patch("/update/:id", authAdmin, editpg);
pgRoute.delete("/delete/:id", authAdmin, removepg);

export default pgRoute;