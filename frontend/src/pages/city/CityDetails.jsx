import CityList from "@/components/city/CityList";
import CollegeInCity from "@/components/college/CollegeInCity";
import HostelInCity from "@/components/hostel/HostelInCity";
import PgInCity from "@/components/pg/PgInCity";
import MessInCity from "@/components/mess/MessInCity";

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
