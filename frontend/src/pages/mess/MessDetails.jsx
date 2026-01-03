import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AppContext from "@/contexts/AppContext";
import PlaceMap from "@/components/PlaceMap";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaDirections,
  FaGraduationCap,
} from "react-icons/fa";

const MessDetails = () => {
  const { id } = useParams();
  const [mess, setMess] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const { backendUrl } = useContext(AppContext);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const fetchMess = async () => {
      try {
        setLocalLoading(true);
        const response = await axios(`${backendUrl}/mess/${id}`);
        if (response.data.success) {
          const data = response.data.mess;
          setMess(data);
          if (data.image && data.image.length > 0) {
            setMainImage(data.image[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching mess details:", error);
      } finally {
        setLocalLoading(false);
      }
    };
    fetchMess();
  }, [id, backendUrl]);

  const openInMaps = (lng, lat) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  if (localLoading)
    return (
      <div className="p-20 text-center animate-pulse text-gray-500">
        Loading Canteens/Mess Details...
      </div>
    );
  if (!mess)
    return <div className="p-10 text-center">Canteens/Mess not found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 mb-20">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 capitalize flex items-center gap-2">
          {mess.name}
        </h1>
        <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
          <span className="flex items-center gap-1">
            <FaGraduationCap className="text-blue-600" /> {mess?.college?.name}
          </span>
          <span className="flex capitalize items-center gap-1">
            <FaMapMarkerAlt className="text-red-500" /> {mess?.city?.name}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl shadow-2xl bg-gray-100">
            <img
              className="w-full h-112.5 object-cover hover:scale-105 transition-transform duration-700"
              src={mainImage}
              alt={mess.name}
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {mess.image?.map((item, index) => (
              <img
                key={index}
                onClick={() => setMainImage(item)}
                src={item}
                className={`w-24 h-24 min-w-24 object-cover cursor-pointer rounded-xl border-4 transition-all ${
                  mainImage === item
                    ? "border-blue-600 scale-95"
                    : "border-transparent opacity-70"
                }`}
                alt="thumbnail"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">
                  Monthly Rent
                </p>
                <p className="text-4xl font-black text-blue-600">
                  ₹{mess.price}
                  <span className="text-lg font-normal text-gray-500">/mo</span>
                </p>
              </div>
              <p className="px-4 py-2 rounded-2xl font-medium bg-gray-300">
                Both Boy's and Girl's are allowed
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-xs text-gray-500">Food Preference</p>
                <p
                  className={`font-bold ${
                    mess.nonveg ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {mess.nonveg ? "Non-Vegetarian" : "Pure Vegetarian"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-xs text-gray-500">Contact Person</p>
                <p className="font-bold text-gray-800">Owner/Manager</p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              <span className="font-bold block text-gray-900">Address:</span>
              {mess.locations?.address || mess.address}
            </p>
          </div>

          <div className="overflow-hidden shadow-inner border border-gray-100 h-50 rounded-3xl relative">
            <div className="absolute top-4 left-4 z-10 bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold">
              Explore Surroundings
            </div>
            <PlaceMap
              center={{
                lng: mess.locations.coordinates[0],
                lat: mess.locations.coordinates[1],
              }}
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="hidden sm:block">
            <p className="text-xs text-gray-500 font-bold uppercase">
              Interested in this Mess?
            </p>
            <p className="font-bold text-gray-800">{mess.name}</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={() =>
                openInMaps(
                  mess.locations.coordinates[0],
                  mess.locations.coordinates[1]
                )
              }
              className="flex text-white justify-center gap-2 items-center bg-blue-600 px-6 py-3 rounded-2xl font-bold hover:bg-blue-700"
            >
              <FaDirections /> <span>Directions</span>
            </button>
            <Link
              to={`tel:${mess.phone}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-black transition-all"
            >
              <FaPhoneAlt /> Call Now
            </Link>
            <Link
              to={`https://wa.me/${mess.phone}`}
              target="_blank"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-600 transition-all"
            >
              <FaWhatsapp className="text-xl" /> WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessDetails;
