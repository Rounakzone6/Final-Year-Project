import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
    image: { type: Array },
    college: [{ type: mongoose.Schema.Types.ObjectId, ref: "college" }],
    hostel: [{ type: mongoose.Schema.Types.ObjectId, ref: "hostel" }],
    pg: [{ type: mongoose.Schema.Types.ObjectId, ref: "pg" }],
    mess: [{ type: mongoose.Schema.Types.ObjectId, ref: "mess" }],
  },
  { timestamps: true }
);

const reviewModel =
  mongoose.models.review || mongoose.model("review", reviewSchema);

export default reviewModel;
