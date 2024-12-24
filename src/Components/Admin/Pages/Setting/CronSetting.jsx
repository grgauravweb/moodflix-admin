import React, { useState, useEffect } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";

const CronSetting = () => {
  const [settings, setSettings] = useState({
    imageImportCron: "",
    emailNewsletterCron: "",
    dailyCron: "",
    weeklyCron: "",
    monthlyCron: "",
    cronKey: "",
    backupSchedule: "Daily",
  });

  // Fetch settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(API_URLS.cronSettings);
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

  const generateKey = () => {
    const newKey = Math.random().toString(36).substring(2, 18);
    const baseURL = "https://admin.moodflix.com/cron/";

    setSettings((prevSettings) => ({
      ...prevSettings,
      cronKey: newKey,
      imageImportCron: `${baseURL}image/${newKey}`,
      emailNewsletterCron: `${baseURL}email/${newKey}`,
      dailyCron: `${baseURL}daily/${newKey}`,
      weeklyCron: `${baseURL}weekly/${newKey}`,
      monthlyCron: `${baseURL}monthly/${newKey}`,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(API_URLS.cronSettings, {
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
      <h2 className="text-2xl font-semibold mb-6">Cron Setting</h2>
      <form className="space-y-6 max-w-3xl mx-auto bg-white p-6 rounded shadow">
        
        <h3 className="text-xl font-semibold mb-4">General Settings</h3>
        <div>
          <label className="block text-sm mb-1">Cron Key</label>
          <div className="flex items-center">
            <input
              type="text"
              name="cronKey"
              value={settings.cronKey}
              readOnly
              className="w-full p-2 border rounded mr-2"
            />
            <button
              type="button"
              onClick={generateKey}
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
              Generate New Key
            </button>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm mb-1">Backup Schedule</label>
          <select
            name="backupSchedule"
            value={settings.backupSchedule}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 w-full"
        >
          Save
        </button>
      </form>

      <div className="mt-10 max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Generated Cron URLs</h3>
        <div className="bg-gray-100 p-4 rounded border">
          <label className="block text-sm mb-1">Image Import Cron</label>
          <input
            type="text"
            value={settings.imageImportCron}
            readOnly
            className="w-full p-2 border rounded mb-2"
          />

          <label className="block text-sm mb-1">Email Newsletter Cron</label>
          <input
            type="text"
            value={settings.emailNewsletterCron}
            readOnly
            className="w-full p-2 border rounded mb-2"
          />

          <label className="block text-sm mb-1">Daily Cron</label>
          <input
            type="text"
            value={settings.dailyCron}
            readOnly
            className="w-full p-2 border rounded mb-2"
          />

          <label className="block text-sm mb-1">Weekly Cron</label>
          <input
            type="text"
            value={settings.weeklyCron}
            readOnly
            className="w-full p-2 border rounded mb-2"
          />

          <label className="block text-sm mb-1">Monthly Cron</label>
          <input
            type="text"
            value={settings.monthlyCron}
            readOnly
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default CronSetting;
