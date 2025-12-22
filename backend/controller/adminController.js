import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import adminModel from "../models/adminModel.js";
import generateToken from "../utils/generateToken.js";

const superAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.SUPER_ADMIN_EMAIL ||
      password !== process.env.SUPER_ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { role: "superadmin", email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, role: "superadmin", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.json({ success: false, message: "Admin does not exist" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(admin._id);
    res.json({ success: true, role: "admin", token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const adminExists = await adminModel.findOne({ email });
    if (adminExists) {
      return res
        .status(409)
        .json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await adminModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ success: true, message: "Registered Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const adminList = async (req, res) => {
  try {
    const adminList = await adminModel.find();
    res.json({ success: true, adminList });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const removeAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await adminModel.findByIdAndDelete(id);
    if (!deletedAdmin)
      return res.json({ success: false, message: "Admin not found" });
    res.json({ success: true, message: "Admin removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { adminLogin, adminRegister, superAdminLogin, adminList, removeAdmin };
