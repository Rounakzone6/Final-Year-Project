import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus, FaTrash, FaEdit, FaUserShield } from "react-icons/fa";
import axios from "axios";
import AppContext from "@/contexts/AppContext";

const AdminManage = () => {
  const { backendUrl, token, adminList, setAdminList } = useContext(AppContext);

  const removeAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to remove this administrator?"))
      return;

    try {
      const response = await axios.delete(`${backendUrl}/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setAdminList((prev) => prev.filter((admin) => admin._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete admin");
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <FaUserShield className="text-blue-600" /> Admin Management
          </h1>
          <p className="text-slate-500 mt-1">
            Control access levels and manage platform moderators.
          </p>
        </div>
        <NavLink
          className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-slate-200 flex items-center gap-2 active:scale-95"
          to="/admin/register"
        >
          <FaPlus /> Add New Admin
        </NavLink>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Table Header - Visible on Desktop */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_3fr_1fr] bg-slate-50 border-b border-slate-100 px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">
          <p>S.No</p>
          <p>Admin Details</p>
          <p>Email Address</p>
          <p className="text-center">Actions</p>
        </div>

        {adminList && adminList.length > 0 ? (
          <div className="divide-y divide-slate-50">
            {adminList.map((admin, index) => (
              <div
                key={admin._id}
                className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr_3fr_1fr] px-8 py-2 items-center hover:bg-slate-50/50 transition-colors group"
              >
                <p className="hidden md:block font-bold text-slate-300">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    {admin.name.charAt(0).toUpperCase()}
                  </div>
                  <p className="font-bold text-slate-800">{admin.name}</p>
                </div>
                <p className="text-slate-500 text-sm mt-1 md:mt-0">
                  {admin.email}
                </p>
                <div className="flex justify-end md:justify-center items-center gap-2 mt-4 md:mt-0">
                  <button
                    onClick={() => toast.info("Edit feature coming soon")}
                    className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Edit Admin"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => removeAdmin(admin._id)}
                    className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete Admin"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-300 mb-4">
              <FaUserShield size={32} />
            </div>
            <p className="text-slate-400 font-medium">
              No administrators found in the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManage;
