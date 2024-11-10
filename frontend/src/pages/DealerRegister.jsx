import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const DealerPage = () => {
  const { registerDealer } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatar: null,
    address: "",
    contact: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      avatar: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        fullName: formData.fullName,
        email: formData.email,
        avatar: formData.avatar,
        address: formData.address,
        contact: formData.contact,
      };

      await registerDealer(data);
      setSuccess("Registration successful!");
      setError(null);
      navigate("/sucess");
    } catch (err) {
      setError(err.message || "Something went wrong");
      setSuccess(null);
    }
  };

  return (
    <div className="bg-[url('https://i.pinimg.com/564x/80/d9/c0/80d9c0b74a6402241de02b16fc9df20c.jpg')] bg-cover backdrop-blur-xl flex items-center justify-center min-h-screen bg-gray-100 py-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Dealer Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Avatar</label>
            <input
              type="file"
              name="avatar"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>

        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
        {success && <div className="mt-4 text-green-600 text-center">{success}</div>}
      </div>
    </div>
  );
};

export default DealerPage;
