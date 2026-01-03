import { useContext, useEffect, useState } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "../../contexts/AppContext";

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
    <div className="p-4">
      <h2 className="text-xl font-bold">Hostels near {college?.name}</h2>
      <div className="flex gap-18 my-2 items-center justify-around">
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {["All", "Boy's", "Girl's"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterGender(type)}
              className={`md:px-4 md:py-2 px-2 py-1 text-sm rounded-md font-medium transition-all ${
                filterGender === type
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg">
          {["All", "Veg Only", "Non-Veg"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`md:px-4 md:py-2 px-2 py-1 rounded-md text-sm font-medium transition-all ${
                filter === type
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      {localLoading ? (
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="w-50 h-60 bg-gray-100 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHostels.length > 0 ? (
            filteredHostels.map((item) => (
              <Link
                to={`/hostel/${item._id}`}
                key={item._id}
                className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover"
                    src={item.image?.[0] || "https://via.placeholder.com/400"}
                    alt={item.name}
                  />
                  <div className="absolute top-1 left-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
                    <p
                      className={`text-[10px] font-bold ${
                        item.nonveg === true ? "text-red-500" : "text-blue-600"
                      } uppercase tracking-wider`}
                    >
                      {item.nonveg === true ? "NON-VEG" : "PURE VEG"}
                    </p>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
                    <p
                      className={`text-[12px] font-bold text-blue-600 uppercase tracking-wider`}
                    >
                      ₹{item.price}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    📍 {item.city?.name || "Nearby"}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-2 text-center py-10 text-gray-400">
              No hostels linked to this college yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HostelNearCollege;
