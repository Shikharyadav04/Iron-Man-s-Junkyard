import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const DealerRegister = () => {
  const { registerDealer } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        fullName: formData.fullName,
        email: formData.email,

        address: formData.address,
        contact: formData.contact,
      };

      await registerDealer(data);
      setSuccess("Registration successful!");
      setError(null);
      navigate("/success");
    } catch (err) {
      setError(err.message || "Something went wrong");
      setSuccess(null);
    }
  };

  return (
    <div className="bg-[url('https://i.pinimg.com/originals/12/58/59/1258595725c0fb95b2255f678c1afead.gif')] bg-cover backdrop-blur-xl flex items-center justify-center min-h-screen bg-gray-100 py-20">
      <div className="bg-transparent p-8 rounded-lg shadow-md w-full max-w-md glow-text">
        <h2 className="text-2xl font-semibold text-center  mb-6">
          Dealer Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block ">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block ">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block ">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block ">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2  rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>

        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
        {success && (
          <div className="mt-4 text-green-600 text-center">{success}</div>
        )}
      </div>
    </div>
  );
};

export default DealerRegister;
