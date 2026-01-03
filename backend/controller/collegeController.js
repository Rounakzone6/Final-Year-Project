import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import fs from "fs";
import cityModel from "../models/cityModel.js";
import collegeModel from "../models/collegeModel.js";
import contributeModel from "../models/contributeModel.js";

const collegeList = async (req, res) => {
  try {
    const colleges = await collegeModel.find({ isVerified: true }).populate({
      path: "city",
      select: "name state",
      populate: {
        path: "state",
        select: "name",
      },
    });
    if (!colleges)
      return res.json({ success: false, message: "Colleges not found" });
    res.json({ success: true, colleges });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const collegeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const college = await collegeModel.findById(id).populate({
      path: "city",
      select: "name state",
      populate: {
        path: "state",
        select: "name",
      },
    });
    if (!college)
      return res.json({ success: false, message: "College not found" });
    res.json({ success: true, college });
  } catch (error) {}
};

const addCollege = async (req, res) => {
  try {
    const { name, city, image, phone, url, about, lat, lng, address } =
      req.body;
    const cityDoc = await cityModel.findOne({
      name: { $regex: new RegExp(`^${city}$`, "i") },
    });
    if (!cityDoc) {
      return res.json({
        success: false,
        message: `City '${city}' not found. Please create the city first.`,
      });
    }
    const cityId = cityDoc._id;
    const newCollege = new collegeModel({
      name,
      city: cityId,
      phone,
      url,
      about,
      image,
      locations: {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)],
        address: address,
      },
    });
    await newCollege.save();
    cityDoc.colleges.push(newCollege._id);
    await cityDoc.save();
    res.json({
      success: true,
      message: "College added successfully to " + cityDoc.name,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Contribution
const collegeAdd = async (req, res) => {
  try {
    const { name, city, phone, url, about, lat, lng, address, recaptchaToken } =
      req.body;

    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";

    const params = new URLSearchParams();
    params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
    params.append("response", recaptchaToken);

    const recaptchaRes = await axios.post(verifyUrl, params);

    if (!recaptchaRes.data.success) {
      console.error("reCAPTCHA Error Codes:", recaptchaRes.data["error-codes"]);

      return res.json({
        success: false,
        message: "reCAPTCHA verification failed. Please try again.",
      });
    }

    const image = req.file;
    if (!image) {
      return res.json({
        success: false,
        message: "Please upload only one image",
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
      timeout: 60000,
    });
    fs.unlinkSync(image.path);

    const cityDoc = await cityModel.findOne({
      name: { $regex: new RegExp(`^${city}$`, "i") },
    });

    if (!cityDoc) {
      return res.json({ success: false, message: `City '${city}' not found.` });
    }

    const newCollege = new collegeModel({
      name,
      city: cityDoc._id,
      phone,
      url,
      about,
      image: uploadResponse.secure_url,
      locations: {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)],
        address: address,
      },
      isVerified: false,
    });

    const savedCollege = await newCollege.save();

    cityDoc.colleges.push(savedCollege._id);
    await cityDoc.save();

    await contributeModel.findOneAndUpdate(
      {},
      { $push: { colleges: savedCollege._id } },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message:
        "Your contribution has been received and is under review.\nThank you!",
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const editCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, city, phone, url, about, lat, lng, address } = req.body;
    const imageFile = req.file;

    const existingCollege = await collegeModel.findById(id);
    if (!existingCollege) {
      return res.json({ success: false, message: "College not found" });
    }
    const cityDoc = await cityModel.findOne({
      name: { $regex: new RegExp(`^${city}$`, "i") },
    });

    if (!cityDoc) {
      return res.json({ success: false, message: "City not found" });
    }
    const updateData = {
      name,
      city: cityDoc._id,
      phone,
      url,
      about,
      location: {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)],
        address: address,
      },
    };
    if (imageFile) {
      updateData.image = imageFile.path;
    }
    const updatedCollege = await collegeModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (existingCollege.city.toString() !== cityDoc._id.toString()) {
      await cityModel.findByIdAndUpdate(existingCollege.city, {
        $pull: { colleges: id },
      });
      await cityModel.findByIdAndUpdate(cityDoc._id, {
        $addToSet: { colleges: id },
      });
    }
    res.json({
      success: true,
      message: "College updated successfully",
      data: updatedCollege,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const removeCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const college = await collegeModel.findById(id);
    if (!college) {
      return res.json({ success: false, message: "College not found" });
    }
    const cityId = college.city;
    await collegeModel.findByIdAndDelete(id);
    await cityModel.findByIdAndUpdate(cityId, {
      $pull: { colleges: id },
    });

    res.json({
      success: true,
      message: "College deleted and city records updated",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const hostelNearCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const collegeData = await collegeModel.findById(id).populate("hostels");
    if (!collegeData)
      return res.json({ success: false, message: "College not found" });

    res.json({ success: true, hostel: collegeData.hostels });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const pgNearCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const collegeData = await collegeModel.findById(id).populate("pgs");
    if (!collegeData)
      return res.json({ success: false, message: "College not found" });

    res.json({ success: true, pg: collegeData.pgs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const messNearCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const collegeData = await collegeModel.findById(id).populate("mess");
    if (!collegeData)
      return res.json({ success: false, message: "College not found" });

    res.json({ success: true, mess: collegeData.mess });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  collegeList,
  collegeDetails,
  collegeAdd,
  addCollege,
  editCollege,
  removeCollege,
  hostelNearCollege,
  pgNearCollege,
  messNearCollege,
};
