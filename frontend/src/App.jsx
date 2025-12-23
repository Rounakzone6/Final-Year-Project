import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import City from "./pages/city/City";
import College from "./pages/college/College";
import Hostel from "./pages/hostel/Hostel";
import Pg from "./pages/pg/Pg";
import Mess from "./pages/mess/Mess";
import CityDetails from "./pages/city/CityDetails";
import CollegeDetails from "./pages/college/CollegeDetails";
import HostelDetails from "./pages/hostel/HostelDetails";
import PgDetails from "./pages/pg/PgDetails";
import MessDetails from "./pages/mess/MessDetails";
import OwnerRequest from "./pages/OwnerRequest";
import CollegeInCity from "./components/college/CollegeInCity";
import CollegeDescription from "./components/college/CollegeDescription";
import HostelInCity from "./components/hostel/HostelInCity";
import HostelNearCollege from "./components/hostel/HostelNearCollege";
import PgInCity from "./components/pg/PgInCity";
import PgNearCollege from "./components/pg/PgNearCollege";
import MessInCity from "./components/mess/MessInCity";
import MessNearCollege from "./components/mess/MessNearCollege";
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
