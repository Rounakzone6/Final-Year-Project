import express from "express";
import upload from "../middleware/multer.js";
import {
  sendReview,
  reviewList,
  deleteReview,
} from "../controller/reviewController.js";

const reviewRoute = express.Router();

reviewRoute.get("/", reviewList);
// reviewRoute.js
reviewRoute.post("/add", upload.single("image"), sendReview);
reviewRoute.delete("/delete", deleteReview);

export default reviewRoute;
