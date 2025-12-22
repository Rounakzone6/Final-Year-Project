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

const adminRoute = express.Router();

adminRoute.post("/register", authSuper, adminRegister);
adminRoute.get("/list", authSuper, adminList);
adminRoute.delete("/delete/:id", authSuper, removeAdmin);
adminRoute.post("/login", adminLogin);
adminRoute.post("/super-login", superAdminLogin);
adminRoute.patch("/verify/:id", authAdmin, verifyRequest);

export default adminRoute;
