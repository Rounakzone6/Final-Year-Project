import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "@/contexts/AppContext";

const AddAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, backendUrl, loading, setLoading } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/admin/register`,
        { name, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setEmail("");
        setName("");
        setPassword("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Add New Admin</h2>
          <p className="text-gray-500 text-sm">
            Create a new administrative account for the system.
          </p>
        </div>

        <form className="space-y-5" onSubmit={onSubmitHandler}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition-all"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="admin@college.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="********"
              required
            />
          </div>
          <button
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all active:scale-95 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
            type="submit"
          >
            {loading ? "Registering..." : "Add Admin Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
