import CityList from "../components/CityList";
import CollegeList from "../components/CollegeList";
import HostelList from "../components/HostelList";
import MessList from "../components/MessList";
import PgList from "../components/PgList";
// import Google from "../components/Search";

const Home = () => {
  return (
    <div>
      <CityList />
      {/* <Google /> */}
      <CollegeList />
      <HostelList />
      <PgList />
      <MessList />
    </div>
  );
};

export default Home;
