import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import AppContext from "@/contexts/AppContext";
import ReCAPTCHA from "react-google-recaptcha";

const Contribute = ({ setContributing }) => {
  const [type, setType] = useState("College");
  const [active, setActive] = useState("College");
  const [captchaToken, setCaptchaToken] = useState("");
  const [imageFiles, setImageFiles] = useState(null);

  const { backendUrl, loading, setLoading } = useContext(AppContext);

  const items = ["College", "Hostel", "PG/Flat", "Canteen/Mess"];

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    about: "",
    url: "",
    lat: "",
    lng: "",
    address: "",
    college: "",
    price: "",
    gender: "male",
    nonveg: "false",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onFileChange = (e) => {
    setImageFiles(e.target.files);
  };

  const onCaptchaChange = (value) => {
    setCaptchaToken(value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!captchaToken) return toast.error("Please verify reCAPTCHA");
    if (!imageFiles) return toast.error("Please upload an image");

    const dataToSend = new FormData();

    dataToSend.append("name", formData.name);
    dataToSend.append("city", formData.city);
    dataToSend.append("phone", formData.phone);
    dataToSend.append("lat", formData.lat);
    dataToSend.append("lng", formData.lng);
    dataToSend.append("address", formData.address);
    dataToSend.append("recaptchaToken", captchaToken);

    if (type === "College") {
      dataToSend.append("url", formData.url);
      dataToSend.append("about", formData.about);
    } else {
      dataToSend.append("college", formData.college);
      dataToSend.append("price", formData.price);
      dataToSend.append("nonveg", formData.nonveg);
      if (type === "Hostel" || type === "PG/Flat") {
        dataToSend.append("gender", formData.gender);
      }
    }

    Array.from(imageFiles).forEach((file) => {
      dataToSend.append("image", file);
    });

    try {
      const routeMap = {
        College: "college",
        Hostel: "hostel",
        "PG/Flat": "pg",
        "Canteen/Mess": "mess",
      };

      const response = await axios.post(
        `${backendUrl}/contribute/${routeMap[type]}/add`,
        dataToSend,
        { headers: { "Content-Type": "multipart/form-data", timeout: 60000 } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setContributing(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/60 relative h-screen w-screen md:w-316">
      <div className="md:w-150 md:left-80 w-100 left-3 bg-white absolute md:top-0.5 top-5 rounded-2xl">
        <div className="flex justify-between items-center px-5 md:px-10">
          <p></p>
          <p className="text-2xl font-semibold text-center my-2">
            Contribute to us
          </p>
          <RxCross2
            className="text-2xl font-medium cursor-pointer"
            onClick={() => setContributing(false)}
          />
        </div>
        <ul className="flex md:gap-4 gap-2 justify-center items-center">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setType(`${item}`), setActive(`${item}`);
              }}
              className={`md:px-4 md:py-1 px-3 py-2 font-medium rounded-2xl cursor-pointer text-white font-meduim ${
                active === `${item}` ? "bg-blue-600" : "bg-blue-400"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
        <form
          onSubmit={onSubmitHandler}
          className="flex md:px-8 py-2 px-4 flex-col gap-2"
        >
          <input
            className="px-4 py-2 md:py-1 outline-none rounded-md shadow-md bg-gray-200"
            type="text"
            name="name"
            onChange={onChangeHandler}
            placeholder={`${type} Name`}
            required
          />

          <div className="flex items-center justify-between gap-2">
            <input
              onChange={onChangeHandler}
              className="w-full px-4 py-2 md:py-1 outline-none rounded-md shadow-md bg-gray-200"
              type="text"
              name="city"
              placeholder="City Name"
              required
            />
            {type === "College" && (
              <input
                className="w-50 md:w-75 px-4 py-2 md:py-1 outline-none rounded-md shadow-md bg-gray-200"
                type="text"
                onChange={onChangeHandler}
                name="url"
                placeholder="College Website URL"
              />
            )}
            {(type === "Hostel" || type === "PG/Flat") && (
              <select
                name="gender"
                onChange={onChangeHandler}
                className="bg-gray-200 rounded-md px-4 py-2 md:py-1 shadow-md outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <input
              className="flex-1 px-4 py-2 md:py-1 outline-none rounded-md shadow-md bg-gray-200"
              type="text"
              onChange={onChangeHandler}
              name="phone"
              placeholder="Phone Number"
            />
            {type !== "College" && (
              <select
                name="nonveg"
                onChange={onChangeHandler}
                className="bg-gray-200 rounded-md px-4 py-2 md:py-1 shadow-md outline-none"
              >
                <option value="false">Veg Only</option>
                <option value="true">Non-Veg</option>
              </select>
            )}
          </div>
          {type === "College" && (
            <textarea
              name="about"
              onChange={onChangeHandler}
              className="px-4 py-2 md:py-1 outline-none rounded-md shadow-md bg-gray-200 h-20"
              placeholder="Describe the college..."
            ></textarea>
          )}
          {type !== "College" && (
            <div className="flex gap-2">
              <input
                type="text"
                onChange={onChangeHandler}
                name="college"
                placeholder="Nearby College Name"
                className="flex-1 px-4 py-2 md:py-1 outline-none rounded-md shadow-md bg-gray-200"
              />
              <input
                type="number"
                onChange={onChangeHandler}
                name="price"
                placeholder="Price/Rent"
                className="w-32 px-4 py-2 md:py-1 outline-none rounded-md shadow-md bg-gray-200"
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <input
              className="px-4 py-2 md:py-1 outline-none w-full rounded-md shadow-md bg-gray-200"
              type="text"
              onChange={onChangeHandler}
              name="lat"
              placeholder="Lattitude"
            />
            <input
              className="px-4 py-2 md:py-1 outline-none w-full rounded-md shadow-md bg-gray-200"
              type="text"
              onChange={onChangeHandler}
              name="lng"
              placeholder="Longitude"
            />
          </div>

          <input
            className="px-4 py-2 md:py-1 outline-none rounded-md shadow-md bg-gray-200"
            type="text"
            onChange={onChangeHandler}
            name="address"
            placeholder="Full Address"
          />

          <div className="flex flex-col gap-1">
            {type === "College" ? (
              <label className="text-xs text-red-500 ml-1">
                Upload only one Image
              </label>
            ) : (
              <label className="text-xs text-red-500 ml-1">Upload Images</label>
            )}
            <input
              type="file"
              multiple
              onChange={onFileChange}
              className="text-sm"
            />
          </div>

          <div className="scale-90 origin-left">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={onCaptchaChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {loading ? "Contributing..." : "Submit Contribution"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contribute;
