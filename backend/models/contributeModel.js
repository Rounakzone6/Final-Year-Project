import mongoose from "mongoose";

const contributeSchema = new mongoose.Schema(
  {
    colleges: [{ type: mongoose.Schema.Types.ObjectId, ref: "college" }],
    hostels: [{ type: mongoose.Schema.Types.ObjectId, ref: "hostel" }],
    pgs: [{ type: mongoose.Schema.Types.ObjectId, ref: "pg" }],
    messes: [{ type: mongoose.Schema.Types.ObjectId, ref: "mess" }],
  },
  { timestamps: true }
);

const contributeModel =
  mongoose.models.contribute || mongoose.model("contribute", contributeSchema);

export default contributeModel;
