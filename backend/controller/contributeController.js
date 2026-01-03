import contributeModel from "../models/contributeModel.js";

const contribution = async (req, res) => {
  try {
    const contributions = await contributeModel.find();
    res.json({ success: true, contributions });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const contributionCount = async (req, res) => {
  try {
    const res = await contributeModel.find();
    const count =
      res.colleges.length +
      res.hostels.length +
      res.messes.length +
      res.pgs.length;
    res.json({ success: true, count });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { contribution, contributionCount };
