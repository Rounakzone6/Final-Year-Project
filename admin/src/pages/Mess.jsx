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
} from "react-icons/fa";

const Mess = () => {
  const { token, loading, messList, setmessList, backendUrl } =
    useContext(AppContext);

  const removemess = async (id) => {
    if (!window.confirm("Are you sure you want to remove this mess?")) return;
    try {
      const res = await axios.delete(`${backendUrl}/mess/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success("mess removed successfully");
        setmessList((prev) => prev.filter((mess) => mess._id !== id));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openInMaps = (lng, lat) => {
    // Standard Google Maps Link: https://www.google.com/maps?q=lat,lng
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full md:p-4 p-2">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            messs/Flats Management
          </h1>
          <p className="text-gray-500 text-xs">
            View and manage all registered messs
          </p>
        </div>
        <NavLink
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold transition-all shadow-md flex items-center gap-2"
          to="/mess/add"
        >
          <FaPlus /> Add mess
        </NavLink>
      </div>
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_3fr_1fr_1.5fr_1fr_1fr_0.5fr] bg-gray-50 border-b border-gray-200 px-4 py-3 text-sm font-bold text-gray-600 uppercase tracking-wider">
          <p>S.No</p>
          <p>mess Name</p>
          <p>College</p>
          <p>City</p>
          <p>Contact</p>
          <p>Price</p>
          <p className="text-center">Location</p>
          <p className="text-right">Action</p>
        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-500 font-medium">
            Loading messs...
          </div>
        ) : messList.length > 0 ? (
          messList.map((mess, index) => (
            <div
              key={mess._id}
              className="md:grid grid-cols-[0.5fr_2fr_3fr_1fr_1.5fr_1fr_1fr_0.5fr] px-4 py-1 border-b border-gray-100 items-center hover:bg-blue-50/30 transition-colors"
            >
              <p className="text-gray-400 font-medium">#{index + 1}</p>

              <NavLink
                to={`/mess/${mess._id}`}
                className="text-gray-900 hover:underline font-medium"
              >
                {mess.name}
              </NavLink>

              <p className="text-gray-600 truncate font-medium capitalize">
                <span className="md:hidden font-medium mr-1 text-xs text-gray-400">
                  COLLEGE:
                </span>
                {mess.college?.name}
              </p>
              <p className="text-gray-600 font-medium capitalize">
                <span className="md:hidden font-medium mr-1 text-xs text-gray-400">
                  CITY:
                </span>
                {mess.city?.name}
              </p>

              <p className="text-gray-600 flex gap-1 items-center text-sm">
                <span className="md:hidden font-medium mr-1 text-xs text-gray-400">
                  CONTACT:
                </span>
                <FaPhoneAlt className="text-blue-600" />
                {mess.phone}
              </p>

              <div className="truncate pr-4">
                <p className="text-blue-500 hover:text-blue-700 flex items-center text-sm">
                  <FaRupeeSign />
                  {mess.price}
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() =>
                    openInMaps(
                      mess.locations.coordinates[0],
                      mess.locations.coordinates[1]
                    )
                  }
                  className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 cursor-pointer transition-all group"
                  title="View on Maps"
                >
                  <FaDirections />
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => removemess(mess._id)}
                  className="text-red-400 hover:text-red-600 p-2 transition-colors"
                  title="Delete mess"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-gray-400 italic">
            No messs found in the database.
          </div>
        )}
      </div>
    </div>
  );
};

export default Mess;
