import validator from "validator";
import ownerModel from "../models/ownerModel.js";

const sendRequest = async (req, res) => {
  try {
    const { name, contact } = req.body;
    if (!name || !contact)
      return res.json({ success: false, message: "Missing details" });

    if (!validator.isMobilePhone(contact, "en-IN"))
      return res.json({
        success: false,
        message: "Enter a valid phone number",
      });

    const newRequest = new ownerModel({ name, contact });
    await newRequest.save();
    res.json({ success: true, message: "Request sent" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const ownerDetails = async (req, res) => {
  try {
    const { id } = req.params;
  } catch (error) {}
};

const requestList = async (req, res) => {
  try {
    const owners = await ownerModel.find();
    res.json({ success: true, owners });
  } catch (error) {
    res.json({ success: true, message: error.message });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await ownerModel.findByIdAndDelete(id);
    if (!owner) return res.json({ success: false, message: "owner not found" });
    res.json({ success: true, messaeg: "Request rejected" });
  } catch (error) {
    res.json({ success: true, message: error.message });
  }
};

const verifyRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await ownerModel.findByIdAndUpdate(
      id,
      { verified: true },
      { new: true }
    );
    if (!owner) return res.json({ success: false, message: "Owner not found" });
    res.json({ success: true, message: "Owner Verified" });
  } catch (error) {
    res.json({ success: true, message: error.message });
  }
};

export { requestList, sendRequest, verifyRequest, rejectRequest, ownerDetails };
