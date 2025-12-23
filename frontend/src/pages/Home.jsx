// import Google from "../components/Search";
import CityList from "../components/city/CityList";
import CollegeList from "../components/college/CollegeList";
import Feedback from "../components/Feedback";
import HostelList from "../components/hostel/HostelList";
import MessList from "../components/mess/MessList";
import PgList from "../components/pg/PgList";

const Home = () => {
  return (
    <div>
      <CityList />
      {/* <Google /> */}
      <CollegeList />
      <HostelList />
      <PgList />
      <MessList />
      <Feedback />
    </div>
  );
};

export default Home;
