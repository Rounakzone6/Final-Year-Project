import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contact: { type: Number, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ownerModel =
  mongoose.models.owner || mongoose.model("owner", ownerSchema);

export default ownerModel;
