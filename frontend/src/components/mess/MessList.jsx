import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaStar, FaUtensils } from "react-icons/fa";
import AppContext from "@/contexts/AppContext";

const MessList = () => {
  const { messList, loading } = useContext(AppContext);

  return (
    <div className="p-4 md:p-8 bg-gray-50/50">
      <div className="max-w-[95%] mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-bold text-2xl md:text-3xl text-gray-900 tracking-tight">
              Top Recommended Canteens & Mess
            </h2>
            <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full"></div>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Quality meals and handpicked dining options
            </p>
          </div>
          <Link
            to="/mess"
            className="text-blue-600 font-bold hover:text-blue-800 transition-all text-sm flex items-center gap-1 group"
          >
            See All
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading State */}
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
          /* Mess Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {messList.slice(0, 4).map((mess) => (
              <Link
                to={`/mess/${mess._id}`}
                key={mess._id}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={mess.image?.[0]}
                    alt={mess.name}
                    loading="lazy"
                  />
                  {/* Dietary Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm">
                    <p
                      className={`text-[10px] font-bold ${
                        mess.nonveg ? "text-red-500" : "text-green-600"
                      } uppercase tracking-wider flex items-center gap-1`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          mess.nonveg ? "bg-red-500" : "bg-green-600"
                        }`}
                      ></span>
                      {mess.nonveg ? "Non-Veg Available" : "Pure Veg"}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">
                      {mess.name}
                    </h3>
                    <div className="flex items-center gap-1 text-orange-500 text-sm font-bold shrink-0">
                      <FaStar className="size-3" />
                      <span>4.5</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 flex items-center gap-1 truncate mb-4">
                    <FaUtensils className="size-3 text-gray-400" />
                    near {mess.college?.name || "Campus"}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                        Subscription
                      </p>
                      <p className="text-blue-600 font-extrabold text-xl">
                        ₹{mess.price}
                        <span className="text-xs text-gray-400 font-normal">
                          /mo
                        </span>
                      </p>
                    </div>
                    <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <FaArrowRight className="size-4" />
                    </div>
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

export default MessList;