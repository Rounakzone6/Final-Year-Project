import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../contexts/AppContext";

const AddMess = () => {
  const { loading, setLoading, backendUrl } = useContext(AppContext);

  // const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
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

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const onImageChange = (e) => {
  //   if (e.target.files) {
  //     setImages(Array.from(e.target.files));
  //   }
  // };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // const data = new FormData();

      // Object.keys(formData).forEach((key) => {
      //   data.append(key, formData[key]);
      // });

      // if (images.length > 0) {
      //   images.forEach((file) => {
      //     data.append("image", file);
      //   });
      // } else {
      //   toast.error("Please upload at least one image");
      //   setLoading(false);
      //   return;
      // }

      const res = await axios.post(`${backendUrl}/mess/add`, formData);
      // const res = await axios.post(`${backendUrl}/mess/add`, formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({
          name: "",
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
        // setImages([]);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New mess</h2>
      <form
        onSubmit={onSubmitHandler}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          className="border p-2 rounded"
          name="name"
          placeholder="Mess name"
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
          placeholder="College name (Optional)"
          value={formData.college}
          onChange={onChangeHandler}
        />
        <input
          className="border p-2 rounded"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={onChangeHandler}
        />
        <input
          className="border p-2 rounded"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={onChangeHandler}
        />

        {/* Coordinates Group */}
        <input
          className="border p-2 rounded"
          name="lat"
          placeholder="Latitude"
          value={formData.lat}
          onChange={onChangeHandler}
        />
        <input
          className="border p-2 rounded"
          name="lng"
          placeholder="Longitude"
          value={formData.lng}
          onChange={onChangeHandler}
        />

        {/* Address and Select should be full width or fit the grid */}
        <input
          className="border p-2 rounded"
          name="address"
          placeholder="Full Address"
          value={formData.address}
          onChange={onChangeHandler}
        />

        <select
          className="border p-2 rounded"
          name="nonveg"
          value={formData.nonveg}
          onChange={onChangeHandler}
        >
          <option value="true">Non-Veg Available</option>
          <option value="false">Veg Only</option>
        </select>
        {/* <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium">
            Upload Images (Multiple)
          </label>
          <input
            type="file"
            multiple
            onChange={onImageChange}
            className="border p-2"
            accept="image/*"
          />
          <div className="flex gap-2 mt-2">
            {images.map((img, index) => (
              <p key={index} className="text-xs text-blue-500">
                {img.name}
              </p>
            ))}
          </div>
        </div> */}
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
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Add Hostel"}
        </button>
      </form>
    </div>
  );
};

export default AddMess;
