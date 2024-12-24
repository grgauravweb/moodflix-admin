import React, { useState, useEffect } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";

const TmdbSetting = () => {
  const [settings, setSettings] = useState({
    apiKey: "",
    defaultLanguage: "English",
    imageGrabBy: "Cron",
  });

  // Fetch settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(API_URLS.tmdbSettings);
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(API_URLS.tmdbSettings, {
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
      <h2 className="text-2xl font-semibold mb-6">Tmdb Settings</h2>
      <form className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded shadow">
        <label className="block text-sm mt-2 mb-1">Tmdb Api Key</label>
        <input
          type="text"
          name="apiKey"
          value={settings.apiKey}
          onChange={handleChange}
          placeholder="Tmdb Api Key"
          className="w-full p-2 border rounded"
        />

        <label className="block text-sm mt-4 mb-1">Tmdb Default Language</label>
        <select
          name="defaultLanguage"
          value={settings.defaultLanguage}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {/* You can add more languages here */}
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Hindi">Hindi</option>
          <option value="Chinese">Chinese</option>
        </select>

        <label className="block text-sm mt-4 mb-1">Tmdb Image Grab By</label>
        <select
          name="imageGrabBy"
          value={settings.imageGrabBy}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Cron">Cron</option>
          <option value="Direct with Import">Direct with Import</option>
        </select>

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

export default TmdbSetting;
