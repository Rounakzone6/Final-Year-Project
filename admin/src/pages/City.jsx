import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import AppContext from "@/contexts/AppContext";

const City = () => {
  const { token, role, loading, backendUrl, cityList, setCities } =
    useContext(AppContext);

  const removeCity = async (id) => {
    if (role === "admin") return toast.error("You can not remove the city");
    try {
      const response = await axios.delete(`${backendUrl}/city/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setCities((prev) => prev.filter((city) => city._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full md:p-4 p-2">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            College Management
          </h1>
          {role === "admin" ? (
            ""
          ) : (
            <p className="text-gray-500 text-xs">
              View and manage all registered cites
            </p>
          )}
        </div>
        {role === "admin" ? (
          ""
        ) : (
          <NavLink
            className="px-3 flex items-center gap-2 bg-blue-700 py-2 text-white rounded font-medium"
            to="/city/add"
          >
            <FaPlus /> Add City
          </NavLink>
        )}
      </div>

      <div className="bg-white mt-6 rounded-xl shadow-md border border-gray-100 overflow-hidden">
        {loading ? (
          <p className="p-10 text-center text-gray-500 font-medium">
            Loading...
          </p>
        ) : cityList.length > 0 ? (
          cityList.map((city, index) => (
            <div
              className={`md:grid ${
                role === "admin"
                  ? "grid-cols-[0.5fr_1fr_1fr_1fr_3fr]"
                  : "grid-cols-[0.5fr_1fr_1fr_1fr_3fr_1fr]"
              } py-1 px-4 border-b border-gray-100 items-center hover:bg-blue-50/30 transition-colors`}
              key={city._id}
            >
              <p className="font-medium text-gray-400">#{index + 1}</p>
              <img
                src={city.image}
                alt={city.name}
                className="w-12 h-12 rounded object-cover"
              />
              <p className="text-xl capitalize">{city.name}</p>
              <p className="text-gray-500 capitalize">{city.state?.name}</p>
              <div className="flex gap-10">
                <NavLink
                  className="text-blue-600 px-3 py-1 text-sm hover:bg-blue-50 rounded-md transition-colors"
                  to="/add-college"
                >
                  Add College
                </NavLink>
                <NavLink
                  className="text-blue-600 px-3 py-1 text-sm hover:bg-blue-50 rounded-md transition-colors"
                  to="/add-hostel"
                >
                  Add Hostel
                </NavLink>
                <NavLink
                  className="text-blue-600 px-3 py-1 text-sm hover:bg-blue-50 rounded-md transition-colors"
                  to="/add-mess"
                >
                  Add Mess
                </NavLink>
              </div>
              {role === "admin" ? null : (
                <button
                  onClick={() => removeCity(city._id)}
                  className="text-red-500 cursor-pointer hover:bg-red-50 transition-colors px-2 py-1 rounded text-sm "
                >
                  remove
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No cities found.</p>
        )}
      </div>
    </div>
  );
};

export default City;
