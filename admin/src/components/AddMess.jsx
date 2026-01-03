import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "@/contexts/AppContext";

const AddMess = () => {
  const { loading, setLoading, backendUrl, token } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    college: "",
    nonveg: "true",
    phone: "",
    price: "",
    lat: "",
    lng: "",
    address: "",
    img1: "",
    img2: "",
    img3: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/mess/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message || "Mess added successfully");
        setFormData({
          name: "",
          city: "",
          college: "",
          nonveg: "true",
          phone: "",
          price: "",
          lat: "",
          lng: "",
          address: "",
          img1: "",
          img2: "",
          img3: "",
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
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">
        <div className="mb-8 border-b pb-6">
          <h2 className="text-3xl font-bold text-slate-900">
            Add New Mess / Canteen
          </h2>
          <p className="text-slate-500 mt-1">
            Register a food service unit and its menu type.
          </p>
        </div>

        <form className="space-y-6" onSubmit={onSubmitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Mess Name
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                name="name"
                placeholder="Annapurna Mess"
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
                placeholder="Pune"
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
                placeholder="COEP (Optional)"
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
                Monthly/Daily Price
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                name="price"
                placeholder="₹ 3000"
                value={formData.price}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Dietary Option
              </label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none bg-white transition-all"
                name="nonveg"
                value={formData.nonveg}
                onChange={onChangeHandler}
              >
                <option value="true">Veg & Non-Veg Available</option>
                <option value="false">Pure Vegetarian Only</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-2xl">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Latitude
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-600 outline-none"
                name="lat"
                placeholder="18.5204"
                value={formData.lat}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Longitude
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-600 outline-none"
                name="lng"
                placeholder="73.8567"
                value={formData.lng}
                onChange={onChangeHandler}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">
              Full Physical Address
            </label>
            <textarea
              rows="2"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              name="address"
              placeholder="Building name, Street, Landmark..."
              value={formData.address}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Gallery (Cloudinary URLs)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm focus:border-blue-600 outline-none"
                name="img1"
                placeholder="Main Image URL"
                value={formData.img1}
                onChange={onChangeHandler}
                required
              />
              <input
                className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm focus:border-blue-600 outline-none"
                name="img2"
                placeholder="Image 2 (Optional)"
                value={formData.img2}
                onChange={onChangeHandler}
              />
              <input
                className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm focus:border-blue-600 outline-none"
                name="img3"
                placeholder="Image 3 (Optional)"
                value={formData.img3}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <button
            disabled={loading}
            className={`w-full py-4 px-4 rounded-2xl font-black text-lg text-white shadow-xl transition-all active:scale-[0.98] ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-100"
            }`}
            type="submit"
          >
            {loading ? "Registering Mess..." : "Add Mess Unit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMess;
