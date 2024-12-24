import React, { useState, useEffect } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";

const PushNotificationSetting = () => {
  const [settings, setSettings] = useState({
    oneSignalApiKey: "",
    oneSignalAppId: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(API_URLS.PushNotificationSetting);
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(API_URLS.PushNotificationSetting, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error("Failed to save settings");
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
    <h2 className="text-2xl font-semibold mb-6">Push Notification Setting</h2>
    <form className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow">
      <p>
        If you don't have a OneSignal account yet,{" "}
        <a href="https://onesignal.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          sign up here
        </a>{" "}
        to get AppID and Key.
      </p>
      <div>
        <label htmlFor="oneSignalApiKey" className="block text-gray-700 font-medium mb-1">OneSignal API Key</label>
        <input
          type="text"
          id="oneSignalApiKey"
          name="oneSignalApiKey"
          value={settings.oneSignalApiKey}
          onChange={handleChange}
          placeholder="Enter OneSignal API Key"
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="oneSignalAppId" className="block text-gray-700 font-medium mb-1">OneSignal App ID</label>
        <input
          type="text"
          id="oneSignalAppId"
          name="oneSignalAppId"
          value={settings.oneSignalAppId}
          onChange={handleChange}
          placeholder="Enter OneSignal App ID"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="button"
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 w-full"
      >
        Save
      </button>
    </form>
  </div>
  
  );
};

export default PushNotificationSetting;
