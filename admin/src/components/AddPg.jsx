import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "@/contexts/AppContext";

const AddPg = () => {
  const { loading, setLoading, backendUrl, token } = useContext(AppContext);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    city: "",
    college: "",
    nonveg: "true",
    phone: "",
    price: "",
    lat: "",
    lng: "",
    address: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChange = (e) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (images.length > 0) {
        images.forEach((file) => {
          data.append("image", file);
        });
      } else {
        toast.error("Please upload at least one image");
        setLoading(false);
        return;
      }

      const res = await axios.post(`${backendUrl}/pg/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message || "PG Added Successfully");
        setFormData({
          name: "",
          gender: "male",
          city: "",
          college: "",
          nonveg: "true",
          phone: "",
          price: "",
          lat: "",
          lng: "",
          address: "",
        });
        setImages([]);
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
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">
        <div className="mb-8 border-b pb-6">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Add New PG / Flat
          </h2>
          <p className="text-slate-500 mt-1">
            Register paying guest accommodations and room rentals.
          </p>
        </div>

        <form className="space-y-6" onSubmit={onSubmitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                PG Name
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                name="name"
                placeholder="Executive PG"
                value={formData.name}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                City
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                name="city"
                placeholder="Bangalore"
                value={formData.city}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Nearby College
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                name="college"
                placeholder="REVA University"
                value={formData.college}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Phone
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                name="phone"
                placeholder="+91 ..."
                value={formData.phone}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Rent (Monthly)
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                name="price"
                placeholder="₹ 8500"
                value={formData.price}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Target Gender
              </label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none bg-white transition-all"
                name="gender"
                value={formData.gender}
                onChange={onChangeHandler}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex / Both</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Food Inclusion
              </label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none bg-white transition-all"
                name="nonveg"
                value={formData.nonveg}
                onChange={onChangeHandler}
              >
                <option value="true">Meals Included</option>
                <option value="false">No Meals / Self-Cook</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Latitude
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                name="lat"
                placeholder="12.9716"
                value={formData.lat}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Longitude
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                name="lng"
                placeholder="77.5946"
                value={formData.lng}
                onChange={onChangeHandler}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">
              Full Address
            </label>
            <textarea
              rows="2"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              name="address"
              placeholder="Sector, Street, Pincode..."
              value={formData.address}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-blue-800 uppercase tracking-widest">
                Property Photos
              </label>
              <span className="text-xs font-medium text-blue-600">
                {images.length} files selected
              </span>
            </div>
            <input
              type="file"
              multiple
              onChange={onImageChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all cursor-pointer"
              accept="image/*"
            />
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((img, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white border border-blue-200 text-[10px] text-blue-700 rounded-md shadow-sm"
                  >
                    {img.name.length > 20
                      ? img.name.substring(0, 20) + "..."
                      : img.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <button
            disabled={loading}
            className={`w-full py-4 px-4 rounded-2xl font-black text-lg text-white shadow-xl transition-all active:scale-[0.98] ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200"
            }`}
            type="submit"
          >
            {loading ? "Processing Upload..." : "Add PG Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPg;
