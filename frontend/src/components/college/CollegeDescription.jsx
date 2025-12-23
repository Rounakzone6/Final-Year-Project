import { Link, useOutletContext } from "react-router-dom";
import { FaDirections } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";

const CollegeDescription = () => {
  const { college } = useOutletContext();

  const openInMaps = (lng, lat) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img
        src={college.image}
        alt={college.name}
        className="w-full h-64 object-cover rounded-xl shadow-lg"
      />
      <div className="space-y-4">
        <p className="text-gray-700">
          <b>About:</b> {college.about}
        </p>
        <p className="text-gray-700">
          <b>Contact:</b> {college.contact}
        </p>
        <p className="text-gray-700">
          <b>Address:</b> {college.locations?.address}
        </p>

        <div className="flex gap-6 text-white pt-2">
          <button
            onClick={() =>
              openInMaps(
                college.locations.coordinates[0],
                college.locations.coordinates[1]
              )
            }
            className="flex gap-2 items-center bg-blue-600 px-3 py-2 rounded-md hover:bg-blue-700"
          >
            <FaDirections /> <span>Directions</span>
          </button>
          <Link
            to={`https://${college.url}`}
            target="_blank"
            rel="noreferrer"
            className="flex gap-2 bg-blue-600 px-4 items-center py-2 rounded-lg hover:bg-blue-700"
          >
            <FaEarthAsia /> <span>Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollegeDescription;
