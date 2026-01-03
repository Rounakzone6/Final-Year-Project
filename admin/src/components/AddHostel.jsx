import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "@/contexts/AppContext";

const AddHostel = () => {
  const { loading, setLoading, backendUrl, token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    city: "",
    college: "",
    nonveg: "false",
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
      const res = await axios.post(`${backendUrl}/hostel/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({
          name: "",
          gender: "male",
          city: "",
          college: "",
          nonveg: "false",
          phone: "",
          price: "",
          lat: "",
          lng: "",
          address: "",
          img1: "",
          img2: "",
          img3: "",
        });
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
          <h2 className="text-3xl font-bold text-slate-900">Add New Hostel</h2>
          <p className="text-slate-500 mt-1">
            Provide details for student accommodation and facilities.
          </p>
        </div>

        <form className="space-y-6" onSubmit={onSubmitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Hostel Name
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                name="name"
                placeholder="Sunshine Residency"
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                name="city"
                placeholder="Mumbai"
                value={formData.city}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Near College
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                name="college"
                placeholder="IIT Bombay (Optional)"
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                name="phone"
                placeholder="+91 ..."
                value={formData.phone}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Monthly Price
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                name="price"
                placeholder="₹ 5000"
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-all"
                name="gender"
                value={formData.gender}
                onChange={onChangeHandler}
              >
                <option value="male">Boy's Hostel</option>
                <option value="female">Girl's Hostel</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Food Type
              </label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-all"
                name="nonveg"
                value={formData.nonveg}
                onChange={onChangeHandler}
              >
                <option value="false">Pure Veg</option>
                <option value="true">Veg & Non-Veg</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Latitude
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                name="lat"
                placeholder="19.076"
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                name="lng"
                placeholder="72.877"
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
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              name="address"
              placeholder="Flat No, Building, Street, Area..."
              value={formData.address}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Gallery Upload (URLs)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                className="bg-white px-3 py-2 border rounded-lg outline-none text-sm focus:border-blue-500"
                name="img1"
                placeholder="Main Image URL"
                value={formData.img1}
                onChange={onChangeHandler}
                required
              />
              <input
                className="bg-white px-3 py-2 border rounded-lg outline-none text-sm focus:border-blue-500"
                name="img2"
                placeholder="Image 2 (Optional)"
                value={formData.img2}
                onChange={onChangeHandler}
              />
              <input
                className="bg-white px-3 py-2 border rounded-lg outline-none text-sm focus:border-blue-500"
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
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200"
            }`}
            type="submit"
          >
            {loading ? "Adding Hostel..." : "Add Hostel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHostel;
