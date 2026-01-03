import { useContext, useEffect, useState } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaUtensils,
  FaMapMarkerAlt,
  FaStar,
  FaChevronRight,
} from "react-icons/fa";
import axios from "axios";
import AppContext from "@/contexts/AppContext";

const MessNearCollege = () => {
  const { college } = useOutletContext();
  const { id } = useParams();
  const { backendUrl } = useContext(AppContext);

  const [mess, setMess] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLocalLoading(true);
        const response = await axios.get(`${backendUrl}/college/${id}/mess`);
        if (response.data.success) {
          setMess(response.data.mess || []);
        }
      } catch (error) {
        toast.error("Error loading mess data");
        console.log(error);
      } finally {
        setLocalLoading(false);
      }
    };

    if (id) loadData();
  }, [id, backendUrl]);

  return (
    <div className="py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Canteens & Mess near{" "}
          <span className="text-blue-600">{college?.name}</span>
        </h2>
        <p className="text-slate-500 text-sm font-medium">
          Affordable and hygienic daily meal services for students.
        </p>
      </div>

      {localLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="h-48 bg-slate-100 animate-pulse rounded-4xl"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mess.length > 0 ? (
            mess.map((item) => (
              <Link
                to={`/mess/${item._id}`}
                key={item._id}
                className="group flex flex-col sm:flex-row bg-white rounded-4xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                {/* Image Section */}
                <div className="sm:w-44 h-44 sm:h-full relative overflow-hidden shrink-0">
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
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {item.nonveg ? "Non-Veg Available" : "Pure Veg"}
                    </span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-500">
                        <FaStar size={12} />
                        <span className="text-xs font-black text-slate-900">
                          4.2
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs flex items-center gap-1 font-bold mt-1">
                      <FaMapMarkerAlt size={10} className="text-slate-300" />
                      {item.city?.name || "College Walk"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest leading-none">
                        Starting Plan
                      </p>
                      <p className="text-xl font-black text-blue-600">
                        ₹{item.price}
                        <span className="text-[10px] text-slate-400 font-bold ml-1">
                          /meal
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      View Menu <FaChevronRight size={10} />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <FaUtensils className="mx-auto text-slate-200 mb-3" size={32} />
              <p className="text-slate-500 font-bold">
                No Canteens or Mess linked to this college yet.
              </p>
              <p className="text-slate-400 text-xs mt-1 italic font-medium">
                Coming soon!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessNearCollege;
