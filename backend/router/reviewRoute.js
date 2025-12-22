import express from "express";
import {
  deleteReview,
  reviewList,
  sendReview,
} from "../controller/reviewController.js";
import upload from "../middleware/multer.js";

const reviewRoute = express.Router();

reviewRoute.get("/", reviewList);
// reviewRoute.js
reviewRoute.post("/add", upload.single("image"), sendReview);
reviewRoute.delete("/delete", deleteReview);

export default reviewRoute;
