import express from "express";
import {
  addCollege,
  collegeDetails,
  collegeList,
  editCollege,
  hostelNearCollege,
  messNearCollege,
  pgNearCollege,
  removeCollege,
} from "../controller/collegeController.js";
import authAdmin from "../middleware/authAdmin.js";

const collegeRoute = express.Router();

collegeRoute.get("/", collegeList);
collegeRoute.get("/:id", collegeDetails);
collegeRoute.get("/:id/hostel", hostelNearCollege);
collegeRoute.get("/:id/pg", pgNearCollege);
collegeRoute.get("/:id/mess", messNearCollege);
collegeRoute.post("/add", addCollege);
collegeRoute.patch("/update/:id", authAdmin, editCollege);
collegeRoute.delete("/delete/:id", authAdmin, removeCollege);

export default collegeRoute;
