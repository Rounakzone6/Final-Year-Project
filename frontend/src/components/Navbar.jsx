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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex py-3 max-w-[90%] mx-auto justify-between items-center">
        <Link
          to="/"
          onClick={scrollToTop}
          className="hover:scale-105 transition-transform duration-200"
        >
          <img
            className="h-10 md:h-12 w-auto object-contain"
            src={logo}
            loading="lazy"
            alt="Nestify Logo"
          />
        </Link>
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <NavLink
              onClick={scrollToTop}
              key={link.path}
              to={link.path}
              end={link.path === "/"}
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
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setContributing(true)}
            className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-sm"
          >
            Contribute To Us
          </button>
          <button
            className="md:hidden text-3xl text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>
      {contributing && (
        <div className="absolute z-10">
          <Contribute setContributing={setContributing} />
        </div>
      )}
      <div
        className={`md:hidden absolute w-full bg-white border-b shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-5 py-2 gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg font-medium py-2 transition-colors ${
                  isActive
                    ? "text-blue-600 border-l-4 border-blue-600 pl-3"
                    : "text-gray-600 pl-3"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              setContributing(true), setIsOpen(!isOpen);
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-2"
          >
            Contribute To Us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
