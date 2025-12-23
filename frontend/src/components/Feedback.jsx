import { FaUser } from "react-icons/fa";

const Feedback = () => {
  return (
    <div className="md:p-8 p-4">
      <p className="text-3xl text-center font-bold">
        What users thinks about us
      </p>
      <div className="flex mt-6 gap-4 flex-wrap">
        <div className="w-100 bg-gray-100 p-4 rounded-2xl">
          <p className="flex gap-1 justify-center items-center">
            <FaUser /> Sweta Yadav
          </p>
          <p className="leading-4 mt-1">
            Found my perfect home away from home! Nestify made it so easy to
            find a safe and studious environment right next to my campus. Best
            PG discovery platform ever! #Nestify #CollegeLife
          </p>
        </div>
        <div className="w-100 bg-gray-100 p-4 rounded-2xl">
          <p className="flex gap-1 justify-center items-center">
            <FaUser /> Rounak Gupta
          </p>
          <p className="leading-4 mt-1">
            Found my perfect home away from home! Nestify made it so easy to
            find a safe and studious environment right next to my campus. Best
            Hostel discovery platform ever! #Nestify #CollegeLife
          </p>
        </div>
        <div className="w-100 bg-gray-100 p-4 rounded-2xl">
          <p className="flex gap-1 justify-center items-center">
            <FaUser /> Samriddhi Verma
          </p>
          <p className="leading-4 mt-1">
            Found my perfect home away from home! Nestify made it so easy to
            find a safe and studious environment right next to my campus. Best
            PG discovery platform ever! #Nestify #CollegeLife
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
