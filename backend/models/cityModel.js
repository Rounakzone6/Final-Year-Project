import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "state",
      required: true,
    },
    image: { type: String, required: true },
    colleges: [{ type: mongoose.Schema.Types.ObjectId, ref: "college" }],
    hostels: [{ type: mongoose.Schema.Types.ObjectId, ref: "hostel" }],
    pgs: [{ type: mongoose.Schema.Types.ObjectId, ref: "pg" }],
    mess: [{ type: mongoose.Schema.Types.ObjectId, ref: "mess" }],
  },
  { timestamps: true }
);

const cityModel = mongoose.models.city || mongoose.model("city", citySchema);

export default cityModel;
