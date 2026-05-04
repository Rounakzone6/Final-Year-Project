import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaStar, FaBuilding } from "react-icons/fa";
import AppContext from "@/contexts/AppContext";

const PgList = () => {
  const { pgList, loading } = useContext(AppContext);

  return (
    <div className="p-4 md:p-8 bg-white">
      <div className="max-w-[95%] mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-bold text-2xl md:text-3xl text-gray-900 tracking-tight">
              Top Recommended PGs & Flats
            </h2>
            <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full"></div>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Handpicked stays based on student reviews
            </p>
          </div>
          <Link
            to="/pg"
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
                className="h-80 bg-gray-100 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : (
          /* PG/Flat Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pgList.slice(0, 4).map((pg) => (
              <Link
                to={`/pg/${pg._id}`}
                key={pg._id}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={pg.image?.[0]}
                    alt={pg.name}
                    loading="lazy"
                  />
                  {/* Gender Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      {pg.gender === "male" ? "♂ Boys" : "♀ Girls"}
                    </p>
                  </div>
                  {/* Food Preference Badge */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
                    <p
                      className={`text-[10px] font-bold ${
                        pg.nonveg ? "text-red-500" : "text-green-600"
                      } uppercase tracking-wider`}
                    >
                      {pg.nonveg ? "NON-VEG" : "PURE VEG"}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">
                      {pg.name}
                    </h3>
                    <div className="flex items-center gap-1 text-orange-500 text-sm font-bold shrink-0">
                      <FaStar className="size-3" />
                      <span>4.5</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 flex items-center gap-1 truncate mb-4">
                    <FaBuilding className="size-3 text-gray-400" />
                    near {pg.college?.name || "Campus"}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                        Starting from
                      </p>
                      <p className="text-blue-600 font-extrabold text-xl">
                        ₹{pg.price}
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

export default PgList;