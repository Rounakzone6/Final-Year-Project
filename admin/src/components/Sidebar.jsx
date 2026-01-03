import { NavLink } from "react-router-dom";
import {
  FaCity,
  FaUniversity,
  FaHotel,
  FaHome,
  FaUtensils,
  FaUserShield,
} from "react-icons/fa";

const Sidebar = () => {
  const linkBaseClass =
    "flex items-center gap-3 px-4 py-3 rounded-l-xl transition-all duration-200 border-y border-l border-transparent mb-1";
  const activeClass =
    "bg-blue-50 text-blue-700 border-blue-200 font-semibold shadow-[-4px_0_0_0_#1d4ed8]";
  const inactiveClass = "text-gray-600 hover:bg-gray-50 hover:text-black";

  return (
    <aside className="w-[18%] md:w-[18%] min-h-dvh bg-white border-r border-gray-100 flex flex-col pt-8">
      <div className="flex flex-col pl-2 md:pl-6 space-y-1">
        <p className="hidden md:block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
          Management
        </p>

        <NavLink
          to="/city"
          className={({ isActive }) =>
            `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <FaCity className="text-lg md:text-base shrink-0" />
          <span className="hidden md:block text-xs md:text-sm">Cities</span>
        </NavLink>

        <NavLink
          to="/college"
          className={({ isActive }) =>
            `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <FaUniversity className="text-lg md:text-base shrink-0" />
          <span className="hidden md:block text-xs md:text-sm">Colleges</span>
        </NavLink>

        <NavLink
          to="/hostel"
          className={({ isActive }) =>
            `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <FaHotel className="text-lg md:text-base shrink-0" />
          <span className="hidden md:block text-xs md:text-sm">Hostels</span>
        </NavLink>

        <NavLink
          to="/pg"
          className={({ isActive }) =>
            `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <FaHome className="text-lg md:text-base shrink-0" />
          <span className="hidden md:block text-xs md:text-sm">PGs</span>
        </NavLink>

        <NavLink
          to="/mess"
          className={({ isActive }) =>
            `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <FaUtensils className="text-lg md:text-base shrink-0" />
          <span className="hidden md:block text-xs md:text-sm">Mess Units</span>
        </NavLink>

        <div className="pt-6 mt-4 border-t border-gray-100">
          <p className="hidden md:block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">
            Requests
          </p>
          <NavLink
            to="/owner"
            className={({ isActive }) =>
              `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <FaUserShield className="text-lg md:text-base shrink-0" />
            <span className="hidden md:block text-xs md:text-sm">
              Owner Requests
            </span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
