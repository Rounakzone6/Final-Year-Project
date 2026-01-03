import express from "express";
import upload from "../middleware/multer.js";
import { collegeAdd } from "../controller/collegeController.js";
import { hostelAdd } from "../controller/hostelController.js";
import { pgAdd } from "../controller/pgController.js";
import { messAdd } from "../controller/messController.js";
import {
  contribution,
  contributionCount,
} from "../controller/contributeController.js";

const contributeRoute = express.Router();

contributeRoute.get("/", contribution);
contributeRoute.get("/count", contributionCount);
contributeRoute.post("/college/add", upload.single("image"), collegeAdd);
contributeRoute.post("/hostel/add", upload.array("image", 3), hostelAdd);
contributeRoute.post("/pg/add", upload.array("image", 3), pgAdd);
contributeRoute.post("/mess/add", upload.array("image", 3), messAdd);

export default contributeRoute;
