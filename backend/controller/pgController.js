import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import fs from "fs";
import cityModel from "../models/cityModel.js";
import collegeModel from "../models/collegeModel.js";
import pgModel from "../models/pgModel.js";

const pgList = async (req, res) => {
  try {
    const pgs = await pgModel
      .find({ isVerified: true })
      .populate("city college", "name");
    if (!pgs) return res.json({ success: false, message: "pgs not found" });
    res.json({ success: true, pgs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const adminPgList = async (req, res) => {
  try {
    const pgs = await pgModel.find({}).populate("city college", "name");
    if (!pgs) return res.json({ success: false, message: "pgs not found" });
    res.json({ success: true, pgs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const pgDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const pg = await pgModel.findById(id).populate("city college", "name");
    if (!pg) return res.json({ success: false, message: "pg not found" });
    res.json({ success: true, pg });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Contribution
const pgAdd = async (req, res) => {
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
        return result;
      }),
    );

    imageFiles.forEach((file) => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });

    const newpg = new pgModel({
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

    const savedPg = await newpg.save();
    cityDoc.pgs.push(newpg._id);
    await cityDoc.save();

    if (collegeDoc) {
      collegeDoc.pgs.push(newpg._id);
      await collegeDoc.save();
    }

    await contributeModel.findOneAndUpdate(
      {},
      { $push: { pgs: savedPg._id } },
      { upsert: true, new: true },
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

const addpg = async (req, res) => {
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
    } = req.body;

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
        return result;
      }),
    );

    const newpg = new pgModel({
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

    await newpg.save();
    cityDoc.pgs.push(newpg._id);
    await cityDoc.save();

    if (collegeDoc) {
      collegeDoc.pgs.push(newpg._id);
      await collegeDoc.save();
    }

    res.json({ success: true, message: "PG added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const editpg = async (req, res) => {
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

const removepg = async (req, res) => {
  try {
    const { id } = req.params;
    const pg = await pgModel.findById(id);
    if (!pg) {
      return res.json({ success: false, message: "pg not found" });
    }
    const cityId = pg.city;
    const collegeId = pg.college;

    await pgModel.findByIdAndDelete(id);
    await cityModel.findByIdAndUpdate(cityId, {
      $pull: { pgs: id },
    });
    await collegeModel.findByIdAndUpdate(collegeId, {
      $pull: { pgs: id },
    });

    res.json({
      success: true,
      message: "pg deleted",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const verifyPg = async (req, res) => {
  try {
    const { id } = req.params;
    const pg = await pgModel.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true },
    );
    res.json({ success: true, message: "Pg Verified" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const unverifyPg = async (req, res) => {
  try {
    const { id } = req.params;
    const pg = await pgModel.findByIdAndUpdate(
      id,
      { isVerified: false },
      { new: true },
    );
    res.json({ success: true, message: "Pg unverified" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  adminPgList,
  pgList,
  pgDetails,
  pgAdd,
  addpg,
  editpg,
  removepg,
  verifyPg,
  unverifyPg,
};
