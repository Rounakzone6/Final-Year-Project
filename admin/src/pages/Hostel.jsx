import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "@/contexts/AppContext";
import {
  FaDirections,
  FaRupeeSign,
  FaPhoneAlt,
  FaTrashAlt,
  FaPlus,
  FaHotel,
  FaUniversity,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Hostel = () => {
  const { token, loading, hostelList, setHostelList, backendUrl } =
    useContext(AppContext);

  const removeHostel = async (id) => {
    if (!window.confirm("Are you sure you want to remove this hostel listing?"))
      return;
    try {
      const res = await axios.delete(`${backendUrl}/hostel/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success("Hostel removed successfully");
        setHostelList((prev) => prev.filter((hostel) => hostel._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const openInMaps = (lng, lat) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <FaHotel className="text-blue-600 shrink-0" /> Hostel Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Monitor student accommodations and rental pricing.
          </p>
        </div>
        <NavLink
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-95"
          to="/hostel/add"
        >
          <FaPlus /> Add New Hostel
        </NavLink>
      </div>
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_2.5fr_1fr_1.5fr_1.5fr_1fr_0.5fr] bg-slate-50/50 border-b border-slate-100 px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <p>S.No</p>
          <p>Accommodation</p>
          <p>Institution</p>
          <p>City</p>
          <p>Contact</p>
          <p>Monthly Rent</p>
          <p className="pl-3">Map</p>
          <p className="text-right">Action</p>
        </div>

        {loading ? (
          <div className="p-20 text-center flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-slate-400 font-medium">
              Loading accommodations...
            </p>
          </div>
        ) : hostelList.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {hostelList.map((hostel, index) => (
              <div
                key={hostel._id}
                className="flex flex-col md:grid md:grid-cols-[0.5fr_2fr_2.5fr_1fr_1.5fr_1.5fr_1fr_0.5fr] px-5 py-3 md:px-8 md:py-2 items-start md:items-center hover:bg-slate-50/30 transition-colors"
              >
                <p className="hidden md:block font-bold text-slate-300">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="w-full flex justify-between items-start md:block">
                  <div className="flex flex-col">
                    <NavLink
                      to={`/hostel/${hostel._id}`}
                      className="text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors leading-tight"
                    >
                      {hostel.name}
                    </NavLink>
                    <div className="flex items-center gap-1.5 mt-1 md:hidden">
                      <FaMapMarkerAlt className="text-slate-400" size={10} />
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {hostel.city?.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeHostel(hostel._id)}
                    className="md:hidden p-2 text-red-400"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-slate-500 mt-3 md:mt-0">
                  <FaUniversity
                    className="text-slate-300 hidden md:block"
                    size={14}
                  />
                  <p className="text-sm font-medium line-clamp-1">
                    <span className="md:hidden text-[10px] font-black text-slate-300 uppercase block mb-0.5">
                      Institution
                    </span>
                    {hostel.college?.name || "Independent"}
                  </p>
                </div>
                <p className="hidden md:block text-slate-400 font-bold text-xs uppercase tracking-tight">
                  {hostel.city?.name}
                </p>
                <div className="flex items-center gap-2 text-slate-600 mt-4 md:mt-0">
                  <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                    <FaPhoneAlt size={10} />
                  </div>
                  <p className="text-sm font-medium">{hostel.phone}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="md:hidden text-[10px] font-black text-slate-300 uppercase block mb-1">
                    Pricing
                  </span>
                  <div className="flex items-center text-emerald-600 font-black bg-emerald-50 w-fit px-3 py-1.5 rounded-xl">
                    <FaRupeeSign size={12} />
                    <span>{hostel.price}</span>
                    <span className="text-[10px] ml-1 text-emerald-400 font-medium">
                      /mo
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-auto mt-6 md:mt-0">
                  <button
                    onClick={() =>
                      openInMaps(
                        hostel.locations.coordinates[0],
                        hostel.locations.coordinates[1]
                      )
                    }
                    className="w-full md:w-auto flex justify-center items-center gap-2 p-3 md:p-3 text-blue-500 bg-blue-50 md:bg-transparent md:text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                  >
                    <FaDirections size={20} />
                    <span className="md:hidden font-bold text-sm">
                      View Location
                    </span>
                  </button>
                </div>
                <div className="hidden md:flex justify-end">
                  <button
                    onClick={() => removeHostel(hostel._id)}
                    className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-20 text-center text-slate-400 italic">
            No hostel records currently available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Hostel;
