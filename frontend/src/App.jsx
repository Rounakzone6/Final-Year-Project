import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import City from "./pages/City";
import College from "./pages/College";
import Hostel from "./pages/Hostel";
import Pg from "./pages/Pg";
import Mess from "./pages/Mess";
import OwnerRequest from "./pages/OwnerRequest";
import CityDetails from "./pages/CityDetails";
import CollegeDetails from "./pages/CollegeDetails";
import HostelDetails from "./pages/HostelDetails";
import PgDetails from "./pages/PgDetails";
import MessDetails from "./pages/MessDetails";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CollegeDescription from "./components/CollegeDescription";
import HostelNearCollege from "./components/HostelNearCollege";
import PgNearCollege from "./components/PgNearCollege";
import MessNearCollege from "./components/MessNearCollege";
import CollegeInCity from "./components/CollegeInCity";
import HostelInCity from "./components/HostelInCity";
import PgInCity from "./components/PgInCity";
import MessInCity from "./components/MessInCity";

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owner" element={<OwnerRequest />} />
        <Route path="/city" element={<City />} />
        <Route path="/city/:id" element={<CityDetails />} />
        <Route path="/college" element={<College />}>
          <Route path="city/:id" element={<CollegeInCity />} />
        </Route>
        <Route path="/college/:id" element={<CollegeDetails />}>
          <Route index element={<CollegeDescription />} />
          <Route path="hostel" element={<HostelNearCollege />} />
          <Route path="pg" element={<PgNearCollege />} />
          <Route path="mess" element={<MessNearCollege />} />
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
