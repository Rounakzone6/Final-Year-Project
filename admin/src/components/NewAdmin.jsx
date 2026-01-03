import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { FaUserPlus, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";
import axios from "axios";
import AppContext from "@/contexts/AppContext";

const NewAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { token, backendUrl, loading, setLoading } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/admin/register`,
        { name, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(
          response.data.message || "Admin registered successfully!"
        );
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl shadow-slate-200 rounded-3xl border border-slate-100 p-8 w-full max-w-md transition-all">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200 mb-4">
            <FaUserPlus size={28} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Register Admin
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Create a new moderator account for the platform.
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-300"
              type="text"
              placeholder="e.g. John Doe"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-300"
              type="email"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Security Password
            </label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-300"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100 mb-2">
            <FaShieldAlt className="text-amber-500 mt-0.5" size={14} />
            <p className="text-[10px] text-amber-700 leading-tight">
              Registering a new admin gives them access to manage core database
              entities. Ensure the email belongs to an authorized staff member.
            </p>
          </div>

          <button
            className={`w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all active:scale-[0.98] ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-slate-900 hover:bg-black hover:shadow-slate-200"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Confirm Registration"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAdmin;
