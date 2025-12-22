import jwt from "jsonwebtoken";

const authSuper = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, login again",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (
      decoded.role !== "superadmin" ||
      decoded.email !== process.env.SUPER_ADMIN_EMAIL
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    req.superAdmin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authSuper;
