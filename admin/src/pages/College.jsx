import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "@/contexts/AppContext";
import { FaEarthAsia } from "react-icons/fa6";
import {
  FaDirections,
  FaPhoneAlt,
  FaTrashAlt,
  FaPlus,
  FaGraduationCap,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const College = () => {
  const { token, loading, collegeList, setCollegeList, backendUrl } =
    useContext(AppContext);

  const removeCollege = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to remove this college? This action cannot be undone."
      )
    )
      return;
    try {
      const res = await axios.delete(`${backendUrl}/college/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success("College removed successfully");
        setCollegeList((prev) => prev.filter((college) => college._id !== id));
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
            <FaGraduationCap className="text-blue-600 shrink-0" /> College
            Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage institutional partners and campus locations.
          </p>
        </div>
        <NavLink
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-95"
          to="/college/add"
        >
          <FaPlus /> Add College
        </NavLink>
      </div>
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="hidden md:grid grid-cols-[0.5fr_3fr_1.5fr_2fr_1.5fr_1fr_0.8fr] bg-slate-50/50 border-b border-slate-100 px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <p>S.No</p>
          <p>College Name</p>
          <p>City</p>
          <p>Contact Details</p>
          <p>Portal</p>
          <p className="pl-5">Map</p>
          <p className="text-right">Action</p>
        </div>

        {loading ? (
          <div className="p-20 text-center flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-slate-400 font-medium">Fetching records...</p>
          </div>
        ) : collegeList.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {collegeList.map((college, index) => (
              <div
                key={college._id}
                className="flex flex-col md:grid md:grid-cols-[0.5fr_3fr_1.5fr_2fr_1.5fr_1fr_0.8fr] px-5 py-2 md:px-8 md:py-2 items-start md:items-center hover:bg-slate-50/30 transition-colors"
              >
                <p className="hidden md:block font-bold text-slate-300">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="w-full flex justify-between items-start md:block">
                  <div className="flex flex-col pt-2">
                    <NavLink
                      to={`/college/${college._id}`}
                      className="text-lg w-60 truncate font-bold text-slate-800 hover:text-blue-600 transition-colors leading-tight"
                    >
                      {college.name}
                    </NavLink>
                    <div className="flex items-center gap-1.5 mt-1 md:hidden">
                      <FaMapMarkerAlt className="text-slate-400" size={10} />
                      <p className="text-xs font-semibold text-slate-500 uppercase">
                        {college.city?.name || "Global"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeCollege(college._id)}
                    className="md:hidden pt-3 text-red-400"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
                <p className="hidden md:block text-slate-600 font-semibold capitalize">
                  {college.city?.name || "Global"}
                </p>
                <div className="flex items-center gap-3 text-slate-500 mt-2 md:mt-0">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                    <FaPhoneAlt size={12} />
                  </div>
                  <p className="text-sm font-medium">{college.phone}</p>
                </div>
                <div className="mt-2 md:mt-0 flex gap-10">
                  <a
                    href={
                      college.url.startsWith("http")
                        ? college.url
                        : `https://${college.url}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-blue-500 bg-blue-50 md:bg-transparent px-3 py-1.5 md:p-0 rounded-lg font-bold text-xs uppercase tracking-wide group"
                  >
                    <FaEarthAsia /> Website
                    <FaExternalLinkAlt
                      size={10}
                      className="hidden md:block opacity-0 group-hover:opacity-100"
                    />
                  </a>
                  <button
                    onClick={() =>
                      openInMaps(
                        college.locations.coordinates[0],
                        college.locations.coordinates[1]
                      )
                    }
                    className="w-full md:hidden flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2.5 rounded-xl hover:bg-emerald-600 hover:text-white transition-all font-bold text-xs"
                  >
                    <FaDirections size={16} /> <span>Directions</span>
                  </button>
                </div>
                <div className="hidden md:block">
                  <button
                    onClick={() =>
                      openInMaps(
                        college.locations.coordinates[0],
                        college.locations.coordinates[1]
                      )
                    }
                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2.5 rounded-xl hover:bg-emerald-600 hover:text-white transition-all font-bold text-xs"
                  >
                    <FaDirections size={16} /> <span>Directions</span>
                  </button>
                </div>
                <div className="hidden md:flex justify-end">
                  <button
                    onClick={() => removeCollege(college._id)}
                    className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-20 text-center text-slate-400">
            No institutional records found.
          </div>
        )}
      </div>
    </div>
  );
};

export default College;
