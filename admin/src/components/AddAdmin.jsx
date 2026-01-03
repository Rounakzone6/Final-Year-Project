import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-toastify";
import { useState } from "react";

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
        { headers: `Bearer ${token}` }
      );
      if (response.data.success) {
        toast.success(response.data.success);
        setEmail("");
        setName("");
        setPassword("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form
        className="max-w-md mx-auto p-4 border rounded"
        onSubmit={onSubmitHandler}
      >
        <input
          className="w-full mb-3 p-2 border"
          onChange={() => setName(name)}
          value={name}
          type="text"
          name="name"
          placeholder="Admin name"
        />
        <input
          className="w-full mb-3 p-2 border"
          onChange={() => setEmail(email)}
          value={email}
          type="email"
          name="email"
          placeholder="Admin email"
        />
        <input
          className="w-full mb-3 p-2 border"
          onChange={() => setPassword(password)}
          value={password}
          type="password"
          name="password"
          placeholder="Admin password"
        />
        <button type="submit">{loading ? "Submiting..." : "Register"}</button>
      </form>
    </>
  );
};

export default AddAdmin;
