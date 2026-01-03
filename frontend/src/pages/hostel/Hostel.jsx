import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AppContext from "@/contexts/AppContext";
import CityListInHostelPage from "@/components/city/CityListInHostelPage";

const Hostel = () => {
  const { hostelList, navigate, location, loading } = useContext(AppContext);
  const [filter, setFilter] = useState("All");
  const [filterGender, setFilterGender] = useState("All");

  const isMainPage = location.pathname === "/hostel";

  const filteredHostels = hostelList.filter((h) => {
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-bounce text-blue-600 font-bold">
          Loading Hostels...
        </div>
      </div>
    );

  return (
    <>
      <CityListInHostelPage />
      {isMainPage ? (
        <div className="max-w-7xl mx-auto md:p-6 p-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800">
                Nearby Hostels
              </h1>
              <p className="text-gray-500">
                Find the perfect stay near your college
              </p>
            </div>

            <div className="flex gap-18 items-center">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHostels.map((hostel) => (
              <Link
                to={`/hostel/${hostel._id}`}
                key={hostel._id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    src={hostel.image[0]}
                    alt={hostel.name}
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm ${
                        hostel.nonveg
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {hostel.nonveg ? "● Non-Veg" : "● Pure Veg"}
                    </span>
                  </div>
                  <div className="absolute backdrop-blur-md bg-white/10 border border-white/10 px-4 py-1 rounded-3xl bottom-2 right-2 shadow-lg">
                    <p className="text-blue-600 font-extrabold text-lg">
                      ₹{hostel.price}
                      <span className="text-xs text-gray-200 font-normal ml-1">
                        /mo
                      </span>
                    </p>
                  </div>
                </div>

                <div className="py-2 px-4">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                    {hostel.name}
                  </h3>
                  <div className="space-y-1 mb-2">
                    <p className="text-sm text-blue-600 font-medium flex items-center gap-1">
                      🎓 {hostel.college?.name || "Generic College"}
                    </p>
                    <p className="text-sm text-gray-500 capitalize flex items-center gap-1">
                      📍 {hostel.city?.name}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                    <p
                      onClick={(e) => {
                        navigate(`tel:${hostel.phone}`), e.stopPropagation();
                      }}
                      className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      📞 Contact
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-100">
                      View Rooms
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredHostels.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No hostels found in this category.
            </div>
          )}
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Hostel;
