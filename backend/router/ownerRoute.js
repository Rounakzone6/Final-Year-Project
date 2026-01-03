import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import {
  sendRequest,
  requestList,
  rejectRequest,
} from "../controller/ownerController.js";

const ownerRoute = express.Router();

ownerRoute.get("/", requestList);
ownerRoute.post("/request", sendRequest);
ownerRoute.delete("/delete/:id", authAdmin, rejectRequest);

export default ownerRoute;
