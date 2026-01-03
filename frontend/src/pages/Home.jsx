// import Google from "../components/Search";
import CityList from "../components/city/CityList";
import CollegeList from "../components/college/CollegeList";
import HostelList from "../components/hostel/HostelList";
import PgList from "../components/pg/PgList";
import MessList from "../components/mess/MessList";
import Feedback from "../components/Feedback";

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
