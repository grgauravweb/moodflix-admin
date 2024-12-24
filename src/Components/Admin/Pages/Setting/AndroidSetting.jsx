import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URLS } from "../../../../Apis/Globalapi";

const AndroidSetting = () => {
  const [settings, setSettings] = useState({
    latestApkVersionName: "",
    latestApkVersionCode: "",
    apkFileUrl: "",
    whatsNew: [""],
    updateSkippable: false,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(API_URLS.androidSettings);
        if (response.data) setSettings(response.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleWhatsNewChange = (index, value) => {
    const updatedWhatsNew = [...settings.whatsNew];
    updatedWhatsNew[index] = value;
    setSettings({ ...settings, whatsNew: updatedWhatsNew });
  };

  const addWhatsNew = () => {
    setSettings({ ...settings, whatsNew: [...settings.whatsNew, ""] });
  };

  const handleSave = async () => {
    try {
      await axios.post(API_URLS.androidSettings, settings);
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Android Settings</h2>
      <p className="text-gray-600 mb-4">
        Note: An update popup will be displayed to users with older versions based on the APK information below.
      </p>

      <form className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow">
        <label className="block font-semibold">Latest APK Version Name</label>
        <input
          type="text"
          name="latestApkVersionName"
          value={settings.latestApkVersionName}
          onChange={handleInputChange}
          placeholder="Enter APK Version Name"
          className="w-full p-2 border rounded"
        />

        <label className="block font-semibold">Latest APK Version Code</label>
        <input
          type="number"
          name="latestApkVersionCode"
          value={settings.latestApkVersionCode}
          onChange={handleInputChange}
          placeholder="Enter APK Version Code"
          className="w-full p-2 border rounded"
        />

        <label className="block font-semibold">APK File URL</label>
        <input
          type="url"
          name="apkFileUrl"
          value={settings.apkFileUrl}
          onChange={handleInputChange}
          placeholder="Enter APK File URL"
          className="w-full p-2 border rounded"
        />

        <label className="block font-semibold">What's New on Latest APK</label>
        {settings.whatsNew.map((item, index) => (
          <input
            key={index}
            type="text"
            value={item}
            onChange={(e) => handleWhatsNewChange(index, e.target.value)}
            placeholder="Describe new feature"
            className="w-full p-2 border rounded mb-2"
          />
        ))}
        <button
          type="button"
          onClick={addWhatsNew}
          className="text-blue-500 text-sm"
        >
          + Add New Feature
        </button>

        <label className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            name="updateSkippable"
            checked={settings.updateSkippable}
            onChange={handleInputChange}
          />
          <span>Update Skippable</span>
        </label>

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

export default AndroidSetting;
