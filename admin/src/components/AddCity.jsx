import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../contexts/AppContext";

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
    <form
      onSubmit={onSubmitHandler}
      className="max-w-md mx-auto p-4 border rounded"
    >
      <input
        type="text"
        placeholder="City Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-full mb-3 p-2 border"
      />
      <input
        type="text"
        placeholder="State Name"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="block w-full mb-3 p-2 border"
      />
      <input
        type="text"
        placeholder="Image Url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="block w-full mb-3 p-2 border"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 w-full disabled:bg-gray-400"
      >
        {loading ? "Adding..." : "Add City"}
      </button>
    </form>
  );
};

export default AddCity;
