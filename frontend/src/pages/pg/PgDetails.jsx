import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppContext from "@/contexts/AppContext";
import PlaceMap from "@/components/PlaceMap";

const PgDetails = () => {
  const { id } = useParams();
  const [pg, setPg] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const { backendUrl, loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    const fetchpg = async () => {
      try {
        setLoading(true);
        const response = await axios(`${backendUrl}/pg/${id}`);
        if (response.data.success) {
          const data = response.data.pg;
          setPg(data);
          if (data.image && data.image.length > 0) {
            setMainImage(data.image[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching pg details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchpg();
  }, [id, backendUrl, setLoading]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!pg) return <div className="p-10 text-center">pg not found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col-reverse md:flex-row gap-3 md:w-1/2">
          <div className="flex md:flex-col overflow-x-auto gap-2 md:w-24">
            {pg.image?.map((item, index) => (
              <img
                onClick={() => setMainImage(item)}
                src={item}
                key={index}
                className={`w-20 h-20 object-cover cursor-pointer rounded-lg border-2 ${
                  mainImage === item ? "border-blue-600" : "border-transparent"
                }`}
                alt="thumbnail"
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              className="w-full h-100 object-cover rounded-2xl shadow-lg"
              src={mainImage}
              alt={pg.name}
            />
          </div>
        </div>

        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold capitalize">{pg.name}</h1>
          <p className="text-gray-500 mt-2">{pg.address}</p>
          <div className="mt-4 flex items-center gap-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
              ₹{pg.price}/mo
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-bold ${
                pg.nonveg
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {pg.nonveg ? "Non-Veg" : "Pure Veg"}
            </span>
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
  );
};

export default PgDetails;
