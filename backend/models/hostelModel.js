import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "city", required: true },
    college: { type: mongoose.Schema.Types.ObjectId, ref: "college" },
    image: { type: [String], required: true },
    nonveg: { type: Boolean, default: true },
    phone: { type: Number, required: true },
    price: { type: Number, required: true },
    isVerified: { type: Boolean, default: false },
    locations: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: { type: [Number], required: true },
      address: String,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
  },
  { timestamps: true }
);

const hostelModel =
  mongoose.models.hostel || mongoose.model("hostel", hostelSchema);

export default hostelModel;
