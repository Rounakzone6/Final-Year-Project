import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import AppContext from "@/contexts/AppContext";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaArrowUp,
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const { cityList, collegeList, navigate } = useContext(AppContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { Icon: FaInstagram, color: "hover:text-pink-500", link: "#" },
    { Icon: FaFacebook, color: "hover:text-blue-500", link: "#" },
    { Icon: FaXTwitter, color: "hover:text-sky-400", link: "#" },
    { Icon: FaWhatsapp, color: "hover:text-green-500", link: "#" },
  ];

  return (
    <footer className="bg-[#0f172a] text-slate-400 pt-16 border-t border-slate-800">
      <div className="w-[92%] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" onClick={scrollToTop} className="inline-block group">
              <h2 className="text-3xl font-black text-white tracking-tighter">
                Nestify<span className="text-blue-500">.</span>
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 block mt-1 group-hover:translate-x-1 transition-transform">
                Make Your Nest
              </span>
            </Link>

            <p className="text-sm leading-relaxed max-w-sm">
              Simplifying student life by connecting you with verified rooms,
              compatible roommates, and the best local mess services. Your home
              away from home starts here.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400">
                  <FaMapMarkerAlt size={14} />
                </div>
                <span>BBD University, Lucknow</span>
              </div>
              <Link
                to="tel:+917667991277"
                className="flex items-center gap-3 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FaPhoneAlt size={12} />
                </div>
                <span>+91-7667991277</span>
              </Link>
              <Link
                to="mailto:rounak@nestify.com"
                className="flex items-center gap-3 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FaEnvelope size={12} />
                </div>
                <span>rounak@nestify.com</span>
              </Link>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Cities */}
            <div className="space-y-4">
              <h3 className="text-white font-bold uppercase text-xs tracking-widest">
                Top Cities
              </h3>
              <ul className="space-y-2.5">
                {cityList.slice(0, 5).map((city) => (
                  <li key={city._id}>
                    <Link
                      to={`/city/${city._id}`}
                      className="text-sm hover:text-blue-400 capitalize transition-all hover:translate-x-1 inline-block"
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colleges */}
            <div className="space-y-4">
              <h3 className="text-white font-bold uppercase text-xs tracking-widest">
                Popular Colleges
              </h3>
              <ul className="space-y-2.5">
                {collegeList.slice(0, 5).map((college) => (
                  <li key={college._id}>
                    <Link
                      to={`/college/${college._id}`}
                      className="text-sm hover:text-blue-400 capitalize transition-all hover:translate-x-1 inline-block line-clamp-1"
                    >
                      {college.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions & Social */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-white font-bold uppercase text-xs tracking-widest">
                  Quick Actions
                </h3>
                <div className="flex flex-col gap-2.5">
                  <Link
                    to="/hostel"
                    className="text-sm hover:text-blue-400 transition-all hover:translate-x-1"
                  >
                    Find Hostel
                  </Link>
                  <Link
                    to="/pg"
                    className="text-sm hover:text-blue-400 transition-all hover:translate-x-1"
                  >
                    Private Rooms
                  </Link>
                  <Link
                    to="/mess"
                    className="text-sm hover:text-blue-400 transition-all hover:translate-x-1"
                  >
                    Mess Plans
                  </Link>
                </div>
              </div>

              <div className="flex gap-3">
                {socialLinks.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.link}
                    className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.color}`}
                  >
                    <item.Icon />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Business CTA */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/owner-request")}
            className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <FaUserCircle size={22} />
            List your Property & Start Business
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/40 py-8 border-t border-slate-800/50">
        <div className="w-[92%] max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white">Nestify Inc.</span>
          </p>

          <div className="flex items-center gap-8">
            {["Privacy", "Terms", "Support"].map((text) => (
              <Link
                key={text}
                to={`/${text.toLowerCase()}`}
                className="text-[11px] font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                {text}
              </Link>
            ))}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-white hover:text-black transition-all"
            >
              <FaArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
