import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "../contexts/AppContext";

const PgInCity = () => {
  const { id } = useParams();
  const [city, setCity] = useState("");
  const [pg, setPg] = useState([]);
  const [loading, setLoading] = useState(false);
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchPg = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/city/${id}/pg`);
        if (response.data.success) {
          setPg(response.data.pgs);
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
    fetchPg();
  }, [id, backendUrl, setLoading]);

  return (
    <div className="max-w-[90%] mx-auto py-5">
      <h2 className="text-2xl font-bold mb-4 capitalize">Flat/PGs in {city}</h2>
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
          {pg.length > 0 ? (
            pg.map((pg) => (
              <Link
                to={`/hostel/${pg._id}`}
                key={pg._id}
                className="w-64 h-80 snap-start group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={pg.image?.[0]}
                    alt={pg.name}
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      {pg.gender === "male" ? "♂ Boys" : "♀ Girls"}
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800 text-lg truncate w-40">
                      {pg.name}
                    </h3>
                    <div className="flex items-center text-orange-500 text-sm font-bold">
                      ★ 4.5
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 truncate mb-4">
                    near {pg.college?.name || "Campus"}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                        Starting from
                      </p>
                      <p className="text-blue-600 font-extrabold text-lg">
                        ₹{pg.price}
                        <span className="text-xs text-gray-400 font-normal">
                          /mo
                        </span>
                      </p>
                    </div>
                    <button className="bg-gray-900 text-white p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No Flat/PGs found in this city.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PgInCity;
