import cityModel from "../models/cityModel.js";
import collegeModel from "../models/collegeModel.js";

const collegeList = async (req, res) => {
  try {
    const colleges = await collegeModel.find({}).populate({
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
    const { name, city, image, contact, url, about, lat, lng, address } =
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
      contact,
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

const editCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, city, contact, url, about, lat, lng, address } = req.body;
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
      contact,
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
  addCollege,
  editCollege,
  removeCollege,
  collegeDetails,
  hostelNearCollege,
  pgNearCollege,
  messNearCollege,
};
