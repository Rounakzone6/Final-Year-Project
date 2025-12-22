import stateModel from "../models/stateModel.js";

const stateList = async (req, res) => {
  try {
    const states = await stateModel.find();
    if (!states)
      return res.json({ success: false, message: "State not found" });
    res.json({ success: true, states });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const addState = async (req, res) => {
  try {
    const { name } = req.body;
    const state = await stateModel.findOne({ name });
    if (state)
      return res.json({ success: false, message: "State already exists" });
    const newState = new stateModel({ name });
    await newState.save();
    res.json({ success: true, message: "State Added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addState, stateList };
