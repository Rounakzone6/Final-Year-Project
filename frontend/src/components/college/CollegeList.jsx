import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import AppContext from "@/contexts/AppContext";

const CollegeList = () => {
  const { loading, collegeList } = useContext(AppContext);

  return (
    <div className="p-4 md:p-8 bg-gray-50/50">
      <div className="max-w-[95%] mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-bold text-2xl md:text-3xl text-gray-900 tracking-tight">
              Top Colleges
            </h2>
            <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full"></div>
          </div>
          <Link
            to="/college"
            className="text-blue-600 font-bold hover:text-blue-800 transition-all text-sm flex items-center gap-1 group"
          >
            See All{" "}
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collegeList.slice(0, 4).map((college) => (
              <Link
                to={`/college/${college._id}`}
                key={college._id}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={college.image}
                    alt={college.name}
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      {college.city?.name}
                    </p>
                  </div>
                </div>
                <div className="p-5 flex flex-col grow">
                  <h3 className="font-bold text-lg text-gray-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {college.name}
                  </h3>

                  <div className="space-y-2 mb-2">
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-400 shrink-0" />
                      <span className="truncate capitalize">
                        {college.city?.name}, {college.city?.state?.name}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <FaPhoneAlt className="text-green-400 shrink-0 size-3" />
                      <span>{college.phone}</span>
                    </p>
                  </div>

                  <div className="mt-auto">
                    <button className="w-full bg-blue-50 text-blue-600 py-2.5 rounded-xl font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                      View College Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeList;
