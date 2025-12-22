import express from "express";
import {
  rejectRequest,
  requestList,
  sendRequest,
} from "../controller/ownerController.js";
import authAdmin from "../middleware/authAdmin.js";
const ownerRoute = express.Router();

ownerRoute.get("/", requestList);
ownerRoute.post("/request", sendRequest);
ownerRoute.delete("/delete/:id", authAdmin, rejectRequest);

export default ownerRoute;
