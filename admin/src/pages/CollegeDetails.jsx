import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaDirections, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";
import { toast } from "react-toastify";
import { AppContext } from "../contexts/AppContext";

const CollegeDetails = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const { token, backendUrl, loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        setLoading(true);
        const response = await axios(`${backendUrl}/college/${id}`);
        if (response.data.success) {
          setCollege(response.data.college);
        }
      } catch (error) {
        console.error("Error fetching college details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [id, backendUrl, setLoading]);

  const removeCollege = async (id) => {
    if (!window.confirm("Are you sure you want to remove this college?"))
      return;
    try {
      const res = await axios.delete(`${backendUrl}/college/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success("College removed successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const editCollege = async (id) => {
    console.log(id);
  };

  const openInMaps = (lng, lat) => {
    // Standard Google Maps Link: https://www.google.com/maps?q=lat,lng
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!college)
    return <div className="p-10 text-center">College not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold capitalize">{college.name}</h1>
      <p className="text-blue-600 font-medium capitalize">
        {college.city?.name || college.city}
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <b>Contact:</b> {college.phone}
          </p>
          <p className="text-gray-700">
            <b>Address:</b> {college.locations?.address}
          </p>
          <div className="flex gap-6 text-white">
            <button
              onClick={() =>
                openInMaps(
                  college.locations.coordinates[0],
                  college.locations.coordinates[1]
                )
              }
              className="flex gap-2 items-center bg-blue-500 px-3 py-2 rounded-md"
              title="View on Maps"
            >
              <FaDirections /> <span>Directions</span>
            </button>
            <a
              href={`https://${college.url}`}
              target="_blank"
              className="flex gap-2 bg-blue-500 px-4 items-center py-2 rounded-lg"
            >
              <FaEarthAsia /> <span>Website</span>
            </a>
          </div>
          <div className="flex text-sm gap-2 text-white">
            <button
              onClick={() => editCollege(college._id)}
              className="flex gap-2 items-center bg-blue-600 px-3 py-2 rounded-md"
              title="View on Maps"
            >
              <FaPlus /> <span>Add Hostel</span>
            </button>
            <button
              onClick={() => editCollege(college._id)}
              className="flex gap-2 bg-blue-600 px-4 items-center py-2 rounded-lg"
            >
              <FaPlus /> <span>Add Flat/Rooms</span>
            </button>
            <button
              onClick={() => editCollege(college._id)}
              className="flex gap-2 bg-blue-600 px-4 items-center py-2 rounded-lg"
            >
              <FaPlus /> <span>Add Mess</span>
            </button>
          </div>
          <div className="flex gap-6 text-white">
            <button
              onClick={() => editCollege(college._id)}
              className="flex gap-2 items-center bg-blue-600 px-3 py-2 rounded-md"
              title="View on Maps"
            >
              <FaEdit /> <span>Edit</span>
            </button>
            <button
              onClick={() => removeCollege(college._id)}
              className="flex gap-2 bg-blue-600 px-4 items-center py-2 rounded-lg"
            >
              <FaTrash /> <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;
