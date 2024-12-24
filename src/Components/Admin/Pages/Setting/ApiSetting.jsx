import React, { useState, useEffect } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";

const ApiSetting = () => {
  const [settings, setSettings] = useState({
    apiServerUrl: "",
    apiKey: "",
  });

  // Fetch settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(API_URLS.apiSettings);
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(API_URLS.apiSettings, {
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

  const generateRandomApiKey = () => {
    // Generate a random string with alphanumeric characters of length 24
    return Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 36).toString(36)
    ).join("");
  };

  const handleCreateNewApiKey = () => {
    const newApiKey = generateRandomApiKey();
    setSettings((prevSettings) => ({
      ...prevSettings,
      apiKey: newApiKey,
    }));
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">API Setting</h2>
      <form className="space-y-4 max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">REST API</h3>
        <div className="mb-4">
          <label className="block text-sm mb-1">API SERVER URL FOR APP</label>
          <input
            type="text"
            name="apiServerUrl"
            value={settings.apiServerUrl}
            readOnly
            className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
          />
          <p className="mt-2 text-gray-600">
            Copy & paste this URL to App Source Code.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">API KEY FOR APP</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="apiKey"
              value={settings.apiKey}
              readOnly
              className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
            />
            <button
              type="button"
              onClick={handleCreateNewApiKey}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Create New API Key
            </button>
          </div>
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

export default ApiSetting;
