import { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaUniversity,
  FaSearch,
  FaPhoneAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import AppContext from "@/contexts/AppContext";
import CityListInCollegePage from "@/components/city/CityListInCollegePage";

const College = () => {
  const { loading, collegeList } = useContext(AppContext);
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const isMainPage = location.pathname === "/college";

  const filteredColleges = collegeList.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredColleges.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColleges.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <CityListInCollegePage />
      {isMainPage ? (
        <div className="p-3 md:p-8 bg-slate-50 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <FaUniversity className="text-blue-600" size={24} />
                  Explore Colleges
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Find the best educational institutions across cities.
                </p>
              </div>
              <div className="relative group w-full md:w-80">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search colleges..."
                  value={searchTerm}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  onChange={handleSearch}
                />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-4/5 bg-slate-200 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                  {currentItems.length > 0 ? (
                    currentItems.map((college) => (
                      <Link
                        to={`/college/${college._id}`}
                        key={college._id}
                        className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-200/40 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"
                      >
                        <div className="relative aspect-video md:aspect-4/3 overflow-hidden">
                          <img
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            src={college.image}
                            alt={college.name}
                            loading="lazy"
                          />
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-black text-blue-600 uppercase tracking-tighter">
                            {college.city?.name}
                          </div>
                        </div>

                        <div className="p-3 flex-1 flex flex-col">
                          <h3 className="font-bold text-sm md:text-base text-slate-900 line-clamp-1 capitalize">
                            {college.name}
                          </h3>
                          <p className="text-[10px] md:text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">
                            {college.city?.state?.name}
                          </p>

                          <div className="mt-auto pt-2">
                            <p className="text-[10px] md:text-sm text-slate-600 flex items-center gap-2">
                              <FaPhoneAlt size={10} className="text-blue-500" />
                              {college.phone}
                            </p>
                            <button className="mt-2 w-full py-2 bg-blue-50 text-blue-600 text-xs md:text-sm rounded-xl font-bold group-hover:bg-blue-600 group-hover:text-white transition-all active:scale-95">
                              View details
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                      <p className="text-slate-400 font-medium italic">
                        No colleges found matching "{searchTerm}"
                      </p>
                    </div>
                  )}
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

                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-50 sm:max-w-none">
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
              </>
            )}
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default College;
