import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "@/contexts/AppContext";

const OwnerRequest = () => {
  const location = useLocation();
  console.log(location);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { loading, setLoading, backendUrl } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      return toast.error("Missing Details");
    }
    try {
      setLoading(true);
      const res = await axios.post(`${backendUrl}/owner/request`, {
        name,
        phone,
      });

      if (res.data.success) {
        toast.success("Request Sent");
        setName("");
        setPhone("");
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
        placeholder="Owner Name"
        value={name}
        name="name"
        onChange={(e) => setName(e.target.value)}
        className="block w-full mb-3 p-2 border"
      />
      <input
        type="text"
        name="phone"
        placeholder="phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="block w-full mb-3 p-2 border"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 w-full disabled:bg-gray-400"
      >
        {loading ? "Sending..." : "Send Request"}
      </button>
    </form>
  );
};

export default OwnerRequest;
