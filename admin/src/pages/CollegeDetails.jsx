import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEarthAsia } from "react-icons/fa6";
import axios from "axios";
import AppContext from "@/contexts/AppContext";
import {
  FaDirections,
  FaEdit,
  FaPlus,
  FaTrash,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaInfoCircle,
} from "react-icons/fa";

const CollegeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState(null);
  const { token, backendUrl, loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        setLoading(true);
        const response = await axios(`${backendUrl}/college/${id}`);
        if (response.data.success) {
          setCollege(response.data.college);
        }
      } catch (error) {
        console.error("Error fetching college details:", error);
        toast.error("Could not load college profile");
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [id, backendUrl, setLoading]);

  const removeCollege = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to remove this college? This will not delete associated hostels/messes."
      )
    )
      return;
    try {
      const res = await axios.delete(`${backendUrl}/college/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success("College removed successfully");
        navigate("/college");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openInMaps = (lng, lat) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  if (!college)
    return (
      <div className="p-20 text-center font-bold text-slate-400">
        College profile not found.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-900 capitalize tracking-tight">
          {college.name}
        </h1>
        <div className="flex items-center gap-2 mt-2 text-blue-600 font-bold uppercase text-xs tracking-widest">
          <FaMapMarkerAlt />
          <span>{college.city?.name || college.city}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="relative group">
            <img
              className="w-full h-80 object-cover rounded-3xl shadow-2xl shadow-blue-100 ring-4 ring-white"
              src={
                college.image ||
                "https://via.placeholder.com/400x300?text=No+Image+Available"
              }
              alt={college.name}
              loading="lazy"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-800">
              Verified Campus
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() =>
                openInMaps(
                  college.locations.coordinates[0],
                  college.locations.coordinates[1]
                )
              }
              className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 text-sm"
            >
              <FaDirections /> Directions
            </button>
            <a
              href={
                college.url.startsWith("http")
                  ? college.url
                  : `https://${college.url}`
              }
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 text-sm"
            >
              <FaEarthAsia /> Website
            </a>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                <FaInfoCircle /> About Institution
              </label>
              <p className="text-slate-600 leading-relaxed text-lg">
                {college.about ||
                  "No description provided for this institution."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Contact Support
                </label>
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <FaPhoneAlt className="text-blue-500" /> {college.phone}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Campus Address
                </label>
                <p className="text-sm text-slate-600 font-medium">
                  {college.locations?.address}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest px-2">
              Register Local Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => navigate("/hostel/add")}
                className="flex flex-col items-center justify-center gap-2 p-6 bg-blue-50 text-blue-700 rounded-3xl border border-blue-100 hover:bg-blue-100 transition-all group"
              >
                <div className="bg-blue-600 text-white p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <FaPlus />
                </div>
                <span className="font-bold text-sm">Add Hostel</span>
              </button>
              <button
                onClick={() => navigate("/pg/add")}
                className="flex flex-col items-center justify-center gap-2 p-6 bg-indigo-50 text-indigo-700 rounded-3xl border border-indigo-100 hover:bg-indigo-100 transition-all group"
              >
                <div className="bg-indigo-600 text-white p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <FaPlus />
                </div>
                <span className="font-bold text-sm">Add Flat/Room</span>
              </button>
              <button
                onClick={() => navigate("/mess/add")}
                className="flex flex-col items-center justify-center gap-2 p-6 bg-emerald-50 text-emerald-700 rounded-3xl border border-emerald-100 hover:bg-emerald-100 transition-all group"
              >
                <div className="bg-emerald-600 text-white p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <FaPlus />
                </div>
                <span className="font-bold text-sm">Add Mess</span>
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
            <button
              onClick={() => toast.info("Edit feature coming soon")}
              className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
            >
              <FaEdit /> Edit Profile
            </button>
            <button
              onClick={() => removeCollege(college._id)}
              className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
            >
              <FaTrash /> Delete Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;
