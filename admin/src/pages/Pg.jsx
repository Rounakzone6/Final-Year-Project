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
  FaHouseUser,
  FaUniversity,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Pg = () => {
  const { token, loading, pgList, setpgList, backendUrl } =
    useContext(AppContext);

  const removepg = async (id) => {
    if (
      !window.confirm("Are you sure you want to remove this PG/Flat listing?")
    )
      return;
    try {
      const res = await axios.delete(`${backendUrl}/pg/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success("PG/Flat removed successfully");
        setpgList((prev) => prev.filter((pg) => pg._id !== id));
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
          <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <FaHouseUser className="text-indigo-600 shrink-0" /> PGs & Flats
            Management
          </h1>
          <p className="text-slate-500 md:text-sm text-xs mt-1">
            Manage private paying guest accommodations and rental flats.
          </p>
        </div>
        <NavLink
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 active:scale-95"
          to="/pg/add"
        >
          <FaPlus /> Add New PG/Flat
        </NavLink>
      </div>
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_2.5fr_1fr_1.5fr_1.5fr_1fr_0.5fr] bg-slate-50/50 border-b border-slate-100 px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <p>S.No</p>
          <p>Property Name</p>
          <p>Nearby College</p>
          <p>City</p>
          <p>Contact</p>
          <p>Monthly Rent</p>
          <p className="pl-2">Map</p>
          <p className="text-right">Action</p>
        </div>

        {loading ? (
          <div className="p-20 text-center flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-slate-400 font-medium">Loading properties...</p>
          </div>
        ) : pgList.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {pgList.map((pg, index) => (
              <div
                key={pg._id}
                className="flex flex-col md:grid md:grid-cols-[0.5fr_2fr_2.5fr_1fr_1.5fr_1.5fr_1fr_0.5fr] px-5 py-4 md:px-8 md:py-2 items-start md:items-center hover:bg-indigo-50/10 transition-colors group"
              >
                <p className="hidden md:block font-bold text-slate-300">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="w-full flex justify-between items-start md:block">
                  <div className="flex flex-col min-w-0 flex-1">
                    <NavLink
                      to={`/pg/${pg._id}`}
                      className="text-lg font-bold text-slate-800 hover:text-indigo-600 transition-colors leading-tight line-clamp-1"
                    >
                      {pg.name}
                    </NavLink>
                    <div className="flex items-center gap-1.5 mt-1 md:hidden">
                      <FaMapMarkerAlt className="text-slate-400" size={10} />
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {pg.city?.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removepg(pg._id)}
                    className="md:hidden p-2 text-red-400"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-slate-500 mt-3 md:mt-0">
                  <FaUniversity
                    className="text-slate-300 hidden md:block"
                    size={12}
                  />
                  <p className="text-sm font-medium line-clamp-1">
                    <span className="md:hidden text-[10px] font-black text-slate-300 uppercase block mb-0.5">
                      Proximity
                    </span>
                    {pg.college?.name || "Independent Property"}
                  </p>
                </div>
                <p className="hidden md:block text-slate-400 font-bold text-[10px] uppercase tracking-tight">
                  {pg.city?.name}
                </p>
                <div className="flex items-center gap-2 text-slate-600 mt-4 md:mt-0">
                  <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                    <FaPhoneAlt size={10} />
                  </div>
                  <p className="text-sm font-medium">{pg.phone}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="md:hidden text-[10px] font-black text-slate-300 uppercase block mb-1">
                    Monthly Rent
                  </span>
                  <div className="flex items-center text-indigo-700 font-black bg-indigo-50 w-fit px-3 py-1.5 rounded-xl">
                    <FaRupeeSign size={11} />
                    <span>{pg.price}</span>
                  </div>
                </div>
                <div className="w-full md:w-auto mt-6 md:mt-0">
                  <button
                    onClick={() =>
                      openInMaps(
                        pg.locations.coordinates[0],
                        pg.locations.coordinates[1]
                      )
                    }
                    className="w-full md:w-auto flex justify-center items-center gap-2 p-3 md:p-3 text-indigo-500 bg-indigo-50 md:bg-transparent md:text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                  >
                    <FaDirections size={20} />
                    <span className="md:hidden font-bold text-sm">
                      View Location
                    </span>
                  </button>
                </div>
                <div className="hidden md:flex justify-end">
                  <button
                    onClick={() => removepg(pg._id)}
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
              <FaHouseUser size={24} />
            </div>
            <p className="text-slate-400 font-medium italic">
              No private properties found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pg;
