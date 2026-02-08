import { useContext, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AppContext from "@/contexts/AppContext";

const City = () => {
  const { loading, cityList } = useContext(AppContext);
  const location = useLocation();

  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const isMainPage = location.pathname === "/city";

  const states = [
    "All",
    "Uttar Pradesh",
    "New Delhi",
    "Maharastra",
    "Bihar",
    "Karnataka",
    "Tamil Nadu",
    "Haryana",
    "Telangana",
    "Kerala",
    "West Bengal",
    "Assam",
  ];

  const filteredCity = cityList.filter((city) => {
    return filter === "All" || city.state?.name === filter;
  });

  const totalPages = Math.ceil(filteredCity.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCity.slice(indexOfFirstItem, indexOfLastItem);

  const handleFilterChange = (newState) => {
    setFilter(newState);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isMainPage ? (
        <div className="p-3 md:p-8 bg-slate-50 min-h-screen">
          <div className="max-w-7xl mx-auto mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600" size={20} />
              Explore Cities
            </h1>

            <div className="mt-4 flex overflow-x-hidden no-scrollbar pb-2 -mx-2 px-2">
              <div className="flex gap-2">
                {states.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleFilterChange(type)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                      filter === type
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-slate-500 border border-slate-100 hover:text-blue-600"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
            {loading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-4/5 rounded-2xl bg-slate-200 animate-pulse"
                  />
                ))
              : currentItems.map((city) => (
                  <NavLink
                    to={`/city/${city._id}`}
                    key={city._id}
                    className="group relative aspect-4/5 bg-white rounded-2xl md:rounded-4xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 active:scale-95"
                  >
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={city.image}
                      alt={city.name}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                      <p className="text-white font-bold text-base md:text-2xl capitalize leading-tight">
                        {city.name}
                      </p>
                      <p className="text-blue-300 text-[8px] md:text-[10px] uppercase font-black tracking-widest mt-0.5">
                        {city.state?.name}
                      </p>
                    </div>
                  </NavLink>
                ))}
          </div>

          {!loading && totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-colors"
              >
                <FaChevronLeft size={14} />
              </button>

              <div className="flex items-center gap-1 overflow-x-auto max-w-50 sm:max-w-none no-scrollbar">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`min-w-10 h-10 px-2 rounded-xl font-bold text-sm transition-all ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white shadow-lg"
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
                className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-colors"
              >
                <FaChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default City;
