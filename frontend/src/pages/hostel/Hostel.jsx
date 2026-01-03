import { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaPhoneAlt,
  FaUtensils,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import AppContext from "@/contexts/AppContext";
import CityListInHostelPage from "@/components/city/CityListInHostelPage";

const Hostel = () => {
  const { hostelList, loading } = useContext(AppContext);
  const location = useLocation();

  // State management
  const [filter, setFilter] = useState("All");
  const [filterGender, setFilterGender] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const isMainPage = location.pathname === "/hostel";

  // Logic: Filter first
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

  // Pagination Logic
  const totalPages = Math.ceil(filteredHostels.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHostels.slice(indexOfFirstItem, indexOfLastItem);

  // Batch updates for Filter + Page reset
  const handleGenderFilter = (val) => {
    setFilterGender(val);
    setCurrentPage(1);
  };

  const handleFoodFilter = (val) => {
    setFilter(val);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-blue-600 font-bold animate-pulse">
          Loading Hostels...
        </p>
      </div>
    );

  return (
    <>
      <CityListInHostelPage />
      {isMainPage ? (
        <div className="max-w-7xl mx-auto p-3 md:p-8 bg-slate-50 min-h-screen">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Nearby Hostels
              </h1>
              <p className="text-slate-500 text-sm">
                Find the perfect stay near your college
              </p>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              {/* Gender Filter */}
              <div className="flex bg-slate-200/50 p-1 rounded-xl backdrop-blur-sm">
                {["All", "Boy's", "Girl's"].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleGenderFilter(type)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-lg font-bold transition-all ${
                      filterGender === type
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-slate-500 hover:text-blue-500"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Food Filter */}
              <div className="flex bg-slate-200/50 p-1 rounded-xl backdrop-blur-sm">
                {["All", "Veg Only", "Non-Veg"].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleFoodFilter(type)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-lg font-bold transition-all ${
                      filter === type
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-slate-500 hover:text-blue-500"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid Layout: 2 col mobile, 3 col tablet */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {currentItems.map((hostel) => (
              <Link
                to={`/hostel/${hostel._id}`}
                key={hostel._id}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-200/40 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={hostel.image[0]}
                    alt={hostel.name}
                    loading="lazy"
                  />

                  {/* Food Badge */}
                  <div className="absolute top-2 left-2">
                    <span
                      className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase shadow-lg backdrop-blur-md ${
                        hostel.nonveg
                          ? "bg-red-500/90 text-white"
                          : "bg-green-500/90 text-white"
                      }`}
                    >
                      {hostel.nonveg ? "Non-Veg" : "Pure Veg"}
                    </span>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl shadow-lg border border-white/50">
                    <p className="text-blue-600 font-black text-sm md:text-base">
                      ₹{hostel.price}
                      <span className="text-[10px] text-slate-400 font-medium ml-0.5">
                        /mo
                      </span>
                    </p>
                  </div>
                </div>

                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="text-sm md:text-lg font-bold text-slate-900 leading-tight mb-2 line-clamp-1">
                    {hostel.name}
                  </h3>

                  <div className="space-y-1 mb-4">
                    <p className="text-[10px] md:text-sm text-blue-600 font-bold flex items-center gap-1 line-clamp-1">
                      <FaUniversity size={12} />{" "}
                      {hostel.college?.name || "Generic College"}
                    </p>
                    <p className="text-[10px] md:text-xs text-slate-400 font-medium capitalize flex items-center gap-1">
                      <FaMapMarkerAlt size={12} className="text-red-400" />{" "}
                      {hostel.city?.name}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `tel:${hostel.phone}`;
                      }}
                      className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90"
                    >
                      <FaPhoneAlt size={14} />
                    </button>
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-xl text-xs md:text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 active:scale-95">
                      View Rooms
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-50"
              >
                <FaChevronLeft size={14} />
              </button>

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "bg-white text-slate-500 hover:bg-blue-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-50"
              >
                <FaChevronRight size={14} />
              </button>
            </div>
          )}

          {filteredHostels.length === 0 && (
            <div className="text-center py-20 bg-white rounded-4xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium italic">
                No hostels match your current filters.
              </p>
            </div>
          )}
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

// Internal icon mapping helpers
const FaUniversity = (props) => <span {...props}>🎓</span>;
const FaMapMarkerAlt = (props) => <span {...props}>📍</span>;

export default Hostel;
