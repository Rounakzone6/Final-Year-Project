import axios from "axios";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const OwnerList = () => {
  const { backendUrl, loading, ownerList, setOwnerList, token } =
    useContext(AppContext);

  useEffect(() => {}, [token]);

  const removeowner = async (id) => {
    try {
      const res = await axios.delete(`${backendUrl}/owner/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setOwnerList((prev) => prev.filter((owner) => owner._id !== id));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-[90%] mx-auto">
      <div className="flex justify-between items-end">
        <p className="text-2xl mt-4 pb-1 border-b">Owner's Request List</p>
      </div>

      <div className="flex gap-2 flex-wrap mt-4">
        <div className="border font-medium bg-gray-700 text-white px-4 py-2 items-center rounded grid grid-cols-[1fr_4fr_1fr] w-full shadow-sm">
          <p>S. No.</p>
          <div className="flex justify-around items-center">
            <p>Owner Name</p>
            <p>Owner contact</p>
            <p>Owner</p>
          </div>
          <div></div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : ownerList.length > 0 ? (
          ownerList.map((owner, index) => (
            <div
              className="border px-4 py-2 items-start  rounded grid grid-cols-[1fr_4fr_1fr] w-full bg-white shadow-sm"
              key={owner._id}
            >
              <p>{index + 1}.</p>
              <div className="flex justify-around items-center">
                <NavLink
                  to={`/owner/${owner._id}`}
                  className="font-medium hover:underline"
                >
                  {owner.name}
                </NavLink>
                <p className="text-xs text-gray-500">{owner.contact}</p>
                <p
                  className={`text-sm ${
                    owner.verified ? "text-blue-500" : "text-red-500"
                  }`}
                >
                  {owner.verified ? "Verified" : "Unverified"}
                </p>
              </div>
              <div className="flex gap-6 items-center">
                <button
                  onClick={() => removeowner(owner._id)}
                  className="text-red-500 hover:bg-red-50 px-2 py-1 rounded text-sm transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No admins found.</p>
        )}
      </div>
    </div>
  );
};

export default OwnerList;
