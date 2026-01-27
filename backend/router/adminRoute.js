import express from "express";
import {
  adminList,
  adminLogin,
  adminRegister,
  removeAdmin,
  superAdminLogin,
} from "../controller/adminController.js";
import authSuper from "../middleware/authSuper.js";
import authAdmin from "../middleware/authAdmin.js";
import { verifyRequest } from "../controller/ownerController.js";
import { adminMessList } from "../controller/messController.js";
import { adminPgList } from "../controller/pgController.js";
import { adminHostelList } from "../controller/hostelController.js";
import { adminCollegeList } from "../controller/collegeController.js";

const adminRoute = express.Router();

adminRoute.post("/super-login", superAdminLogin);
adminRoute.post("/login", adminLogin);
adminRoute.post("/register", authSuper, adminRegister);
adminRoute.get("/list", authSuper, adminList);
adminRoute.delete("/delete/:id", authSuper, removeAdmin);
adminRoute.patch("/verify/:id", authAdmin, verifyRequest);

adminRoute.get("/college", authSuper, adminCollegeList);
adminRoute.get("/hostel", authSuper, adminHostelList);
adminRoute.get("/pg", authSuper, adminPgList);
adminRoute.get("/mess", authSuper, adminMessList);

export default adminRoute;
