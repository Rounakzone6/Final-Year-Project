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
import AddPg from "../components/AddPg";
import AddHostel from "../components/AddHostel";
import Pg from "./Pg";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        <div className="bg-gray-100 w-full p-2">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/city" element={<City />} />
            <Route path="/admin/register" element={<NewAdmin />} />
            <Route path="/owner" element={<OwnerList />} />
            <Route path="/owner/:id" element={<OwnerDetails />} />
            <Route path="/manage" element={<AdminManage />} />
            <Route path="/college" element={<College />} />
            <Route path="/college/:id" element={<CollegeDetails />} />
            <Route path="/mess" element={<Mess />} />
            <Route path="/hostel" element={<Hostel />} />
            <Route path="/pg" element={<Pg />} />
            <Route path="/city/add" element={<AddCity />} />
            <Route path="/college/add" element={<AddCollege />} />
            <Route path="/hostel/add" element={<AddHostel />} />
            <Route path="/pg/add" element={<AddPg />} />
            <Route path="/mess/add" element={<AddMess />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
