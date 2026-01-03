import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "@/contexts/AppContext";
import {
  FaUserShield,
  FaPhoneAlt,
  FaTrashAlt,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const OwnerList = () => {
  const { backendUrl, loading, ownerList, setOwnerList, token } =
    useContext(AppContext);

  const removeowner = async (id) => {
    if (
      !window.confirm("Are you sure you want to remove this owner's request?")
    )
      return;

    try {
      const res = await axios.delete(`${backendUrl}/owner/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success(res.data.message || "Owner removed successfully");
        setOwnerList((prev) => prev.filter((owner) => owner._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <FaUserShield className="text-blue-600 shrink-0" /> Owner's Request
          List
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Review and manage property owner verification requests.
        </p>
      </div>
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="hidden md:grid grid-cols-[0.7fr_3fr_2fr_2fr_1fr] bg-slate-50/50 border-b border-slate-100 px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <p>S.No</p>
          <p>Owner Name</p>
          <p>Contact Info</p>
          <p>Verification Status</p>
          <p className="text-right">Manage</p>
        </div>

        {loading ? (
          <div className="p-20 text-center flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-slate-400 font-medium">
              Fetching owner requests...
            </p>
          </div>
        ) : ownerList.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {ownerList.map((owner, index) => (
              <div
                key={owner._id}
                className="flex flex-col md:grid md:grid-cols-[0.7fr_3fr_2fr_2fr_1fr] px-5 py-3 md:px-8 md:py-1 items-start md:items-center hover:bg-slate-50/30 transition-colors"
              >
                <p className="hidden md:block font-bold text-slate-300">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="w-full flex justify-between items-start md:block">
                  <div className="flex flex-col min-w-0 flex-1">
                    <NavLink
                      to={`/owner/${owner._id}`}
                      className="text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors leading-tight line-clamp-1"
                    >
                      {owner.name}
                    </NavLink>
                    <span className="md:hidden text-[10px] text-slate-400 uppercase font-black mt-1">
                      Verification Request
                    </span>
                  </div>
                  <button
                    onClick={() => removeowner(owner._id)}
                    className="md:hidden p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-3 text-slate-600 mt-4 md:mt-0">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                    <FaPhoneAlt size={12} />
                  </div>
                  <p className="text-sm font-semibold">{owner.phone}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="md:hidden text-[10px] font-black text-slate-300 uppercase block mb-1.5">
                    Status
                  </span>
                  {owner.verified ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 md:py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold ring-1 ring-emerald-100">
                      <FaCheckCircle size={12} /> Verified
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 md:py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold ring-1 ring-amber-100">
                      <FaExclamationCircle size={12} /> Pending Review
                    </div>
                  )}
                </div>
                <div className="hidden md:flex justify-end">
                  <button
                    onClick={() => removeowner(owner._id)}
                    className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    title="Remove Request"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-20 text-center text-slate-400 italic">
            No owner requests found in the database.
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerList;
