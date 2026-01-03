import { Link, useOutletContext } from "react-router-dom";
import { FaDirections, FaPhoneAlt } from "react-icons/fa";
import { FaEarthAsia, FaLocationDot } from "react-icons/fa6";

const CollegeDescription = () => {
  const { college } = useOutletContext();

  const openInMaps = (lng, lat) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  if (!college) return null;

  return (
    <div className="my-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      {/* Increased Image Section: Now spans 7 columns instead of 5 */}
      <div className="lg:col-span-6 relative group w-full">
        <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <img
          className="relative w-full h-75 md:h-112.5 object-cover rounded-3xl shadow-2xl border border-white/20"
          src={college.image}
          alt={college.name}
          loading="lazy"
        />
      </div>

      {/* Content Section: Now spans 5 columns */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
          <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">
            Institution Overview
          </h3>
          <p className="text-slate-700 text-base md:text-lg leading-relaxed font-medium">
            {college.about}
          </p>
        </div>

        {/* Info Stack */}
        <div className="space-y-4">
          <div className="flex gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
              <FaPhoneAlt size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Contact
              </p>
              <p className="text-slate-900 font-bold">
                {college.phone || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
            <div className="bg-cyan-100 p-3 rounded-xl text-cyan-600">
              <FaLocationDot size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Location
              </p>
              <p className="text-slate-900 font-bold text-sm leading-tight">
                {college.locations?.address}
              </p>
            </div>
          </div>
        </div>

        {/* Compact Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() =>
              openInMaps(
                college.locations?.coordinates?.[0],
                college.locations?.coordinates?.[1]
              )
            }
            className="flex-1 flex gap-2 justify-center items-center bg-blue-600 text-white px-6 py-4 rounded-2xl hover:bg-blue-700 transition-all font-bold uppercase text-[11px] tracking-widest"
          >
            <FaDirections size={18} /> Directions
          </button>

          <Link
            to={
              college.url?.startsWith("http")
                ? college.url
                : `https://${college.url}`
            }
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex gap-2 justify-center items-center bg-slate-100 text-slate-900 px-6 py-4 rounded-2xl hover:bg-slate-200 transition-all font-bold uppercase text-[11px] tracking-widest"
          >
            <FaEarthAsia size={18} /> Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollegeDescription;
