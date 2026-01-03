import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "@/contexts/AppContext";
import {
  FaPlus,
  FaTrash,
  FaBuilding,
  FaBed,
  FaUtensils,
  FaMapMarkedAlt,
} from "react-icons/fa";

const City = () => {
  const { token, role, loading, backendUrl, cityList, setCities } =
    useContext(AppContext);

  const removeCity = async (id) => {
    if (role === "admin")
      return toast.error("Access Denied: Only Super Admins can remove cities");
    if (
      !window.confirm(
        "Delete this city? All associated data might be affected."
      )
    )
      return;

    try {
      const response = await axios.delete(`${backendUrl}/city/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setCities((prev) => prev.filter((city) => city._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <FaMapMarkedAlt className="text-blue-600 shrink-0" /> City
            Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {role === "admin"
              ? "View registered cities and add local infrastructure."
              : "Manage operational cities and platform locations."}
          </p>
        </div>
        {role !== "admin" && (
          <NavLink
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-95"
            to="/city/add"
          >
            <FaPlus /> Add New City
          </NavLink>
        )}
      </div>
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="hidden md:grid grid-cols-[0.5fr_0.8fr_1.5fr_1.5fr_3fr_0.8fr] bg-slate-50/50 px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <p>S.No</p>
          <p>Preview</p>
          <p>City Name</p>
          <p>State</p>
          <p className="pl-15">Quick Actions (Add)</p>
          <p className="text-right">Manage</p>
        </div>

        {loading ? (
          <div className="p-20 text-center text-slate-400 font-medium">
            Loading geographical data...
          </div>
        ) : cityList.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {cityList.map((city, index) => (
              <div
                key={city._id}
                className="flex flex-col md:grid md:grid-cols-[0.5fr_0.8fr_1.5fr_1.5fr_3fr_0.8fr] px-5 py-3 md:px-8 md:py-2 items-center hover:bg-slate-50/30 transition-colors"
              >
                <p className="hidden md:block font-bold text-slate-300">
                  #{index + 1}
                </p>
                <div className="flex w-full items-center gap-4 md:contents">
                  <img
                    className="w-16 h-16 md:w-10 md:h-10 rounded object-cover shadow-sm ring-2 ring-white"
                    src={city.image}
                    alt={city.name}
                  />

                  <div className="flex-1 md:contents">
                    <div className="md:block">
                      <p className="text-lg font-bold text-slate-800 capitalize leading-tight">
                        {city.name}
                      </p>
                      <p className="text-slate-500 text-sm font-medium capitalize md:hidden">
                        {city.state?.name || "N/A"}
                      </p>
                    </div>
                    <p className="hidden md:block text-slate-500 font-medium capitalize">
                      {city.state?.name || "N/A"}
                    </p>
                  </div>
                  <div className="md:hidden">
                    {role !== "admin" && (
                      <button
                        onClick={() => removeCity(city._id)}
                        className="p-3 text-red-400 bg-red-50 rounded-xl"
                      >
                        <FaTrash size={16} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="w-full mt-6 md:mt-0">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:hidden">
                    Add New Entry
                  </p>
                  <div className="flex overflow-x-auto pb-2 md:pb-0 md:flex-wrap gap-2 scrollbar-hide">
                    <NavLink
                      className="whitespace-nowrap flex items-center gap-2 bg-slate-50 text-slate-700 px-4 py-2 md:px-3 md:py-1.5 rounded-xl text-xs font-bold border border-slate-100 hover:bg-blue-600 hover:text-white transition-all"
                      to="/college/add"
                    >
                      <FaBuilding size={12} /> College
                    </NavLink>
                    <NavLink
                      className="whitespace-nowrap flex items-center gap-2 bg-slate-50 text-slate-700 px-4 py-2 md:px-3 md:py-1.5 rounded-xl text-xs font-bold border border-slate-100 hover:bg-blue-600 hover:text-white transition-all"
                      to="/hostel/add"
                    >
                      <FaBed size={12} /> Hostel
                    </NavLink>
                    <NavLink
                      className="whitespace-nowrap flex items-center gap-2 bg-slate-50 text-slate-700 px-4 py-2 md:px-3 md:py-1.5 rounded-xl text-xs font-bold border border-slate-100 hover:bg-blue-600 hover:text-white transition-all"
                      to="/mess/add"
                    >
                      <FaUtensils size={12} /> Mess
                    </NavLink>
                  </div>
                </div>
                <div className="hidden md:flex justify-end">
                  {role !== "admin" ? (
                    <button
                      onClick={() => removeCity(city._id)}
                      className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <FaTrash size={16} />
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                      View Only
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-20 text-center text-slate-400 italic">
            No operational cities found.
          </div>
        )}
      </div>
    </div>
  );
};

export default City;
