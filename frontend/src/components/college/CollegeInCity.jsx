import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import AppContext from "@/contexts/AppContext";

const CollegeInCity = () => {
  const { id } = useParams();
  const [city, setCity] = useState("");
  const [college, setCollege] = useState([]);
  const [loading, setLoading] = useState(false);
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/city/${id}/college`);
        if (response.data.success) {
          setCollege(response.data.colleges);
          setCity(response.data.cityName);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [id, backendUrl, setLoading]);

  return (
    <div className="max-w-[90%] mx-auto py-5">
      <h2 className="text-2xl font-bold mb-4 capitalize">Colleges in {city}</h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-80 bg-gray-200 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {college.length > 0 ? (
            college.map((college) => (
              <Link
                to={`/college/${college._id}`}
                key={college._id}
                className="group bg-white border w-64 h-82 border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={college.image}
                    alt={college.name}
                    loading="lazy"
                  />
                </div>
                <div className="p-2 relative flex flex-col grow">
                  <h3 className="font-bold text-lg truncate text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                    {college.name}
                  </h3>
                  <div className="space-y-1 absolute bottom-11 mb-2">
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-400 shrink-0" />
                      <span className="truncate capitalize">{city}</span>
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <FaPhoneAlt className="text-green-400 shrink-0 size-3" />
                      <span>{college.phone}</span>
                    </p>
                  </div>

                  <div className="mt-auto">
                    <button className="w-full bg-blue-50 text-blue-600 py-2.5 rounded-xl font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                      View College Details
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No colleges found in this city.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CollegeInCity;
