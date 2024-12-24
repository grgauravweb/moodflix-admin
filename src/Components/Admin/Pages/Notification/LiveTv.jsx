import React, { useState, useEffect } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";

const LiveTvNotification = () => {
  const [notification, setNotification] = useState({
    type: "Live TV", // Default notification type
    tvChannel: "",
    headings: "",
    message: "",
    iconUrl: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotification({ ...notification, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(API_URLS.notifications, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
      });
      if (!response.ok) throw new Error("Failed to save notification");
      alert("Notification sent successfully!");
    } catch (error) {
      console.error("Error saving notification:", error);
    }
  };


  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Send Notification (OneSignal)</h2>
      <form className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow">
        <select
          name="type"
          value={notification.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Live TV">Send Live TV Notification</option>
          <option value="Movie/TV-Series">Send Movie/TV-Series Notification</option>
          <option value="Movie/TV-Series">Web View</option>
        </select>

        <input
          type="text"
          name="tvChannel"
          value={notification.tvChannel}
          onChange={handleChange}
          placeholder="TV Channel"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="headings"
          value={notification.headings}
          onChange={handleChange}
          placeholder="Headings"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="message"
          value={notification.message}
          onChange={handleChange}
          placeholder="Message"
          className="w-full p-2 border rounded"
        />
        <input
          type="url"
          name="iconUrl"
          value={notification.iconUrl}
          onChange={handleChange}
          placeholder="Icon URL"
          className="w-full p-2 border rounded"
        />
        <input
          type="url"
          name="imageUrl"
          value={notification.imageUrl}
          onChange={handleChange}
          placeholder="Image URL (Large)"
          className="w-full p-2 border rounded"
        />
        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 w-full"
        >
          Save Notification
        </button>
      </form>
    </div>
  );
};

export default LiveTvNotification;
