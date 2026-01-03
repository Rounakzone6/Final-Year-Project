import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "../contexts/AppContext";

const AddCollege = () => {
  const { loading, setLoading, backendUrl } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    about: "",
    url: "",
    lat: "",
    lng: "",
    address: "",
    image: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const res = await axios.post(`${backendUrl}/college/add`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({
          name: "",
          city: "",
          phone: "",
          about: "",
          url: "",
          lat: "",
          lng: "",
          address: "",
          image: "",
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[50%] mx-auto border rounded-2xl p-3">
      <p className="text-2xl text-center mb-4 font-medium">
        Enter College Details
      </p>
      <form className="flex flex-col gap-2 " onSubmit={onSubmitHandler}>
        <input
          className="px-2 py-1 border outline-none rounded-md"
          type="text"
          name="name"
          value={formData.name}
          placeholder="Collage Full Name"
          onChange={onChangeHandler}
        />
        <input
          className="px-2 py-1 border outline-none rounded-md"
          type="text"
          onChange={onChangeHandler}
          value={formData.city}
          name="city"
          placeholder="City Name"
        />
        <input
          className="px-2 py-1 border outline-none rounded-md"
          onChange={onChangeHandler}
          type="text"
          value={formData.phone}
          name="phone"
          placeholder="Contact information"
        />
        <input
          className="px-2 py-1 border outline-none rounded-md"
          onChange={onChangeHandler}
          type="text"
          name="url"
          value={formData.url}
          placeholder="College Url"
        />
        <textarea
          className="px-2 py-1 border outline-none rounded-md"
          onChange={onChangeHandler}
          name="about"
          placeholder="College Description"
          value={formData.about}
        />
        <input
          className="px-2 py-1 border outline-none rounded-md"
          onChange={onChangeHandler}
          type="text"
          value={formData.lat}
          name="lat"
          placeholder="Latitude"
        />
        <input
          onChange={onChangeHandler}
          className="px-2 py-1 border outline-none rounded-md"
          type="text"
          value={formData.lng}
          name="lng"
          placeholder="Lognitude"
        />
        <input
          onChange={onChangeHandler}
          className="px-2 py-1 border outline-none rounded-md"
          type="text"
          value={formData.address}
          name="address"
          placeholder="Full Address"
        />
        <input
          onChange={onChangeHandler}
          className="px-2 py-1 border outline-none rounded-md"
          type="text"
          value={formData.image}
          name="image"
          placeholder="Image Url"
        />
        <button
          disabled={loading}
          className="px-2 py-2 border bg-blue-700 text-white font-medium rounded-md"
          type="submit"
        >
          {loading ? "Submiting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddCollege;
