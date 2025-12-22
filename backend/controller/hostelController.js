import cityModel from "../models/cityModel.js";
import collegeModel from "../models/collegeModel.js";
import hostelModel from "../models/hostelModel.js";

const hostelList = async (req, res) => {
  try {
    const hostels = await hostelModel.find({}).populate("city college", "name");
    if (!hostels)
      return res.json({ success: false, message: "Hostels not found" });
    res.json({ success: true, hostels });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const hostelDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const hostel = await hostelModel
      .findById(id)
      .populate("city college", "name");
    if (!hostel)
      return res.json({ success: false, message: "Hostel not found" });
    res.json({ success: true, hostel });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const addHostel = async (req, res) => {
  try {
    const {
      name,
      gender,
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
    const newHostel = new hostelModel({
      name,
      gender,
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

    await newHostel.save();
    cityDoc.hostels.push(newHostel._id);
    if (collegeDoc) {
      collegeDoc.hostels.push(newHostel._id);
      await collegeDoc.save();
    }

    await cityDoc.save();

    res.json({ success: true, message: "Hostel added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const editHostel = async (req, res) => {
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

const removeHostel = async (req, res) => {
  try {
    const { id } = req.params;
    const hostel = await hostelModel.findById(id);
    if (!hostel) {
      return res.json({ success: false, message: "Hostel not found" });
    }
    const cityId = hostel.city;
    const collegeId = hostel.college;

    await hostelModel.findByIdAndDelete(id);
    await cityModel.findByIdAndUpdate(cityId, {
      $pull: { hostels: id },
    });
    await collegeModel.findByIdAndUpdate(collegeId, {
      $pull: { hostels: id },
    });

    res.json({
      success: true,
      message: "Hostel deleted",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export { hostelList, addHostel, removeHostel, editHostel, hostelDetails };