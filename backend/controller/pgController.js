import { v2 as cloudinary } from "cloudinary";
import cityModel from "../models/cityModel.js";
import collegeModel from "../models/collegeModel.js";
import pgModel from "../models/pgModel.js";

const pgList = async (req, res) => {
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

    const imageFiles = req.files.image;
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

export { pgList, addpg, removepg, editpg, pgDetails };