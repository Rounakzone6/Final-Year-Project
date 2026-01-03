import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import CityListInCollegePage from "../../components/city/CityListInCollegePage";

const College = () => {
  const { loading, location, collegeList } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const isMainPage = location.pathname === "/college";

  const filteredColleges = collegeList.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <CityListInCollegePage />
      {isMainPage ? (
        <div className="p-4 bg-gray-50 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Explore Colleges
              </h1>
              <input
                type="text"
                placeholder="Search by college name..."
                className="p-2 border rounded-lg w-full md:w-80 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredColleges.length > 0 ? (
                  filteredColleges.map((college) => (
                    <Link
                      to={`/college/${college._id}`}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                      key={college._id}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                          src={college.image}
                          alt={college.name}
                        />
                        <div className="absolute capitalize top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-semibold text-blue-600">
                          {college.city?.name}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold capitalize text-gray-900 truncate">
                          {college.name}
                        </h3>
                        <h3 className="font-medium capitalize text-gray-500 truncate">
                          {college.city?.state?.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                          📞 {college.phone}
                        </p>
                        <button className="mt-4 w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-medium group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          View Details
                        </button>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10 text-gray-400">
                    No colleges found matching "{searchTerm}"
                  </div>
                )}
              </div>
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
