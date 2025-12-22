import express from "express";
import { addState,stateList } from "../controller/stateController.js";

const stateRoute = express.Router();

stateRoute.get("/", stateList);
stateRoute.post("/add", addState);

export default stateRoute;
