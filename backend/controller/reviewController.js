import reviewModel from "../models/reviewModel.js";
import { v2 as cloudinary } from "cloudinary";

const sendReview = async (req, res) => {
  try {
    const { username, rating, comment } = req.body;
    let imageUrl = (await cloudinary.uploader.upload(req.file.path)).secure_url;

    const newReview = new reviewModel({
      username,
      rating,
      comment,
      image: imageUrl,
    });
    await newReview.save();
    res.json({ success: true, message: "Review added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const reviewList = async (req, res) => {
  try {
    const review = await reviewModel.findById(id);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { sendReview, reviewList, deleteReview };
