import React, { useState } from "react";
import axios from "axios";
import UserSearchForm from "./UserSearchForm";
import UserCard from "./UserCard";
import { useLoader } from "@/context/LoaderContext";

function UserSearchPage() {
  const [users, setUsers] = useState([]);
  const { loading, showLoader, hideLoader } = useLoader();

  const fetchUsers = async (criteria) => {
    const filteredCriteria = Object.fromEntries(
      Object.entries(criteria).filter(
        ([_, value]) => value !== null && value !== ""
      )
    );

    showLoader(); // Show loader before the API call
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/admin/get-users",
        filteredCriteria,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      hideLoader(); // Hide loader after the API call
    }
  };

  return (
    <div className="min-h-screen bg-[url(https://i.pinimg.com/736x/66/20/87/662087df1986b1e97b3bd46c57a89a2f.jpg)] bg-fill bg-top p-6">
      <UserSearchForm onSearch={fetchUsers} />
      {loading && <div className="loader">Loading...</div>}
      <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UserSearchPage;
