import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRoute from "./router/adminRoute.js";
import cityRoute from "./router/cityRoute.js";
import collegeRoute from "./router/collegeRoute.js";
import ownerRoute from "./router/ownerRoute.js";
import reviewRoute from "./router/reviewRoute.js";
import hostelRoute from "./router/hostelRoute.js";
import stateRoute from "./router/stateRoute.js";
import pgRoute from "./router/pgRoute.js";
import messRoute from "./router/messRoute.js";
import contributeRoute from "./router/contributeRoute.js";

const app = express();
const port = process.env.PORT | 4000;
connectDb();
connectCloudinary();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/admin", adminRoute);
app.use("/state", stateRoute);
app.use("/city", cityRoute);
app.use("/college", collegeRoute);
app.use("/owner", ownerRoute);
app.use("/review", reviewRoute);
app.use("/hostel", hostelRoute);
app.use("/pg", pgRoute);
app.use("/mess", messRoute);
app.use("/contribute", contributeRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
