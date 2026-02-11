import { useContext, useEffect, useState } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUtensils, FaMapMarkerAlt, FaMars, FaVenus } from "react-icons/fa";
import axios from "axios";
import AppContext from "@/contexts/AppContext";

const HostelNearCollege = () => {
  const [hostels, setHostels] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [filterGender, setFilterGender] = useState("All");

  const { college } = useOutletContext();
  const { id } = useParams();
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLocalLoading(true);
        const response = await axios.get(`${backendUrl}/college/${id}/hostel`);
        if (response.data.success) {
          setHostels(response.data.hostel || []);
        }
      } catch (error) {
        toast.error("Error loading hostels");
        console.log(error);
      } finally {
        setLocalLoading(false);
      }
    };

    if (id) loadData();
  }, [id, backendUrl]);

  const filteredHostels = hostels.filter((h) => {
    const matchesFood =
      filter === "All" ||
      (filter === "Veg Only" && h.nonveg === false) ||
      (filter === "Non-Veg" && h.nonveg === true);

    const matchesGender =
      filterGender === "All" ||
      (filterGender === "Boy's" && h.gender === "male") ||
      (filterGender === "Girl's" && h.gender === "female");

    return matchesFood && matchesGender;
  });

  return (
    <div className="py-8">
      <div className="flex flex-col gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Hostels near <span className="text-blue-600">{college?.name}</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium">Showing verified student accommodations within walking distance.</p>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            {["All", "Boy's", "Girl's"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterGender(type)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                  filterGender === type
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            {["All", "Veg Only", "Non-Veg"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                  filter === type
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {localLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((n) => (
            <div key={n} className="h-64 bg-slate-100 animate-pulse rounded-4xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredHostels.length > 0 ? (
            filteredHostels.map((item) => (
              <Link
                to={`/hostel/${item._id}`}
                key={item._id}
                className="group flex flex-col sm:flex-row bg-white rounded-4xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                <div className="sm:w-48 h-48 sm:h-full relative overflow-hidden shrink-0">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={item.image?.[0] || "https://via.placeholder.com/400"}
                    alt={item.name}
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-sm backdrop-blur-md ${
                      item.nonveg ? "bg-orange-500/90 text-white" : "bg-green-500/90 text-white"
                    }`}>
                      {item.nonveg ? "Non-Veg" : "Veg Only"}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                       <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 text-slate-900 text-xs font-black">
                         {item.gender === "male" ? <FaMars className="text-blue-500" /> : <FaVenus className="text-pink-500" />}
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs flex items-center gap-1 font-bold">
                      <FaMapMarkerAlt size={10} className="text-slate-300" />
                      {item.city?.name || "Campus Perimeter"}
                    </p>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest leading-none">Monthly</p>
                      <p className="text-xl font-black text-blue-600">₹{item.price}</p>
                    </div>
                    <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">
                      View Space
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <FaUtensils className="mx-auto text-slate-200 mb-3" size={32} />
              <p className="text-slate-500 font-bold">No hostels matching these filters near this college.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HostelNearCollege;