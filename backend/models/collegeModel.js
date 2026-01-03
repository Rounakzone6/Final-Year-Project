import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "city", required: true },
    image: { type: String, required: true },
    phone: { type: Number, required: true },
    url: { type: String, required: true },
    about: { type: String, required: true },
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
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
    hostels: [{ type: mongoose.Schema.Types.ObjectId, ref: "hostel" }],
    pgs: [{ type: mongoose.Schema.Types.ObjectId, ref: "pg" }],
    mess: [{ type: mongoose.Schema.Types.ObjectId, ref: "mess" }],
  },
  { timestamps: true }
);

collegeSchema.index({ "locations.coordinates": "2dsphere" });

const collegeModel =
  mongoose.models.college || mongoose.model("college", collegeSchema);

export default collegeModel;
