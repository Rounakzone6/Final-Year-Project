import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { logo } from "@/assets";
import Contribute from "./Contribute";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contributing, setContributing] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/city", label: "City" },
    { path: "/college", label: "College" },
    { path: "/hostel", label: "Hostel" },
    { path: "/pg", label: "Flat/Rooms" },
    { path: "/mess", label: "Canteens/Mess" },
  ];

  const handleNavLinkClick = () => {
    setIsOpen(false); 
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-60 h-16 md:h-20 flex items-center">
        <div className="flex w-[92%] max-w-7xl mx-auto justify-between items-center">
          <Link
            to="/"
            onClick={handleNavLinkClick}
            className="hover:opacity-80 transition-opacity"
          >
            <img
              className="h-8 md:h-10 w-auto object-contain"
              src={logo}
              loading="lazy"
              alt="Nestify Logo"
            />
          </Link>
          <div className="hidden lg:flex gap-8">
            {navLinks.map((link) => (
              <NavLink
                onClick={handleNavLinkClick}
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `relative font-bold text-sm uppercase tracking-wider transition-all duration-300 py-1
                  ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-500 hover:text-blue-500"
                  } 
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 
                  after:bg-blue-600 after:transition-all after:duration-300 ${
                    isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => {
                setContributing(true);
                setIsOpen(false);
              }}
              className="hidden md:block cursor-pointer bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg shadow-slate-200 active:scale-95"
            >
              Contribute to us
            </button>

            <button
              className="lg:hidden text-3xl text-slate-800 p-1 rounded-lg hover:bg-slate-50 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-white border-b shadow-xl transition-all duration-300 ease-in-out overflow-hidden z-50 ${
            isOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col p-5 gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={handleNavLinkClick}
                className={({ isActive }) =>
                  `text-base font-bold py-3 px-4 rounded-xl transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => {
                setContributing(true);
                setIsOpen(false);
              }}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold mt-4 shadow-lg shadow-blue-100 active:scale-95 transition-transform"
            >
              Contribute To Us
            </button>
          </div>
        </div>
      </nav>
      {contributing && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setContributing(false)}
          ></div>
          <div className="relative z-10 w-full max-w-2xl bg-white rounded-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <Contribute setContributing={setContributing} />
          </div>
        </div>
      )}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
