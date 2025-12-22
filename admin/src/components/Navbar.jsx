import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { logo } from "../assets";

const Navbar = () => {
  const { token, role, setToken, navigate } = useContext(AppContext);

  const logout = () => {
    if (token) {
      setToken("");
      navigate("/");
    }
  };

  return (
    <div className="bg-gray-200 p-2">
      <div className="flex justify-between items-center md:max-w-[90%] mx-auto">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="Nestify"
          className="h-12"
        />
        <div className="flex items-center gap-5">
          {role === "admin" ? null : (
            <Link to="/manage" className="border rounded-2xl px-2 py-1">
              Manage Admin
            </Link>
          )}
          <button onClick={logout} className="px-3 py-2 border rounded-2xl ">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
