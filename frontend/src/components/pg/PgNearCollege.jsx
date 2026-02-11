import { useContext, useEffect, useState } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaMapMarkerAlt,
  FaMars,
  FaVenus,
  FaHome,
  FaChevronRight,
} from "react-icons/fa";
import axios from "axios";
import AppContext from "@/contexts/AppContext";

const PgNearCollege = () => {
  const [pgs, setPgs] = useState([]);
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
        const response = await axios.get(`${backendUrl}/college/${id}/pg`);
        if (response.data.success) {
          setPgs(response.data.pgs || []);
        }
      } catch (error) {
        toast.error("Error loading PG data");
        console.log(error);
      } finally {
        setLocalLoading(false);
      }
    };

    if (id) loadData();
  }, [id, backendUrl]);

  const filteredPgs = pgs.filter((h) => {
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
            PGs & Flats near{" "}
            <span className="text-blue-600">{college?.name}</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Independent and shared living spaces for students.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-start md:justify-start">
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-sm">
            {["All", "Boy's", "Girl's"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterGender(type)}
                className={`px-4 py-2 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${
                  filterGender === type
                    ? "bg-white shadow text-blue-600 scale-100"
                    : "text-slate-500 hover:text-slate-800 scale-95"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-sm">
            {["All", "Veg Only", "Non-Veg"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${
                  filter === type
                    ? "bg-white shadow text-blue-600 scale-100"
                    : "text-slate-500 hover:text-slate-800 scale-95"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {localLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="h-44 bg-slate-100 animate-pulse rounded-4xl"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPgs.length > 0 ? (
            filteredPgs.map((item) => (
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
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-sm backdrop-blur-md ${
                        item.nonveg
                          ? "bg-orange-500/90 text-white"
                          : "bg-green-600/90 text-white"
                      }`}
                    >
                      {item.nonveg ? "Non-Veg" : "Veg Only"}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      <div className="flex gap-1">
                        {item.gender === "male" ? (
                          <FaMars className="text-blue-500" size={14} />
                        ) : (
                          <FaVenus className="text-pink-500" size={14} />
                        )}
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs flex items-center gap-1 font-bold">
                      <FaMapMarkerAlt size={10} className="text-slate-300" />
                      {item.city?.name || "Walking Distance"}
                    </p>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest leading-none">
                        Starting from
                      </p>
                      <p className="text-xl font-black text-blue-600">
                        ₹{item.price}
                        <span className="text-[10px] text-slate-400 font-bold tracking-normal italic ml-1">
                          /mo
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-wider group-hover:gap-3 transition-all">
                      Details <FaChevronRight size={10} />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <FaHome className="mx-auto text-slate-200 mb-4" size={40} />
              <p className="text-slate-500 font-black text-lg">
                No PGs found matching these filters.
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Try adjusting your gender or food preferences.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PgNearCollege;
