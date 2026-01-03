import { useContext } from "react";
import { Link } from "react-router-dom";
import { logo } from "@/assets";
import AppContext from "@/contexts/AppContext";

const Navbar = () => {
  const { token, role, setToken, navigate } = useContext(AppContext);

  const logout = () => {
    if (token) {
      setToken("");
      navigate("/");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center">
          <img
            onClick={() => navigate("/")}
            src={logo}
            loading="lazy"
            alt="Nestify Logo"
            className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
          />
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          {role !== "admin" && (
            <Link
              to="/manage"
              className="text-sm font-semibold text-gray-700 hover:text-black transition-colors hidden sm:block"
            >
              Manage Admins
            </Link>
          )}

          <button
            onClick={logout}
            className="px-5 py-2 text-sm font-bold text-white bg-black rounded-full hover:bg-gray-800 transition-all active:scale-95 shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
