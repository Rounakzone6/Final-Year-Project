import CityList from "../../components/city/CityList";
import CollegeInCity from "../../components/college/CollegeInCity";
import HostelInCity from "../../components/hostel/HostelInCity";
import MessInCity from "../../components/mess/MessInCity";
import PgInCity from "../../components/pg/PgInCity";

const CityDetails = () => {
  return (
    <>
      <CityList />
      <CollegeInCity />
      <HostelInCity />
      <PgInCity />
      <MessInCity />
    </>
  );
};

export default CityDetails;
