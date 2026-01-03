import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { FaCloudUploadAlt, FaMapMarkedAlt, FaHashtag } from "react-icons/fa";
import axios from "axios";
import AppContext from "@/contexts/AppContext";
import ReCAPTCHA from "react-google-recaptcha";

const Contribute = ({ setContributing }) => {
  const [type, setType] = useState("College");
  const [active, setActive] = useState("College");
  const [captchaToken, setCaptchaToken] = useState("");
  const [imageFiles, setImageFiles] = useState(null);
  const [previews, setPreviews] = useState([]);

  const recaptchaRef = useRef(null);
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
    const files = Array.from(e.target.files);
    setImageFiles(e.target.files);

    // Create local URLs for previewing images before upload
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const onCaptchaChange = (value) => {
    setCaptchaToken(value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!captchaToken) {
      setLoading(false);
      return toast.error("Please verify reCAPTCHA");
    }
    if (!imageFiles) {
      setLoading(false);
      return toast.error("Please upload an image");
    }

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
      recaptchaRef.current.reset();
      setCaptchaToken("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => setContributing(false)}
      ></div>

      {/* Main Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-8 py-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Contribute
            </h2>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
              Help fellow students find a home
            </p>
          </div>
          <button
            onClick={() => setContributing(false)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
          >
            <RxCross2 size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {/* Category Tabs */}
          <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-8">
            {items.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setType(item);
                  setActive(item);
                }}
                className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-tight rounded-xl transition-all ${
                  active === item
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-6">
            {/* Basic Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                  Entity Name
                </label>
                <input
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium placeholder:text-slate-400"
                  type="text"
                  name="name"
                  onChange={onChangeHandler}
                  placeholder={`${type} Name`}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                  City
                </label>
                <input
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium placeholder:text-slate-400"
                  type="text"
                  name="city"
                  onChange={onChangeHandler}
                  placeholder="e.g. Lucknow"
                  required
                />
              </div>

              {type === "College" ? (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                    Official Website
                  </label>
                  <input
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium placeholder:text-slate-400"
                    type="text"
                    onChange={onChangeHandler}
                    name="url"
                    placeholder="https://..."
                  />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                    Gender Specification
                  </label>
                  <select
                    name="gender"
                    onChange={onChangeHandler}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium appearance-none"
                  >
                    <option value="male">Boys / Male</option>
                    <option value="female">Girls / Female</option>
                  </select>
                </div>
              )}
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                  Phone Number
                </label>
                <input
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium placeholder:text-slate-400"
                  type="text"
                  onChange={onChangeHandler}
                  name="phone"
                  placeholder="Contact Details"
                />
              </div>

              {type !== "College" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                    Dietary Category
                  </label>
                  <select
                    name="nonveg"
                    onChange={onChangeHandler}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium appearance-none"
                  >
                    <option value="false">Vegetarian Only</option>
                    <option value="true">Non-Vegetarian Available</option>
                  </select>
                </div>
              )}
            </div>

            {type === "College" ? (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                  About the Institution
                </label>
                <textarea
                  name="about"
                  onChange={onChangeHandler}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium h-28 resize-none"
                  placeholder="Briefly describe the campus culture and facilities..."
                ></textarea>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                    Nearby College/Landmark
                  </label>
                  <input
                    type="text"
                    onChange={onChangeHandler}
                    name="college"
                    placeholder="Closest University"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                    Pricing (₹)
                  </label>
                  <input
                    type="number"
                    onChange={onChangeHandler}
                    name="price"
                    placeholder="Monthly"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                  />
                </div>
              </div>
            )}

            {/* Location Metadata Group */}
            <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-3xl space-y-4">
              <p className="text-[10px] font-black text-blue-600 uppercase flex items-center gap-2">
                <FaMapMarkedAlt /> Location Metadata
              </p>
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="w-full px-4 py-2.5 bg-white border border-blue-100 rounded-xl outline-none text-sm font-medium focus:border-blue-400"
                  type="text"
                  onChange={onChangeHandler}
                  name="lat"
                  placeholder="Latitude"
                />
                <input
                  className="w-full px-4 py-2.5 bg-white border border-blue-100 rounded-xl outline-none text-sm font-medium focus:border-blue-400"
                  type="text"
                  onChange={onChangeHandler}
                  name="lng"
                  placeholder="Longitude"
                />
              </div>
              <input
                className="w-full px-4 py-2.5 bg-white border border-blue-100 rounded-xl outline-none text-sm font-medium focus:border-blue-400"
                type="text"
                onChange={onChangeHandler}
                name="address"
                placeholder="Full Street Address"
              />
            </div>

            {/* Image Upload Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-end px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">
                  Gallery Upload
                </label>
                <span className="text-[10px] font-bold text-red-400">
                  {type === "College"
                    ? "Single Image Only"
                    : "Multiple Images Allowed"}
                </span>
              </div>

              <div className="relative border-2 border-dashed border-slate-200 rounded-3xl p-8 hover:bg-slate-50 hover:border-blue-400 transition-all group cursor-pointer">
                <input
                  type="file"
                  multiple={type !== "College"}
                  onChange={onFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaCloudUploadAlt size={24} />
                  </div>
                  <p className="text-sm font-bold text-slate-600">
                    Drop images here or click to browse
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Supported formats: JPG, PNG (Max 5MB per file)
                  </p>
                </div>
              </div>

              {/* Preview Grid */}
              {previews.length > 0 && (
                <div className="flex gap-2 overflow-x-auto py-2 px-1">
                  {previews.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      className="h-16 w-16 object-cover rounded-xl border border-slate-200 shadow-sm"
                      alt="preview"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Recaptcha & Submit */}
            <div className="flex flex-col items-center gap-6 py-4">
              <div className="scale-90 md:scale-100 origin-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={onCaptchaChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-all active:scale-[0.98] ${
                  loading
                    ? "bg-slate-100 text-slate-400"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
                }`}
              >
                {loading ? "Processing..." : "Submit Contribution"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
