import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import AppContext from "@/contexts/AppContext";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaArrowUp,
  FaUser,
} from "react-icons/fa";

const Footer = () => {
  const { cityList, collegeList, navigate } = useContext(AppContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      <div className="w-[90%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pb-12">
          <div className="col-span-1 lg:col-span-1">
            <Link
              to="/"
              onClick={scrollToTop}
              className="text-3xl font-bold text-white mb-4 block group"
            >
              Nestify
              <span className="text-sm font-light text-blue-400 block group-hover:translate-x-2 transition-transform duration-300">
                ~ "Make Your Nest"
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              Simplifying student life by connecting you with verified rooms,
              compatible roommates, and the best local mess services. Your home
              away from home starts here.
            </p>

            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <span className="text-blue-500 font-semibold">Address:</span>{" "}
                BBD University, Lucknow
              </p>
              <p className="flex items-center gap-2">
                <span className="text-blue-500 font-semibold">Phone:</span>
                <Link
                  to="tel:+917667991277"
                  className="hover:text-white hover:underline transition-all underline-offset-4"
                >
                  +91-7667991277
                </Link>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-blue-500 font-semibold">Email:</span>
                <Link
                  to="mailto:rounakgupta002@gmail.com"
                  className="hover:text-white hover:underline transition-all underline-offset-4"
                >
                  rounak@nestify.com
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-5 mt-8">
              {[
                { Icon: FaInstagram, color: "hover:text-pink-500", link: "#" },
                { Icon: FaFacebook, color: "hover:text-blue-500", link: "#" },
                { Icon: FaXTwitter, color: "hover:text-sky-400", link: "#" },
                { Icon: FaWhatsapp, color: "hover:text-green-500", link: "#" },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  className={`text-2xl transition-all duration-300 transform hover:-translate-y-2 ${item.color}`}
                >
                  <item.Icon />
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-1 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-bold text-lg mb-2 border-b border-blue-600 w-fit">
                Top Cities
              </h3>
              {cityList.slice(0, 6).map((city) => (
                <Link
                  key={city._id}
                  to={`/city/${city._id}`}
                  className="hover:text-blue-400 capitalize transition-all hover:translate-x-1 duration-200"
                >
                  {city.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-white font-bold text-lg mb-2 border-b border-blue-600 w-fit">
                Popular Colleges
              </h3>
              {collegeList.slice(0, 6).map((college) => (
                <Link
                  key={college._id}
                  to={`/college/${college._id}`}
                  className="hover:text-blue-400 capitalize transition-all hover:translate-x-1 duration-200 text-sm"
                >
                  {college.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-white font-bold text-lg mb-2 border-b border-blue-600 w-fit">
                Quick Actions
              </h3>
              <Link
                to="/rooms"
                className="hover:text-blue-400 transition-all hover:translate-x-1"
              >
                Find a Room
              </Link>
              <Link
                to="/mess"
                className="hover:text-blue-400 transition-all hover:translate-x-1"
              >
                Mess Services
              </Link>
              <Link
                to="/hostel"
                className="hover:text-blue-400 transition-all hover:translate-x-1"
              >
                Hostels
              </Link>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-300 transition-colors"
              >
                Back to Top <FaArrowUp size={12} />
              </button>
            </div>
          </div>
          <button
            onClick={() => navigate("/owner-request")}
            className="px-4 py-2 rounded-full hover:scale-105 transition-all duration-700 border cursor-pointer border-gray-700"
          >
            <p className="flex items-center gap-1 text-green-400 hover:text-blue-300 transition-colors">
              Start your business with us <FaUser size={20} />
            </p>
          </button>
        </div>
      </div>
      <div className="bg-black py-6 border-t border-gray-800">
        <div className="w-[90%] mx-auto flex flex-col md:row-reverse md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest text-gray-500">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-blue-600">Nestify</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Privacy", "Terms", "Sitemap", "Support"].map((text) => (
              <Link
                key={text}
                to={`/${text.toLowerCase()}`}
                className="hover:text-white transition-colors"
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
