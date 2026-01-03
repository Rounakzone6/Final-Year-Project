import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "@/contexts/AppContext";

const AddCity = () => {
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [image, setImage] = useState("");

  const { loading, setLoading, backendUrl, token } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!name || !image || !state) {
      return toast.error("Missing Details");
    }
    try {
      setLoading(true);

      const res = await axios.post(
        `${backendUrl}/city/add`,
        { name, state, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("City added successfully");
        setName("");
        setState("");
        setImage("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Add New City</h2>
          <p className="text-gray-500 text-sm">
            Register a new location for colleges, hostels, and PGs.
          </p>
        </div>

        <form className="space-y-5" onSubmit={onSubmitHandler}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              City Name
            </label>
            <input
              type="text"
              placeholder="e.g. Mumbai"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              State Name
            </label>
            <input
              type="text"
              placeholder="e.g. Maharashtra"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              placeholder="https://cloudinary.com/..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all active:scale-95 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Adding City..." : "Add City"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCity;
