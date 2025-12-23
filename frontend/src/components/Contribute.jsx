import axios from "axios";
import { useContext, useState } from "react";
import { FaX } from "react-icons/fa6";
import { toast } from "react-toastify";
import AppContext from "../contexts/AppContext";

const Contribute = ({ setContributing }) => {
  const [type, setType] = useState("College");
  const [active, setActive] = useState("College");
  const { backendUrl } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    contact: "",
    about: "",
    url: "",
    lat: "",
    lng: "",
    address: "",
    image: "",
  });

  const items = ["College", "Hostel", "PG/Flat", "Canteen/Mess"];

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (type === "College") {
      try {
        const response = await axios.post(
          `${backendUrl}/college/add`,
          formData
        );
        console.log(response);
      } catch (error) {
        toast.error(error.message);
      }
    } else if (type === "Canteen/Mess") {
      const response = await axios.post(`${backendUrl}/mess/add`, formData);
      console.log(response);
    } else {
      let response;
      if (type === "hostel") {
        response = await axios.post(`${backendUrl}/hostel/add`, formData);
      } else {
        response = await axios.post(`${backendUrl}/pg/add`, formData);
      }
      console.log(response);
    }
  };

  return (
    <div className="bg-black/60 relative h-screen w-screen md:w-316">
      <div className="md:w-150 md:left-80 w-100 left-3 bg-white absolute md:top-1 top-5 rounded-2xl">
        <div className="flex justify-between items-center px-5 md:px-10">
          <p></p>
          <p className="text-2xl font-semibold text-center my-4">
            Contribute to us
          </p>
          <FaX
            className="text-2xl font-medium cursor-pointer"
            onClick={() => setContributing(false)}
          />
        </div>
        <ul className="flex md:gap-4 gap-2 justify-center items-center">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setType(`${item}`), setActive(`${item}`);
              }}
              className={`md:px-4 md:py-2 px-3 py-2 font-medium rounded-2xl cursor-pointer text-white font-meduim ${
                active === `${item}` ? "bg-blue-600" : "bg-blue-400"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
        <form
          onSubmit={onSubmitHandler}
          className="flex md:px-8 py-4 px-4 flex-col gap-2"
        >
          <input
            className="px-4 py-2 outline-none rounded-md shadow-md bg-gray-200"
            type="text"
            name={`${type}`}
            placeholder={`${type} Name`}
          />
          <div className="flex items-center justify-between">
            <input
              onChange={onChangeHandler}
              className={`${
                type === "College" || type === "Canteen/Mess"
                  ? "w-full"
                  : "md:w-90 w-60"
              } px-4 py-2 outline-none rounded-md shadow-md bg-gray-200`}
              type="text"
              name={`${type}`}
              placeholder="City Name"
            />
            {type === "Hostel" || type === "PG/Flat" ? (
              <select
                name="gender"
                className="bg-gray-200 rounded-md px-4 py-2"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : null}
          </div>
          <input
            className="px-4 py-2 outline-none rounded-md shadow-md bg-gray-200"
            type="text"
            name={`${type === "College" ? "contact" : "phone"}`}
            placeholder={`Phone Number`}
          />
          {type !== "College" ? (
            <>
              <input
                type="text"
                name="college"
                placeholder="College Name"
                className="px-4 py-2 outline-none rounded-md shadow-md bg-gray-200"
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                className="px-4 py-2 outline-none rounded-md shadow-md bg-gray-200"
              />
            </>
          ) : null}
          {type === "College" ? (
            <textarea
              name="about"
              className="px-4 py-2 outline-none rounded-md shadow-md bg-gray-200"
              placeholder="College Description"
            ></textarea>
          ) : null}
          <input
            className="px-4 py-2 outline-none rounded-md shadow-md bg-gray-200"
            type="text"
            name="lat"
            placeholder="Latitude"
          />
          <input
            className="px-4 py-2 outline-none rounded-md shadow-md bg-gray-200"
            type="text"
            name="lng"
            placeholder="Longitude"
          />
          <input
            className="px-4 py-2 outline-none rounded-md shadow-md bg-gray-200"
            type="text"
            name="address"
            placeholder="Full Addresss"
          />
          <input type="file" name="image" />
          <button
            className="md:px-4 md:py-2 px-2 py-1 outline-none rounded-xl cursor-pointer font-medium text-white bg-blue-600"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contribute;
