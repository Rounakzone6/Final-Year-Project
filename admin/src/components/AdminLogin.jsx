import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "../contexts/AppContext";

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
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <p className="text-2xl font-bold mb-4">
          {currentRole === "admin" || currentRole === ""
            ? "Admin"
            : "Super Admin"}{" "}
          Panel
        </p>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter Password"
              required
            />
          </div>
          <button
            className="my-2 w-full py-2 px-4 rounded-md text-white bg-black"
            type="submit"
          >
            Login
          </button>
          {currentRole === "admin" || currentRole === "" ? (
            <p
              onClick={() => setCurrentRole("superadmin")}
              className="cursor-pointer text-blue-500 underline font-medium"
            >
              Super Admin
            </p>
          ) : (
            <p
              onClick={() => setCurrentRole("admin")}
              className="cursor-pointer text-blue-500 underline font-medium"
            >
              Admin Login
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
