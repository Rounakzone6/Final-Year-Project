import { useContext, useEffect, useState } from "react";
import { NavLink, useParams, Outlet } from "react-router-dom";
import axios from "axios";
import { FaGraduationCap, FaMapMarkerAlt, FaCompass } from "react-icons/fa";
import AppContext from "@/contexts/AppContext";
import PlaceMap from "@/components/PlaceMap";

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

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">
          Loading college profile...
        </p>
      </div>
    );

  if (!college)
    return (
      <div className="p-10 text-center text-slate-500">College not found.</div>
    );

  // Helper for cleaner NavLinks
  const TabLink = ({ to, label, end = false }) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `whitespace-nowrap pb-3 px-1 font-bold text-sm md:text-base transition-all duration-300 relative
        ${isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-600"}`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {isActive && (
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full transition-all duration-300" />
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white min-h-screen">
      {/* Hero Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 text-blue-600 mb-2">
          <FaGraduationCap size={24} />
          <span className="text-xs font-black uppercase tracking-[0.2em]">
            Institutional Profile
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 capitalize tracking-tight leading-tight">
          {college.name}
        </h1>
        <div className="flex items-center gap-2 mt-3 text-slate-500">
          <FaMapMarkerAlt className="text-red-400" />
          <p className="capitalize font-medium text-sm md:text-base">
            {college.city?.name}, {college.city?.state?.name || "India"}
          </p>
        </div>
      </header>

      {/* Modern Scrollable Tabs */}
      <div className="border-b border-slate-100 mb-6 overflow-x-auto no-scrollbar">
        <nav className="flex gap-6 md:gap-10 min-w-max">
          <TabLink to={`/college/${id}`} label="Description" end />
          <TabLink to={`/college/${id}/hostel`} label="Hostels" />
          <TabLink to={`/college/${id}/pg`} label="PG/Flats" />
          <TabLink to={`/college/${id}/mess`} label="Canteens & Mess" />
        </nav>
      </div>

      {/* Dynamic Content (Outlet) */}
      <main className="mb-10 min-h-75">
        <Outlet context={{ college }} />
      </main>

      {/* Interactive Map Section */}
      <section className="mt-12">
        <div className="flex items-center gap-2 mb-4">
          <FaCompass className="text-blue-600" />
          <h2 className="font-bold text-slate-800">Neighborhood Map</h2>
        </div>
        <div className="overflow-hidden shadow-2xl shadow-blue-100 border border-slate-100 h-64 md:h-80 rounded-[2.5rem] relative group">
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm text-[10px] font-black uppercase tracking-widest text-slate-600 border border-white">
            Explore Surroundings
          </div>
          <PlaceMap
            center={{
              lng: college.locations.coordinates[0],
              lat: college.locations.coordinates[1],
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default CollegeDetails;
