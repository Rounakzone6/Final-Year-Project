import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import Home from "@/pages/Home";
import AdminLogin from "@/components/AdminLogin";
import AppContext from "@/contexts/AppContext";

const App = () => {
  const { token } = useContext(AppContext);

  return (
    <>
      <ToastContainer />
      {token === "" ? <AdminLogin /> : <Home />}
    </>
  );
};

export default App;
