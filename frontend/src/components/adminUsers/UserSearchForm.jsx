import React, { useState } from "react";

function UserSearchForm({ onSearch }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isSubscribed, setIsSubscribed] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const criteria = {
      username: username.trim() || null,
      email: email.trim() || null,
      role: role.trim() || null,
      isSubscribed:
        isSubscribed === "true"
          ? true
          : isSubscribed === "false"
          ? false
          : null,
    };
    onSearch(criteria); // Pass the criteria up to the parent component
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white shadow rounded-lg max-w-md mx-auto"
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="customer">Customer</option>
        <option value="dealer">Dealer</option>
      </select>
      <select
        value={isSubscribed}
        onChange={(e) => setIsSubscribed(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Subscription Status</option>
        <option value="true">Subscribed</option>
        <option value="false">Not Subscribed</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Search Users
      </button>
    </form>
  );
}

export default UserSearchForm;
