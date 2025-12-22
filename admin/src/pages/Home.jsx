import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AddCity from "../components/AddCity";
import City from "./City";
import AddCollege from "../components/AddCollege";
import AddMess from "../components/AddMess";
import College from "./College";
import Mess from "./Mess";
import Hostel from "./Hostel";
import Navbar from "../components/Navbar";
import NewAdmin from "../components/NewAdmin";
import AdminManage from "../components/AdminManage";
import Dashboard from "./Dashboard";
import OwnerList from "./OwnerList";
import OwnerDetails from "./OwnerDetails";
import CollegeDetails from "./CollegeDetails";
import { AppContext } from "../contexts/AppContext";
import AddPg from "../components/AddPg";
import AddHostel from "../components/AddHostel";
import Pg from "./Pg";

const Home = () => {
  const { token, setToken, role } = useContext(AppContext);
  return (
    <>
      <Navbar role={role} setToken={setToken} />
      <div className="flex w-full">
        <Sidebar role={role} />
        <div className="bg-gray-100 w-full p-2">
          <Routes>
            <Route path="/" element={<Dashboard token={token} role={role} />} />
            <Route path="/city" element={<City token={token} role={role} />} />
            <Route path="/register" element={<NewAdmin token={token} />} />
            <Route path="/owner" element={<OwnerList token={token} />} />
            <Route path="/owner/:id" element={<OwnerDetails en={token} />} />
            <Route path="/manage" element={<AdminManage token={token} />} />
            <Route path="/college" element={<College token={token} />} />
            <Route
              path="/college/:id"
              element={<CollegeDetails token={token} />}
            />
            <Route path="/mess" element={<Mess token={token} />} />
            <Route path="/hostel" element={<Hostel token={token} />} />
            <Route path="/pg" element={<Pg token={token} />} />
            <Route path="/city/add" element={<AddCity token={token} />} />
            <Route path="/college/add" element={<AddCollege />} />
            <Route path="/hostel/add" element={<AddHostel token={token} />} />
            <Route path="/pg/add" element={<AddPg token={token} />} />
            <Route path="/mess/add" element={<AddMess token={token} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
