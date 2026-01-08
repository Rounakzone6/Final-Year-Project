import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AppContext from "@/contexts/AppContext";
import PlaceMap from "@/components/PlaceMap";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaUniversity,
  FaDirections,
  FaHome,
} from "react-icons/fa";
import { reviews } from "@/assets";
import Review from "@/components/Review";

const PgDetails = () => {
  const { id } = useParams();
  const [pg, setPg] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [localLoading, setLocalLoading] = useState(true);
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchPg = async () => {
      try {
        setLocalLoading(true);
        const response = await axios(`${backendUrl}/pg/${id}`);
        if (response.data.success) {
          const data = response.data.pg;
          setPg(data);
          if (data.image?.length > 0) setMainImage(data.image[0]);
        }
      } catch (error) {
        console.error("Error fetching PG details:", error);
      } finally {
        setLocalLoading(false);
      }
    };
    fetchPg();
  }, [id, backendUrl]);

  const openInMaps = (lng, lat) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  if (localLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">
          Loading PG Details...
        </p>
      </div>
    );

  if (!pg)
    return (
      <div className="p-10 text-center text-slate-500 font-bold">
        PG not found.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 mb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-4xl font-black text-slate-900 capitalize flex items-center gap-2">
          <FaHome className="text-blue-600 hidden md:block" /> {pg.name}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <FaUniversity className="text-blue-600" />{" "}
            {pg?.college?.name || "Nearby Campus"}
          </span>
          <span className="flex items-center gap-1.5 capitalize">
            <FaMapMarkerAlt className="text-red-500" /> {pg?.city?.name}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-4/3 md:aspect-video overflow-hidden rounded-4xl shadow-2xl bg-slate-100 border border-slate-100">
            <img
              className="w-full h-full object-cover transition-transform duration-700"
              src={mainImage}
              alt={pg.name}
              loading="lazy"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {pg.image?.map((item, index) => (
              <img
                key={index}
                onClick={() => setMainImage(item)}
                src={item}
                className={`w-20 h-20 md:w-24 md:h-24 min-w-20 md:min-w-24 object-cover cursor-pointer rounded-2xl border-4 transition-all ${
                  mainImage === item
                    ? "border-blue-600 scale-95"
                    : "border-transparent opacity-60"
                }`}
                alt="thumbnail"
              />
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 md:p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">
                  Monthly Rent
                </p>
                <p className="text-3xl md:text-5xl font-black text-blue-600">
                  ₹{pg.price}
                  <span className="text-sm md:text-lg font-bold text-slate-300 ml-1">
                    /mo
                  </span>
                </p>
              </div>
              <span
                className={`px-4 py-2 rounded-xl font-bold text-xs uppercase ${
                  pg.gender === "male"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-pink-50 text-pink-600"
                }`}
              >
                {pg.gender === "male" ? "♂ Boys" : "♀ Girls"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
                  Food Preference
                </p>
                <p
                  className={`text-sm font-black ${
                    pg.nonveg ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {pg.nonveg ? "Non-Vegetarian" : "Pure Veg"}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
                  Accommodation
                </p>
                <p className="text-sm font-black text-slate-700">
                  PG / Private Flat
                </p>
              </div>
            </div>

            <div className="bg-slate-50/50 p-4 rounded-2xl">
              <span className="font-bold text-slate-900 text-sm block mb-1">
                Address:
              </span>
              <p className="text-sm text-slate-500 italic leading-relaxed">
                {pg.locations?.address || pg.address}
              </p>
            </div>
          </div>

          {/* Map Section */}
          <div className="overflow-hidden shadow-inner border border-slate-100 h-48 md:h-64 rounded-4xl relative">
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-md text-[10px] font-black uppercase text-slate-600">
              Interactive Map
            </div>
            <PlaceMap
              center={{
                lng: pg.locations.coordinates[0],
                lat: pg.locations.coordinates[1],
              }}
            />
          </div>
        </div>
      </div>
      <Review reviews={reviews} />
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="hidden sm:block">
            <p className="text-xs text-gray-500 font-bold uppercase">
              Interested in this Mess?
            </p>
            <p className="font-bold text-gray-800">{pg.name}</p>
          </div>
          <div className="flex md:gap-3 gap-1 w-full sm:w-auto">
            <button
              onClick={() =>
                openInMaps(
                  pg.locations.coordinates[0],
                  pg.locations.coordinates[1]
                )
              }
              className="flex text-white justify-center gap-2 items-center bg-blue-600 md:px-6 md:py-3 px-4 py-2 rounded-2xl font-medium md:font-bold hover:bg-blue-700"
            >
              <FaDirections /> <span>Directions</span>
            </button>
            <Link
              to={`tel:${pg.phone}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-900 text-white md:px-6 md:py-3 px-4 py-2 rounded-2xl font-medium md:font-bold hover:bg-black transition-all"
            >
              <FaPhoneAlt /> Call Now
            </Link>
            <Link
              to={`https://wa.me/${pg.phone}`}
              target="_blank"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-500 text-white md:px-6 md:py-3 px-4 py-2 rounded-2xl font-medium md:font-bold hover:bg-green-600 transition-all"
            >
              <FaWhatsapp className="text-xl" /> WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgDetails;
