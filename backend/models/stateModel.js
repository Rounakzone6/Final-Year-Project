import mongoose from "mongoose";

const stateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cities: [{ type: mongoose.Schema.Types.ObjectId, ref: "city" }],
  },
  { timestamps: true }
);

const stateModel =
  mongoose.models.state || mongoose.model("state", stateSchema);

export default stateModel;
