import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import City from "./pages/city/City";
import CityDetails from "./pages/city/CityDetails";

import College from "./pages/college/College";
import CollegeDetails from "./pages/college/CollegeDetails";
import CollegeDescription from "./components/college/CollegeDescription";
import CollegeInCity from "./components/college/CollegeInCity";

import Hostel from "./pages/hostel/Hostel";
import HostelDetails from "./pages/hostel/HostelDetails";
import HostelInCity from "./components/hostel/HostelInCity";
import HostelNearCollege from "./components/hostel/HostelNearCollege";

import Pg from "./pages/pg/Pg";
import PgDetails from "./pages/pg/PgDetails";
import PgInCity from "./components/pg/PgInCity";
import PgNearCollege from "./components/pg/PgNearCollege";

import Mess from "./pages/mess/Mess";
import MessDetails from "./pages/mess/MessDetails";
import MessInCity from "./components/mess/MessInCity";
import MessNearCollege from "./components/mess/MessNearCollege";

import OwnerRequest from "./pages/OwnerRequest";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owner" element={<OwnerRequest />} />
        <Route path="/city" element={<City />}>
          <Route path=":id" element={<CityDetails />} />
        </Route>
        <Route path="/college" element={<College />}>
          <Route path=":id" element={<CollegeDetails />}>
            <Route index element={<CollegeDescription />} />
            <Route path="hostel" element={<HostelNearCollege />} />
            <Route path="pg" element={<PgNearCollege />} />
            <Route path="mess" element={<MessNearCollege />} />
          </Route>
          <Route path="city/:id" element={<CollegeInCity />} />
        </Route>
        <Route path="/hostel" element={<Hostel />}>
          <Route path=":id" element={<HostelDetails />} />
          <Route path="city/:id" element={<HostelInCity />} />
        </Route>
        <Route path="/pg" element={<Pg />}>
          <Route path=":id" element={<PgDetails />} />
          <Route path="city/:id" element={<PgInCity />} />
        </Route>
        <Route path="/mess" element={<Mess />}>
          <Route path=":id" element={<MessDetails />} />
          <Route path="city/:id" element={<MessInCity />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
