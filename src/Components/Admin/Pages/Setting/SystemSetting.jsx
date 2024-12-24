import React, { useState, useEffect } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";

const SystemSetting = () => {
  const [settings, setSettings] = useState({
    purchaseCode: "",
    termsUrl: "",
    navigationMenu: "Grid", // Set default to Grid
    tvProgramGuide: false,
    mandatoryLogin: false,
    displayGenreHome: false,
    countryGenreHome: false,
    siteName: "",
    address: "",
    phone: "",
    systemEmail: "",
    contactEmail: "",
    termsConditions: "",
    videoFileOrder: "Ascending",
    seasonOrder: "Descending",
    episodeOrder: "Descending",
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(API_URLS.systemsettings, {
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

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const response = await fetch(API_URLS.Settinglatest);
        if (!response.ok) throw new Error("Failed to fetch settings data");
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error("Error fetching settings data:", error);
      }
    };
    fetchSettingsData();
  }, []);

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">System Setting</h2>
      <form className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow">
        
        <label className="block">
          <span>Purchase Code</span>
          <input
            type="text"
            name="purchaseCode"
            value={settings.purchaseCode}
            onChange={handleChange}
            placeholder="Enter Purchase Code"
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          <span>Terms URL FOR ANDROID</span>
          <input
            type="url"
            name="termsUrl"
            value={settings.termsUrl}
            onChange={handleChange}
            placeholder="Enter Terms URL"
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          <span>Navigation Menu</span>
          <select
            name="navigationMenu"
            value={settings.navigationMenu}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Grid">Grid</option>
            <option value="Vertical">Vertical</option>
          </select>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="tvProgramGuide"
            checked={settings.tvProgramGuide}
            onChange={handleChange}
          />
          <span>TV Program Guide</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="mandatoryLogin"
            checked={settings.mandatoryLogin}
            onChange={handleChange}
          />
          <span>Mandatory Login</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="displayGenreHome"
            checked={settings.displayGenreHome}
            onChange={handleChange}
          />
          <span>Display Genre on App Home</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="countryGenreHome"
            checked={settings.countryGenreHome}
            onChange={handleChange}
          />
          <span>Country Genre on App Home</span>
        </label>

        <label className="block">
          <span>Site Name</span>
          <input
            type="text"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            placeholder="Enter Site Name"
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          <span>Address</span>
          <input
            type="text"
            name="address"
            value={settings.address}
            onChange={handleChange}
            placeholder="Enter Address"
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          <span>Phone</span>
          <input
            type="text"
            name="phone"
            value={settings.phone}
            onChange={handleChange}
            placeholder="Enter Phone"
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          <span>System Email</span>
          <input
            type="email"
            name="systemEmail"
            value={settings.systemEmail}
            onChange={handleChange}
            placeholder="Enter System Email"
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          <span>Contact Email</span>
          <input
            type="email"
            name="contactEmail"
            value={settings.contactEmail}
            onChange={handleChange}
            placeholder="Enter Contact Email"
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          <span>Terms & Conditions (HTML allowed)</span>
          <textarea
            name="termsConditions"
            value={settings.termsConditions}
            onChange={handleChange}
            placeholder="Enter Terms & Conditions"
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          <span>Video File Order</span>
          <select
            name="videoFileOrder"
            value={settings.videoFileOrder}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
        </label>

        <label className="block">
          <span>Season Order</span>
          <select
            name="seasonOrder"
            value={settings.seasonOrder}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
        </label>

        <label className="block">
          <span>Episode Order</span>
          <select
            name="episodeOrder"
            value={settings.episodeOrder}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
        </label>

        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 w-full"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default SystemSetting;
