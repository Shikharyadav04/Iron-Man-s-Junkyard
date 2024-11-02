import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

const categorySubcategoryMap = {
  Metals: ["Aluminum", "Copper", "Steel", "Brass"],
  Plastics: ["PET", "HDPE", "PVC", "LDPE"],
  Electronics: ["Laptops", "Desktops", "Computer Accessories", "Smartphones", "Tablets"],
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
  const [isFormOpen, setIsFormOpen] = useState(false); // Toggle form visibility

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
      const response = await fetch(
        "http://localhost:8000/api/v1/request/request-creation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create request");
      }

      const data = await response.json();
      setSuccessMessage("Request created successfully!");

      navigate(`/payment/${data.requestId}`, { state: { amount: 100, requestId: data.requestId } });
      
      setScrapRequest({
        scraps: [{ category: "", subCategory: "", quantity: 0 }],
        pickupLocation: "",
        scheduledPickupDate: "",
        condition: "",
      });
      setIsFormOpen(false); // Close the form after successful submission
    } catch (error) {
      setError(error.message || "An error occurred while submitting the request.");
    } finally {
      setIsSubmitting(false);
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
                placeholder="Quantity"
                value={scrap.quantity}
                onChange={(event) => handleScrapChange(index, event)}
                className="p-2 border rounded w-full"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddScrap}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add More Scraps
          </button>
          <div>
            <input
              type="text"
              value={scrapRequest.pickupLocation}
              onChange={(e) =>
                setScrapRequest({
                  ...scrapRequest,
                  pickupLocation: e.target.value,
                })
              }
              placeholder="Pickup Location"
              className="p-2 border rounded w-full"
              required
            />
            <input
              type="datetime-local"
              value={scrapRequest.scheduledPickupDate}
              onChange={(e) =>
                setScrapRequest({
                  ...scrapRequest,
                  scheduledPickupDate: e.target.value,
                })
              }
              className="p-2 border rounded w-full mt-2"
              required
            />
            <input
              type="text"
              value={scrapRequest.condition}
              onChange={(e) =>
                setScrapRequest({ ...scrapRequest, condition: e.target.value })
              }
              placeholder="Condition"
              className="p-2 border rounded w-full mt-2"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 ${isSubmitting ? "bg-gray-600" : "bg-green-600"} text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Scrap Request"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Customer;
