import { useContext, useEffect, useState } from "react";
import { NavLink, useParams, Outlet } from "react-router-dom";
import axios from "axios";
import AppContext from "../contexts/AppContext";
import PlaceMap from "../components/PlaceMap";

const CollegeDetails = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const { backendUrl, loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        setLoading(true);
        const response = await axios(`${backendUrl}/college/${id}`);
        if (response.data.success) {
          setCollege(response.data.college);
        }
      } catch (error) {
        console.error("Error fetching college details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [id, backendUrl, setLoading]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!college)
    return <div className="p-10 text-center">College not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold capitalize">{college.name}</h1>
      <p className="text-blue-600 capitalize font-medium">{college.city?.name}</p>

      {/* Navigation Tabs */}
      <div className="flex justify-around bg-blue-50 rounded-2xl py-4 my-4">
        <NavLink
          to={`/college/${id}`}
          end
          className={({ isActive }) =>
            `relative font-medium text-lg transition-all duration-300 py-1
                ${
                  isActive
                    ? "text-blue-600 after:w-full"
                    : "text-gray-600 hover:text-blue-500 after:w-0"
                } 
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 
                after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full`
          }
        >
          Description
        </NavLink>
        <NavLink
          to={`/college/${id}/hostel`}
          className={({ isActive }) =>
            `relative font-medium text-lg transition-all duration-300 py-1
                ${
                  isActive
                    ? "text-blue-600 after:w-full"
                    : "text-gray-600 hover:text-blue-500 after:w-0"
                } 
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 
                after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full`
          }
        >
          Hostels
        </NavLink>
        <NavLink
          to={`/college/${id}/pg`}
          className={({ isActive }) =>
            `relative font-medium text-lg transition-all duration-300 py-1
                ${
                  isActive
                    ? "text-blue-600 after:w-full"
                    : "text-gray-600 hover:text-blue-500 after:w-0"
                } 
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 
                after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full`
          }
        >
          PG/Flats
        </NavLink>
        <NavLink
          to={`/college/${id}/mess`}
          className={({ isActive }) =>
            `relative font-medium text-lg transition-all duration-300 py-1
                ${
                  isActive
                    ? "text-blue-600 after:w-full"
                    : "text-gray-600 hover:text-blue-500 after:w-0"
                } 
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 
                after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full`
          }
        >
          Canteens/Mess
        </NavLink>
      </div>
      <div className="mt-6">
        <Outlet context={{ college }} />
      </div>
      <div className="overflow-hidden shadow-inner border border-gray-100 h-50 rounded-3xl relative">
        <div className="absolute top-4 left-4 z-10 bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold">
          Explore Surroundings
        </div>
        <PlaceMap
          center={{
            lng: college.locations.coordinates[0],
            lat: college.locations.coordinates[1],
          }}
        />
      </div>
    </div>
  );
};

export default CollegeDetails;
