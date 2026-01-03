import { ToastContainer } from "react-toastify";
import AdminLogin from "./components/AdminLogin";
import Home from "./pages/Home";
import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";

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
