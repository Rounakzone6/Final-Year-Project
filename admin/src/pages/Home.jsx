import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";

import AdminManage from "../components/AdminManage";
import NewAdmin from "../components/NewAdmin";

import City from "./City";
import AddCity from "../components/AddCity";

import College from "./College";
import CollegeDetails from "./CollegeDetails";
import AddCollege from "../components/AddCollege";

import Hostel from "./Hostel";
import AddHostel from "../components/AddHostel";

import Mess from "./Mess";
import AddMess from "../components/AddMess";

import Pg from "./Pg";
import AddPg from "../components/AddPg";

import OwnerList from "./OwnerList";
import OwnerDetails from "./OwnerDetails";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="bg-gray-100 w-full p-2">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/manage" element={<AdminManage />} />
            <Route path="/admin/register" element={<NewAdmin />} />
            <Route path="/city" element={<City />} />
            <Route path="/city/add" element={<AddCity />} />
            <Route path="/college" element={<College />} />
            <Route path="/college/:id" element={<CollegeDetails />} />
            <Route path="/college/add" element={<AddCollege />} />
            <Route path="/hostel" element={<Hostel />} />
            <Route path="/hostel/add" element={<AddHostel />} />
            <Route path="/pg" element={<Pg />} />
            <Route path="/pg/add" element={<AddPg />} />
            <Route path="/mess" element={<Mess />} />
            <Route path="/mess/add" element={<AddMess />} />
            <Route path="/owner" element={<OwnerList />} />
            <Route path="/owner/:id" element={<OwnerDetails />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
