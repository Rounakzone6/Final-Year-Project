import CityList from "../components/CityList";
import CollegeInCity from "../components/CollegeInCity";
import HostelInCity from "../components/HostelInCity";
import MessInCity from "../components/MessInCity";
import PgInCity from "../components/PgInCity";

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
