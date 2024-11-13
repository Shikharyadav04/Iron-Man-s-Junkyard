import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const ScrapManagement = () => {
  // State for scrap addition
  const [scrapData, setScrapData] = useState({
    category: "",
    subCategory: "",
    pricePerUnit: "",
  });
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
  // State for changing scrap price
  const [priceData, setPriceData] = useState({
    scrapCategory: "",
    scrapSubCategory: "",
    newPrice: "",
  });

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setPriceData({
      ...priceData,
      scrapCategory: selectedCategory,
      scrapSubCategory: "", // Reset subcategory when category changes
    });
  };

  const addScrap = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/admin/addScrap",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          body: JSON.stringify(scrapData),
        }
      );
      const result = await response.json();
      alert(result.message);
      // Reset the form after successful addition
      setScrapData({ category: "", subCategory: "", pricePerUnit: "" });
    } catch (error) {
      alert("Failed to add scrap: " + error.message);
    }
  };

  const changeScrapPrice = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/admin/changeScrapPrice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          body: JSON.stringify(priceData),
        }
      );
      const result = await response.json();
      alert(result.message);
      // Reset the form after successful update
      setPriceData({ scrapCategory: "", scrapSubCategory: "", newPrice: "" });
    } catch (error) {
      alert("Failed to change scrap price: " + error.message);
    }
  };
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="space-y-6 ">
      <h2 className="text-xl font-semibold">Add Scrap</h2>
      <button
        onClick={() => setIsFormVisible(!isFormVisible)} // Toggle form visibility
        className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Add Scrap
      </button>

      {/* Conditionally render the form only when isFormVisible is true */}
      {isFormVisible && (
        <form onSubmit={addScrap} className="space-y-4 mt-4">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={scrapData.category}
            onChange={(e) =>
              setScrapData({ ...scrapData, category: e.target.value })
            }
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="subCategory"
            placeholder="Sub Category"
            value={scrapData.subCategory}
            onChange={(e) =>
              setScrapData({ ...scrapData, subCategory: e.target.value })
            }
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="number"
            name="pricePerUnit"
            placeholder="Price Per Unit"
            value={scrapData.pricePerUnit}
            onChange={(e) =>
              setScrapData({ ...scrapData, pricePerUnit: e.target.value })
            }
            required
            className="p-2 border rounded w-full"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-full"
          >
            Add Scrap
          </button>
        </form>
      )}

      <h2 className="text-xl font-semibold">Change Scrap Price</h2>
      <button
        type="button"
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
      >
        Change Scrap Price
      </button>

      {isFormVisible && (
        <form onSubmit={changeScrapPrice} className="space-y-4 mt-4">
          <h2 className="text-xl font-semibold">Change Scrap Price</h2>

          {/* Category dropdown */}
          <select
            name="scrapCategory"
            value={priceData.scrapCategory}
            onChange={handleCategoryChange}
            required
            className="p-2 border rounded w-full"
          >
            <option value="">Select Category</option>
            {Object.keys(categorySubcategoryMap).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Subcategory dropdown */}
          {priceData.scrapCategory && (
            <select
              name="scrapSubCategory"
              value={priceData.scrapSubCategory}
              onChange={(e) =>
                setPriceData({ ...priceData, scrapSubCategory: e.target.value })
              }
              required
              className="p-2 border rounded w-full"
            >
              <option value="">Select Subcategory</option>
              {categorySubcategoryMap[priceData.scrapCategory]?.map(
                (subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                )
              )}
            </select>
          )}

          <input
            type="number"
            name="newPrice"
            placeholder="New Price"
            value={priceData.newPrice}
            onChange={(e) =>
              setPriceData({ ...priceData, newPrice: e.target.value })
            }
            required
            className="p-2 border rounded w-full"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-full"
          >
            Change Scrap Price
          </button>
        </form>
      )}
    </div>
  );
};

const Admin = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    avatar: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [passwordFormOpen, setPasswordFormOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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

  const handleUpdateUserDetails = async (event) => {
    event.preventDefault();
    const payload = {
      fullName: userData.fullName,
      email: userData.email,
    };

    try {
      const response = await axios.patch(
        "http://localhost:8000/api/v1/users/update-account",
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      setUserData(response.data.data);
      setSuccessMessage("User details updated successfully!");
    } catch (error) {
      setError(
        error.response?.data.message ||
          "An error occurred while updating user details."
      );
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    const payload = {
      oldPassword,
      newPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/change-password",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      setSuccessMessage("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setError(
        error.response?.data.message ||
          "An error occurred while changing the password."
      );
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
          withCredentials: true,
        }
      );

      setUserData(response.data.data);
      setSuccessMessage("Avatar updated successfully!");
    } catch (error) {
      setError(
        error.response?.data.message ||
          "An error occurred while updating the avatar."
      );
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex h-screen bg-[url(https://i.pinimg.com/originals/fb/36/b6/fb36b6ee0ba43a905d7d6db76c21a9bf.gif)] bg-cover backdrop-blur-xl">
      <div className="flex flex-wrap justify-normal items-center bg-transparent p-7 rounded-lg shadow-md max-w-lg mx-auto w-full">
        <div className="flex flex-row items-center space-x-6 mb-6 w-full">
          <img
            src={userData.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-indigo-600"
          />
          <div>
            <h1 className="text-2xl font-semibold text-md  glow-text">
              {userData.fullName}
            </h1>
            <p className="text-md font-serif glow-text">{userData.email}</p>
          </div>
        </div>

        {successMessage && (
          <div className="text-green-600 mb-4">{successMessage}</div>
        )}
        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="flex space-x-4 w-full mb-4">
          <button
            onClick={() => setUpdateFormOpen(!updateFormOpen)}
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-full"
          >
            {updateFormOpen ? "Close Update Form" : "Update Details"}
          </button>
        </div>

        {updateFormOpen && (
          <form
            onSubmit={handleUpdateUserDetails}
            className="space-y-4 w-full flex flex-col items-center"
          >
            <input
              type="text"
              value={userData.fullName}
              onChange={(e) =>
                setUserData({ ...userData, fullName: e.target.value })
              }
              placeholder="Full Name"
              className="p-2 border rounded w-full"
              required
            />
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              placeholder="Email"
              className="p-2 border rounded w-full"
              required
            />
            <div className="w-full">
              <button
                type="submit"
                className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 w-full"
              >
                Update User
              </button>
            </div>
          </form>
        )}

        <div className="flex space-x-4 w-full mb-4">
          <button
            onClick={() => setPasswordFormOpen(!passwordFormOpen)}
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 w-full"
          >
            {passwordFormOpen
              ? "Close Change Password Form"
              : "Change Password"}
          </button>
        </div>

        {passwordFormOpen && (
          <form
            onSubmit={handleChangePassword}
            className="space-y-4 w-full flex flex-col items-center"
          >
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old Password"
              className="p-2 border rounded w-full"
              required
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="p-2 border rounded w-full"
              required
            />
            <div className="w-full">
              <button
                type="submit"
                className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 w-full"
              >
                Change Password
              </button>
            </div>
          </form>
        )}

        <form
          onSubmit={handleAvatarUpload}
          className="space-y-4 w-full flex flex-col items-center"
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            className="p-2 border rounded w-full"
          />
          <div className="w-full">
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 w-full"
            >
              Upload Avatar
            </button>
          </div>
        </form>

        {/* Scrap Management Component */}
        <ScrapManagement />

        <div className="flex space-x-4 py-5 w-full">
          <NavLink
            to="/unverified-dealer"
            className="block text-center py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 w-full"
          >
            Verification
          </NavLink>
        </div>

        <div className="flex space-x-4 py-5 w-full">
          <NavLink
            to="/user-search"
            className="block text-center py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 w-full"
          >
            Ban User
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Admin;
