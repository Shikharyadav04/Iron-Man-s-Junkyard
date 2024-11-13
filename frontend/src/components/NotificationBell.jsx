import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const NotificationBell = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // Ref for dropdown
  const buttonRef = useRef(null); // Ref for the bell button

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/notifications/get-notifications",
          {
            withCredentials: true,
          }
        );

        if (data && data.data) {
          setNotifications(data.data);
          setUnreadCount(data.data.filter((n) => !n.read).length); // Calculate unread count
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const markAllAsRead = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8000/api/v1/notifications/mark-all-read",
        {},
        {
          withCredentials: true,
        }
      );

      // Log the updated notifications returned from the backend
      console.log("Updated notifications:", response.data.data.notifications);

      // Update the state with the new notifications
      setNotifications(response.data.data.notifications);
      setUnreadCount(0); // Reset unread count to 0
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside the dropdown or the button
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownVisible(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button
        onClick={toggleDropdown}
        ref={buttonRef}
        className="relative z-50 h-10 w-8"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0  bg-red-500 text-white text-xs font-bold rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      <div
        ref={dropdownRef}
        className={`${
          dropdownVisible ? "block" : "hidden"
        } absolute z-20 right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 transition-all ease-in-out duration-200`}
        style={{ maxHeight: "300px", overflowY: "auto" }} // Set max height and enable scroll
      >
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Notifications</h4>
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Mark all as read
          </button>
        </div>
        <div className="mt-2 space-y-2">
          {notifications.length === 0 ? (
            <div>No notifications found.</div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif._id}
                className={`notification ${
                  notif.read ? "read" : "unread"
                } p-2 border-b last:border-0`}
              >
                {notif.message}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationBell;
