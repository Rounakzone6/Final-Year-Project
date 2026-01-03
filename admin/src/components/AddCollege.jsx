import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "@/contexts/AppContext";

const AddCollege = () => {
  const { loading, setLoading, backendUrl, token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    about: "",
    url: "",
    lat: "",
    lng: "",
    address: "",
    image: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/college/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message || "College added successfully");
        setFormData({
          name: "",
          city: "",
          phone: "",
          about: "",
          url: "",
          lat: "",
          lng: "",
          address: "",
          image: "",
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Add College
          </h2>
          <p className="text-gray-500 mt-1">
            Enter complete details to register a new institution.
          </p>
        </div>

        <form className="space-y-6" onSubmit={onSubmitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                College Name
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                type="text"
                name="name"
                value={formData.name}
                placeholder="e.g. IIT Bombay"
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                City
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                type="text"
                name="city"
                value={formData.city}
                placeholder="City Name"
                onChange={onChangeHandler}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Contact Number
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                type="text"
                name="phone"
                value={formData.phone}
                placeholder="+91 ..."
                onChange={onChangeHandler}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Official Website URL
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                type="text"
                name="url"
                value={formData.url}
                placeholder="https://..."
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              Description / About
            </label>
            <textarea
              rows="3"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
              name="about"
              value={formData.about}
              placeholder="Brief history or features..."
              onChange={onChangeHandler}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Latitude
              </label>
              <input
                className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none"
                type="text"
                name="lat"
                value={formData.lat}
                placeholder="19.0760"
                onChange={onChangeHandler}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Longitude
              </label>
              <input
                className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none"
                type="text"
                name="lng"
                value={formData.lng}
                placeholder="72.8777"
                onChange={onChangeHandler}
              />
            </div>
            <div className="col-span-2 md:col-span-1 space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Image URL
              </label>
              <input
                className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none"
                type="text"
                name="image"
                value={formData.image}
                placeholder="Cloudinary link"
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              Full Physical Address
            </label>
            <input
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
              type="text"
              name="address"
              value={formData.address}
              placeholder="Street, Landmark, Pincode"
              onChange={onChangeHandler}
            />
          </div>

          <button
            disabled={loading}
            className={`w-full py-4 px-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-[0.98] ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200"
            }`}
            type="submit"
          >
            {loading ? "Registering College..." : "Add College To Database"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCollege;
