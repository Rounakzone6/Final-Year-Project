import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "@/contexts/AppContext";

const AdminLogin = () => {
  const { backendUrl, setToken, setRole } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentRole === "admin") {
        const response = await axios.post(`${backendUrl}/admin/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          setRole(response.data.role);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/admin/super-login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          setRole(response.data.role);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong");
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-100 transition-all">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {currentRole === "superadmin" ? "Super Admin" : "Admin"} Panel
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please enter your credentials to access the dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all sm:text-sm"
                type="email"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all sm:text-sm"
                type="password"
                placeholder="********"
                required
              />
            </div>
          </div>
          <div>
            <button
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all active:scale-[0.98]"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() =>
                setCurrentRole(
                  currentRole === "superadmin" ? "admin" : "superadmin"
                )
              }
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              {currentRole === "superadmin"
                ? "Switch to Admin Login"
                : "Login as Super Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
