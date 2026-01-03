import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AppContext from "@/contexts/AppContext";

const CityListInPgPage = () => {
  const { loading, cityList } = useContext(AppContext);

  return (
    <div className="w-full bg-white border-b border-gray-100 py-4">
      <div className="max-w-[90%] mx-auto">
        <div className="flex gap-3 justify-items-center p-2 overflow-x-hidden">
          {loading
            ? Array.from({ length: 15 }).map((_, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center gap-1 group transition-all duration-300 ${
                    index > 4 ? "hidden sm:flex" : "flex"
                  } ${index > 8 ? "hidden md:flex" : ""}`}
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 animate-pulse" />
                  <div className="w-12 h-3 bg-gray-100 rounded animate-pulse" />
                </div>
              ))
            : cityList.slice(0, 15).map((city, index) => (
                <NavLink
                  to={`/pg/city/${city._id}`}
                  key={city._id}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-1 group transition-all duration-300 ${
                      index > 4 ? "hidden sm:flex" : "flex"
                    } ${index > 8 ? "hidden md:flex" : ""} ${
                      isActive
                        ? "opacity-100 scale-105"
                        : "opacity-80 hover:opacity-100"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="relative">
                        <img
                          className={`w-16 h-16 object-cover rounded-full border-2 transition-all shadow-sm ${
                            isActive
                              ? "border-blue-600"
                              : "border-transparent group-hover:border-blue-500"
                          }`}
                          src={city.image}
                          alt={city.name}
                        />
                        {isActive && (
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        )}
                      </div>
                      <p
                        className={`capitalize text-xs font-semibold ${
                          isActive
                            ? "text-blue-600"
                            : "text-gray-600 group-hover:text-blue-600"
                        }`}
                      >
                        {city.name}
                      </p>
                    </>
                  )}
                </NavLink>
              ))}
        </div>
      </div>
    </div>
  );
};

export default CityListInPgPage;
