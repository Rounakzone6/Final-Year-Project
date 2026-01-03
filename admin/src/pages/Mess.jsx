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
  FaUtensils,
  FaMapMarkerAlt,
  FaUniversity,
} from "react-icons/fa";

const Mess = () => {
  const { token, loading, messList, setmessList, backendUrl } =
    useContext(AppContext);

  const removemess = async (id) => {
    if (!window.confirm("Are you sure you want to remove this mess service?"))
      return;
    try {
      const res = await axios.delete(`${backendUrl}/mess/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success("Mess service removed successfully");
        setmessList((prev) => prev.filter((mess) => mess._id !== id));
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
            <FaUtensils className="text-orange-500 shrink-0" /> Mess & Food
            Services
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage dining halls and tiffin providers near campuses.
          </p>
        </div>
        <NavLink
          className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-100 flex items-center justify-center gap-2 active:scale-95"
          to="/mess/add"
        >
          <FaPlus /> Add Mess
        </NavLink>
      </div>
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_2.5fr_1fr_1.5fr_1fr_1fr_0.5fr] bg-slate-50/50 border-b border-slate-100 px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <p>S.No</p>
          <p>Service Name</p>
          <p className="text-center">Associated College</p>
          <p>City</p>
          <p>Contact</p>
          <p>Monthly Plan</p>
          <p className="text-center">Map</p>
          <p className="text-right">Action</p>
        </div>

        {loading ? (
          <div className="p-20 text-center flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-slate-400 font-medium">
              Loading food services...
            </p>
          </div>
        ) : messList.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {messList.map((mess, index) => (
              <div
                key={mess._id}
                className="flex flex-col md:grid md:grid-cols-[0.5fr_2fr_2.5fr_1fr_1.5fr_1fr_1fr_0.5fr] px-5 py-2 md:px-8 md:py-2 items-start md:items-center hover:bg-orange-50/20 transition-colors group"
              >
                <p className="hidden md:block font-bold text-slate-300">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="w-full flex justify-between items-start md:block">
                  <div className="flex flex-col">
                    <NavLink
                      to={`/mess/${mess._id}`}
                      className="text-lg w-50 truncate font-bold text-slate-800 hover:text-blue-600 transition-colors leading-tight"
                    >
                      {mess.name}
                    </NavLink>
                    <div className="flex items-center gap-1.5 mt-1 md:hidden">
                      <FaMapMarkerAlt className="text-slate-400" size={10} />
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {mess.city?.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removemess(mess._id)}
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
                      Campus
                    </span>
                    {mess.college?.name || "Multiple Institutions"}
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-1 text-slate-400 font-bold text-[10px] uppercase tracking-tighter">
                  {mess.city?.name}
                </div>
                <div className="flex items-center gap-2 text-slate-600 mt-2 md:mt-0">
                  <div className="p-1.5 bg-orange-50 text-orange-600 rounded-lg shrink-0">
                    <FaPhoneAlt size={10} />
                  </div>
                  <p className="text-sm font-medium">{mess.phone}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="md:hidden text-[10px] font-black text-slate-300 uppercase block mb-1">
                    Pricing
                  </span>
                  <div className="flex items-center text-slate-900 font-black bg-slate-100 w-fit px-3 py-1.5 rounded-xl">
                    <FaRupeeSign size={11} />
                    <span>{mess.price}</span>
                  </div>
                </div>
                <div className="w-full md:w-auto mt-3 md:mt-0 flex justify-center">
                  <button
                    onClick={() =>
                      openInMaps(
                        mess.locations.coordinates[0],
                        mess.locations.coordinates[1]
                      )
                    }
                    className="w-full md:w-auto flex items-center justify-center gap-2 p-3 text-orange-500 bg-orange-50 md:bg-transparent md:text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                  >
                    <FaDirections size={20} />
                    <span className="md:hidden font-bold text-sm">
                      Directions
                    </span>
                  </button>
                </div>
                <div className="hidden md:flex justify-end">
                  <button
                    onClick={() => removemess(mess._id)}
                    className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-20 text-center">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
              <FaUtensils size={24} />
            </div>
            <p className="text-slate-400 font-medium italic">
              No mess services found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mess;
