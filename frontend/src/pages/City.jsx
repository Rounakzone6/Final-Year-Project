import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import { useState } from "react";
import CityList from "../components/CityList";

const City = () => {
  const { loading, cityList } = useContext(AppContext);
  const [filter, setFilter] = useState("All");

  const filteredCity = cityList.filter((h) => {
    const matchescity =
      filter === "All" ||
      (filter === "Uttar Pradesh" && h.state?.name === "Uttar Pradesh") ||
      (filter === "New Delhi" && h.state?.name === "New Delhi") ||
      (filter === "Maharastra" && h.state?.name === "Maharastra") ||
      (filter === "Bihar" && h.state?.name === "Bihar") ||
      (filter === "Karnataka" && h.state?.name === "Karnataka") ||
      (filter === "Haryana" && h.state?.name === "Haryana") ||
      (filter === "Tamil Nadu" && h.state?.name === "Tamil Nadu") ||
      (filter === "Telangana" && h.state?.name === "Telangana");
    return matchescity;
  });

  return (
    <>
      <CityList />
      <div className="my-4 mx-10">
        <div className="flex bg-gray-100 py-2 px-6 rounded-lg">
          {[
            "All",
            "Uttar Pradesh",
            "New Delhi",
            "Maharastra",
            "Bihar",
            "Karnataka",
            "Tamil Nadu",
            "Haryana",
            "Telangana",
          ].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === type
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full h-72 rounded-3xl bg-gray-100 animate-pulse"
                />
              ))
            : filteredCity.map((city) => (
                <NavLink
                  to={`/city/${city._id}`}
                  key={city._id}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-transparent hover:border-blue-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      src={city.image}
                      alt={city.name}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-4 left-4 text-left">
                      <p className="text-white font-black text-2xl capitalize leading-none">
                        {city.name}
                      </p>
                      <p className="text-blue-300 text-[10px] uppercase font-bold tracking-widest mt-1">
                        {city.state?.name}
                      </p>
                    </div>
                  </div>
                </NavLink>
              ))}
        </div>
      </div>
    </>
  );
};

export default City;
