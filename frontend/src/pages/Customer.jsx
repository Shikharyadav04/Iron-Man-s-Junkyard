import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const categorySubcategoryMap = {
  Metals: ["Aluminum", "Copper", "Steel", "Brass"],
  Plastics: ["PET", "HDPE", "PVC", "LDPE"],
  Electronics: [
    "Laptops",
    "Desktops",
    "Computer Accessories",
    "Smartphones",
    "Tablets",
  ],
  Glass: ["Bottles", "Windows", "Jars"],
  Paper: ["Office Paper", "Cardboard Boxes", "Newspaper"],
};

const Customer = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    avatar: "",
  });

  const [scrapRequest, setScrapRequest] = useState({
    scraps: [{ category: "", subCategory: "", quantity: 0 }],
    pickupLocation: "",
    scheduledPickupDate: "",
    condition: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [passwordFormOpen, setPasswordFormOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [oldPassword, setOldPassword] = useState(""); // State for old password
  const [newPassword, setNewPassword] = useState(""); // State for new password

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserData({
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar || "",
      });
      setLoading(false);
    } else {
      setError("User not found");
      setLoading(false);
    }
  }, [user]);

  const handleScrapChange = (index, event) => {
    const { name, value } = event.target;
    const newScraps = [...scrapRequest.scraps];
    newScraps[index][name] = value;
    setScrapRequest({ ...scrapRequest, scraps: newScraps });
  };

  const handleAddScrap = () => {
    setScrapRequest({
      ...scrapRequest,
      scraps: [
        ...scrapRequest.scraps,
        { category: "", subCategory: "", quantity: 0 },
      ],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    const payload = {
      scraps: scrapRequest.scraps.filter(
        (scrap) => scrap.category && scrap.subCategory && scrap.quantity > 0
      ),
      pickupLocation: scrapRequest.pickupLocation,
      scheduledPickupDate: scrapRequest.scheduledPickupDate,
      condition: scrapRequest.condition,
      userId: localStorage.getItem("userId"),
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/request/request-creation",
        JSON.stringify(payload), // Updated to stringify the payload
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccessMessage("Request created successfully!");
      navigate(`/payment/${response.data.requestId}`, {
        state: { amount: 100, requestId: response.data.requestId },
      });

      // Reset the scrap request form
      setScrapRequest({
        scraps: [{ category: "", subCategory: "", quantity: 0 }],
        pickupLocation: "",
        scheduledPickupDate: "",
        condition: "",
      });
      setIsFormOpen(false);
    } catch (error) {
      setError(error.response?.data.message || "An error occurred while submitting the request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUserDetails = async (event) => {
    event.preventDefault();
    const payload = {
      fullName: userData.fullName,
      email: userData.email,
    };

    try {
      const response = await axios.patch(
        "http://localhost:8000/api/v1/users/update-account",
        JSON.stringify(payload), // Updated to stringify the payload
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUserData(response.data.data);
      setSuccessMessage("User details updated successfully!");
    } catch (error) {
      setError(error.response?.data.message || "An error occurred while updating user details.");
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    const payload = {
      oldPassword,
      newPassword,
    };

    try {
      const response = await axios.patch(
        "http://localhost:8000/api/v1/users/change-password",
        JSON.stringify(payload), // Updated to stringify the payload
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccessMessage("Password changed successfully!");
      // Reset password fields after successful change
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setError(error.response?.data.message || "An error occurred while changing the password.");
    }
  };

  const handleAvatarUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const response = await axios.patch(
        "http://localhost:8000/api/v1/users/avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUserData(response.data.data);
      setSuccessMessage("Avatar updated successfully!");
    } catch (error) {
      setError(error.response?.data.message || "An error occurred while updating the avatar.");
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto w-full">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={userData.avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-2 border-indigo-600"
        />
        <div>
          <h1 className="text-2xl font-semibold">{userData.fullName}</h1>
          <p className="text-gray-600">{userData.email}</p>
        </div>
      </div>
      {successMessage && (
        <div className="text-green-600 mb-4">{successMessage}</div>
      )}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="mb-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-full"
      >
        {isFormOpen ? "Close Request Form" : "Create Scrap Request"}
      </button>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          {scrapRequest.scraps.map((scrap, index) => (
            <div key={index} className="flex space-x-2">
              <select
                name="category"
                value={scrap.category}
                onChange={(event) => handleScrapChange(index, event)}
                className="p-2 border rounded w-full"
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                {Object.keys(categorySubcategoryMap).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                name="subCategory"
                value={scrap.subCategory}
                onChange={(event) => handleScrapChange(index, event)}
                className="p-2 border rounded w-full"
                disabled={!scrap.category}
                required
              >
                <option value="" disabled>
                  Select SubCategory
                </option>
                {scrap.category &&
                  categorySubcategoryMap[scrap.category].map((subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
              </select>
              <input
                type="number"
                name="quantity"
                value={scrap.quantity}
                onChange={(event) => handleScrapChange(index, event)}
                placeholder="Quantity"
                className="p-2 border rounded w-20"
                required
              />
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleAddScrap}
              className="mt-4 py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
            >
              Add More Scrap
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-4 py-2 px-4 ${
                isSubmitting ? "bg-gray-400" : "bg-blue-600"
              } text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200`}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
          <div>
            <label className="block mt-4">Pickup Location:</label>
            <input
              type="text"
              value={scrapRequest.pickupLocation}
              onChange={(e) =>
                setScrapRequest({
                  ...scrapRequest,
                  pickupLocation: e.target.value,
                })
              }
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block mt-4">Scheduled Pickup Date:</label>
            <input
              type="date"
              value={scrapRequest.scheduledPickupDate}
              onChange={(e) =>
                setScrapRequest({
                  ...scrapRequest,
                  scheduledPickupDate: e.target.value,
                })
              }
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block mt-4">Condition:</label>
            <textarea
              value={scrapRequest.condition}
              onChange={(e) =>
                setScrapRequest({
                  ...scrapRequest,
                  condition: e.target.value,
                })
              }
              required
              className="p-2 border rounded w-full"
            ></textarea>
          </div>
        </form>
      )}

      <button
        onClick={() => setUpdateFormOpen(!updateFormOpen)}
        className="mb-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-full"
      >
        {updateFormOpen ? "Close Update Form" : "Update User Details"}
      </button>

      {updateFormOpen && (
        <form onSubmit={handleUpdateUserDetails} className="space-y-4 w-full">
          <div>
            <label className="block">Full Name:</label>
            <input
              type="text"
              value={userData.fullName}
              onChange={(e) =>
                setUserData({ ...userData, fullName: e.target.value })
              }
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block">Email:</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-full"
          >
            Update Details
          </button>
        </form>
      )}

      <button
        onClick={() => setPasswordFormOpen(!passwordFormOpen)}
        className="mb-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-full"
      >
        {passwordFormOpen ? "Close Password Form" : "Change Password"}
      </button>

      {passwordFormOpen && (
        <form onSubmit={handleChangePassword} className="space-y-4 w-full">
          <div>
            <label className="block">Old Password:</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block">New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-full"
          >
            Change Password
          </button>
        </form>
      )}

      <form onSubmit={handleAvatarUpload} className="space-y-4 w-full">
        <div>
          <label className="block">Upload Avatar:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            required
            className="p-2 border rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-full"
        >
          Upload Avatar
        </button>
      </form>
    </div>
  );
};

export default Customer;
