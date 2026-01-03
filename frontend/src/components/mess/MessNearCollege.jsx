import { useContext, useEffect, useState } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
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
        toast.error("Error loading hostels");
        console.log(error);
      } finally {
        setLocalLoading(false);
      }
    };

    if (id) loadData();
  }, [id, backendUrl]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6">
        Canteens/Mess near {college?.name}
      </h2>
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
          {mess.length > 0 ? (
            mess.map((item) => (
              <Link
                to={`/mess/${item._id}`}
                key={item._id}
                className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover"
                    src={item.image?.[0] || "https://via.placeholder.com/400"}
                    alt={item.name}
                    loading="lazy"
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
              No Canteens/Mess linked to this college yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessNearCollege;
