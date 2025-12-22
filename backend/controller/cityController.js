import cityModel from "../models/cityModel.js";
import stateModel from "../models/stateModel.js";

const addCity = async (req, res) => {
  try {
    const { name, state, image } = req.body;
    let city = await cityModel.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (city) {
      return res.json({ success: false, message: "City Already Exists" });
    }
    const stateDoc = await stateModel.findOne({
      name: { $regex: new RegExp(`^${state}$`, "i") },
    });

    if (!stateDoc) {
      return res.json({
        success: false,
        message: "State not found. Create the state first.",
      });
    }

    const newCity = new cityModel({
      name,
      state: stateDoc._id,
      image,
    });
    await newCity.save();

    stateDoc.cities.push(newCity._id);
    await stateDoc.save();

    res
      .status(200)
      .json({ success: true, message: "City Added and linked to State" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const cityList = async (req, res) => {
  try {
    const cities = await cityModel.find({}).populate("state", "name");
    res.status(200).json({ success: true, cities });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const removeCity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCity = await cityModel.findByIdAndDelete(id);
    if (!deletedCity)
      return res.json({ success: false, message: "City not found" });

    await stateModel.findByIdAndDelete(id, {
      $pull: { cities: id },
    });

    res.json({ success: true, message: "City removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const collegeInCity = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await cityModel.findById(id).populate("colleges");
    if (!city) {
      return res.json({ success: false, message: "City not found" });
    }
    res.json({
      success: true,
      colleges: city.colleges,
      cityName: city.name,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const hostelInCity = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await cityModel.findById(id).populate("hostels");
    if (!city) {
      return res.json({ success: false, message: "City not found" });
    }
    res.json({
      success: true,
      hostels: city.hostels,
      cityName: city.name,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const pgInCity = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await cityModel.findById(id).populate("pgs");
    if (!city) {
      return res.json({ success: false, message: "City not found" });
    }
    res.json({
      success: true,
      pgs: city.pgs,
      cityName: city.name,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const messInCity = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await cityModel.findById(id).populate("mess");
    if (!city) {
      return res.json({ success: false, message: "City not found" });
    }
    res.json({
      success: true,
      mess: city.mess,
      cityName: city.name,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  addCity,
  cityList,
  removeCity,
  collegeInCity,
  hostelInCity,
  pgInCity,
  messInCity,
};
