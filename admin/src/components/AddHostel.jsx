import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";

const AddHostel = () => {
  const { loading, setLoading, backendUrl } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    city: "",
    college: "",
    nonveg: "false",
    phone: "",
    price: "",
    lat: "",
    lng: "",
    address: "",
    img1: "",
    img2: "",
    img3: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/hostel/add`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      
      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({
          name: "",
          gender: "male",
          city: "",
          college: "",
          nonveg: "true",
          phone: "",
          price: "",
          lat: "",
          lng: "",
          address: "",
          img1: "",
          img2: "",
          img3: "",
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
        Enter Hostel Details
      </p>
      <form className="flex flex-col gap-2 " onSubmit={onSubmitHandler}>
        <input
          className="border p-2 rounded"
          name="name"
          placeholder="Hostel name"
          value={formData.name}
          onChange={onChangeHandler}
          required
        />
        <input
          className="border p-2 rounded"
          name="city"
          placeholder="City name"
          value={formData.city}
          onChange={onChangeHandler}
          required
        />
        <input
          className="border p-2 rounded"
          name="college"
          required
          placeholder="College name (Optional)"
          value={formData.college}
          onChange={onChangeHandler}
        />
        <input
          className="border p-2 rounded"
          name="phone"
          required
          placeholder="Phone"
          value={formData.phone}
          onChange={onChangeHandler}
        />
        <input
          className="border p-2 rounded"
          name="price"
          required
          placeholder="Price"
          value={formData.price}
          onChange={onChangeHandler}
        />

        {/* Coordinates Group */}
        <input
          className="border p-2 rounded"
          name="lat"
          required
          placeholder="Latitude"
          value={formData.lat}
          onChange={onChangeHandler}
        />
        <input
          className="border p-2 rounded"
          name="lng"
          required
          placeholder="Longitude"
          value={formData.lng}
          onChange={onChangeHandler}
        />

        <input
          className="border p-2 rounded"
          name="address"
          required
          placeholder="Full Address"
          value={formData.address}
          onChange={onChangeHandler}
        />
        <select
          className="border p-2 rounded"
          name="gender"
          value={formData.gender}
          onChange={onChangeHandler}
        >
          <option value="male">Boy's</option>
          <option value="female">Girl's</option>
        </select>
        <select
          className="border p-2 rounded"
          name="nonveg"
          value={formData.nonveg}
          onChange={onChangeHandler}
        >
          <option value="true">Non-Veg Available</option>
          <option value="false">Veg Only</option>
        </select>
        <input
          onChange={onChangeHandler}
          className="px-2 py-1 border outline-none rounded-md"
          type="text"
          value={formData.img1}
          name="img1"
          required
          placeholder="Image1 Url"
        />
        <input
          onChange={onChangeHandler}
          className="px-2 py-1 border outline-none rounded-md"
          type="text"
          value={formData.img2}
          name="img2"
          placeholder="Image2 Url (Optional)"
        />
        <input
          onChange={onChangeHandler}
          className="px-2 py-1 border outline-none rounded-md"
          type="text"
          value={formData.img3}
          name="img3"
          placeholder="Image3 Url (Optional)"
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

export default AddHostel;
