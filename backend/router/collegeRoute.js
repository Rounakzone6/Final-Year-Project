import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import authSuper from "../middleware/authSuper.js";
import {
  collegeList,
  collegeDetails,
  addCollege,
  editCollege,
  removeCollege,
  hostelNearCollege,
  messNearCollege,
  pgNearCollege,
  verifyCollege,
  unverifyCollege,
} from "../controller/collegeController.js";

const collegeRoute = express.Router();

collegeRoute.get("/", collegeList);
collegeRoute.post("/add", addCollege);
collegeRoute.patch("/update/:id", authAdmin, editCollege);
collegeRoute.patch("/verify/:id", authSuper, verifyCollege);
collegeRoute.patch("/unverify/:id", authSuper, unverifyCollege);
collegeRoute.delete("/delete/:id", authAdmin, removeCollege);
collegeRoute.get("/:id", collegeDetails);
collegeRoute.get("/:id/hostel", hostelNearCollege);
collegeRoute.get("/:id/pg", pgNearCollege);
collegeRoute.get("/:id/mess", messNearCollege);

export default collegeRoute;
