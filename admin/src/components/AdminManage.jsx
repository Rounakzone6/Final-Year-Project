import axios from "axios";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { AppContext } from "../contexts/AppContext";

const AdminManage = () => {
  const { backendUrl, token, adminList, setAdminList } = useContext(AppContext);

  const removeAdmin = async (id) => {
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
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const editAdmin = async (id) => {
    console.log(id);
  };

  return (
    <div className="w-full md:p-4 p-2">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Management</h1>
          <p className="text-gray-500 text-xs">
            View and manage all registered admins
          </p>
        </div>
        <NavLink
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold transition-all shadow-md flex items-center gap-2"
          to="/admin/register"
        >
          <FaPlus /> Add Admin
        </NavLink>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_3fr_1fr_1fr] bg-gray-50 border-b border-gray-200 px-4 py-3 text-sm font-bold text-gray-600 uppercase tracking-wider">
          <p>S.No</p>
          <p>Admin Name</p>
          <p>Admin Email</p>
          <p>Edit</p>
          <p>Delete</p>
        </div>
        {adminList.length > 0 ? (
          adminList.map((admin, index) => (
            <div
              className="md:grid grid-cols-[0.5fr_2fr_3fr_1fr_1fr] px-4 py-1 border-b border-gray-100 items-center hover:bg-blue-50/30 transition-colors"
              key={admin._id}
            >
              <p className="font-medium text-gray-400">#{index + 1}</p>
              <p className="font-medium">{admin.name}</p>
              <p className="text-xs text-gray-500">{admin.email}</p>
              <button
                onClick={() => editAdmin(admin._id)}
                className="text-blue-500 hover:bg-red-50 px-2 py-1 rounded text-sm transition-colors"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => removeAdmin(admin._id)}
                className="text-red-500 hover:bg-red-50 px-2 py-1 rounded text-sm transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p>No admins found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminManage;
