import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import Home from "@/pages/Home";
import AdminLogin from "@/components/AdminLogin";
import AppContext from "@/contexts/AppContext";

const App = () => {
  const { token } = useContext(AppContext);

  return (
    <>
      <Toaster />
      {token === "" ? <AdminLogin /> : <Home />}
    </>
  );
};

export default App;
