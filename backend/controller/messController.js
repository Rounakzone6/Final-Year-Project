import fs from "fs";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import cityModel from "../models/cityModel.js";
import collegeModel from "../models/collegeModel.js";
import messModel from "../models/messModel.js";

const messList = async (req, res) => {
  try {
    const mess = await messModel
      .find({ isVerified: true })
      .populate("city college", "name");
    if (!mess) return res.json({ success: false, message: "messs not found" });
    res.json({ success: true, mess });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const messDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const mess = await messModel.findById(id).populate("city college", "name");
    if (!mess) return res.json({ success: false, message: "mess not found" });
    res.json({ success: true, mess });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Contribution
const messAdd = async (req, res) => {
  try {
    const {
      name,
      gender,
      city,
      college,
      nonveg,
      phone,
      price,
      lat,
      lng,
      address,
      recaptchaToken,
    } = req.body;

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    const recaptchaRes = await axios.post(verifyUrl);

    if (!recaptchaRes.data.success) {
      return res.json({
        success: false,
        message: "reCAPTCHA verification failed.",
      });
    }

    const imageFiles = req.files;
    if (!imageFiles || imageFiles.length === 0) {
      return res.json({
        success: false,
        message: "Please upload at least one image",
      });
    }

    const cityDoc = await cityModel.findOne({
      name: { $regex: new RegExp(`^${city}$`, "i") },
    });
    if (!cityDoc)
      return res.json({ success: false, message: "City not found" });

    const collegeDoc = await collegeModel.findOne({
      name: { $regex: new RegExp(`^${college}$`, "i") },
    });

    const imageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    imageFiles.forEach((file) => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });

    const newMess = new messModel({
      name,
      gender,
      city: cityDoc._id,
      college: collegeDoc ? collegeDoc._id : null,
      image: imageUrls,
      nonveg,
      phone,
      price,
      locations: {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)],
        address: address,
      },
    });

    const savedMess = await newMess.save();
    cityDoc.mess.push(newMess._id);
    await cityDoc.save();

    if (collegeDoc) {
      collegeDoc.mess.push(newMess._id);
      await collegeDoc.save();
    }

    await contributeModel.findOneAndUpdate(
      {},
      { $push: { messes: savedMess._id } },
      { upsert: true, new: true }
    );
    res.json({
      success: true,
      message:
        "Your contribution has been received and is under review.\nThank you!",
    });
  } catch (error) {
    if (req.files) {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      });
    }
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const addMess = async (req, res) => {
  try {
    const {
      name,
      city,
      college,
      img1,
      img2,
      img3,
      nonveg,
      phone,
      price,
      lat,
      lng,
      address,
    } = req.body;

    const cityDoc = await cityModel.findOne({
      name: { $regex: new RegExp(`^${city}$`, "i") },
    });
    if (!cityDoc)
      return res.json({ success: false, message: "City not found" });

    const collegeDoc = await collegeModel.findOne({
      name: { $regex: new RegExp(`^${college}$`, "i") },
    });

    const images = [img1, img2, img3].filter(Boolean);
    const newMess = new messModel({
      name,
      city: cityDoc._id,
      college: collegeDoc ? collegeDoc._id : null,
      image: images,
      nonveg: nonveg === "true" || nonveg === true,
      phone,
      price: Number(price),
      locations: {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)],
        address: address,
      },
    });

    await newMess.save();
    cityDoc.mess.push(newMess._id);
    if (collegeDoc) {
      collegeDoc.mess.push(newMess._id);
      await collegeDoc.save();
    }
    await cityDoc.save();

    res.json({ success: true, message: "Mess added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const editMess = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    // const { name, city, contact, url, about, lat, lng, address } = req.body;
    // const imageFile = req.file;

    // const existingCollege = await collegeModel.findById(id);
    // if (!existingCollege) {
    //   return res.json({ success: false, message: "College not found" });
    // }
    // const cityDoc = await cityModel.findOne({
    //   name: { $regex: new RegExp(`^${city}$`, "i") },
    // });

    // if (!cityDoc) {
    //   return res.json({ success: false, message: "City not found" });
    // }
    // const updateData = {
    //   name,
    //   city: cityDoc._id,
    //   contact,
    //   url,
    //   about,
    //   location: {
    //     type: "Point",
    //     coordinates: [parseFloat(lng), parseFloat(lat)],
    //     address: address,
    //   },
    // };
    // if (imageFile) {
    //   updateData.image = imageFile.path;
    // }
    // const updatedCollege = await collegeModel.findByIdAndUpdate(
    //   id,
    //   updateData,
    //   { new: true }
    // );
    // if (existingCollege.city.toString() !== cityDoc._id.toString()) {
    //   await cityModel.findByIdAndUpdate(existingCollege.city, {
    //     $pull: { colleges: id },
    //   });
    //   await cityModel.findByIdAndUpdate(cityDoc._id, {
    //     $addToSet: { colleges: id },
    //   });
    // }
    // res.json({
    //   success: true,
    //   message: "College updated successfully",
    //   data: updatedCollege,
    // });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const removeMess = async (req, res) => {
  try {
    const { id } = req.params;
    const mess = await messModel.findById(id);
    if (!mess) {
      return res.json({ success: false, message: "mess not found" });
    }
    const cityId = mess.city;
    const collegeId = mess.college;

    await messModel.findByIdAndDelete(id);
    await cityModel.findByIdAndUpdate(cityId, {
      $pull: { messs: id },
    });
    await collegeModel.findByIdAndUpdate(collegeId, {
      $pull: { messs: id },
    });

    res.json({
      success: true,
      message: "mess deleted",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { messList, addMess, removeMess, editMess, messDetails, messAdd };
