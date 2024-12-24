import React, { useState, useEffect } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";

const Setting = () => {
  const [settings, setSettings] = useState({
    currencySymbol: "₹",
    currency: "INR",
    exchangeRate: 1,
    onlineExchangeRate: false,
    showRibbonForPaidContent: false,
    trialFunctionality: false,
    trialPeriodDays: 7,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(API_URLS.SubSettings);
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
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(API_URLS.SubSettings, {
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
      <h2 className="text-2xl font-semibold mb-6">Subscription Settings</h2>
      <form className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow">
        
        {/* Currency Symbol */}
        <label className="block text-sm font-semibold">Currency Symbol</label>
        <input
          type="text"
          name="currencySymbol"
          value={settings.currencySymbol}
          onChange={handleChange}
          placeholder="₹"
          className="w-full p-2 border rounded"
        />

        {/* Currency */}
        <label className="block text-sm font-semibold">Currency</label>
        <input
          type="text"
          name="currency"
          value={settings.currency}
          onChange={handleChange}
          placeholder="INR"
          className="w-full p-2 border rounded"
        />

        {/* Exchange Rate */}
        <label className="block text-sm font-semibold">Exchange Rate</label>
        <input
          type="number"
          name="exchangeRate"
          value={settings.exchangeRate}
          onChange={handleChange}
          placeholder="Exchange Rate (1 USD = ?)"
          className="w-full p-2 border rounded"
        />
        
        {/* Online Exchange Rate Update */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="onlineExchangeRate"
            checked={settings.onlineExchangeRate}
            onChange={handleChange}
          />
          <span>Update Exchange rate from online (by Cron)</span>
        </label>

        {/* Show Ribbon for Paid Content */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="showRibbonForPaidContent"
            checked={settings.showRibbonForPaidContent}
            onChange={handleChange}
          />
          <span>Show Ribbon for Paid Content</span>
        </label>

        {/* Trial Functionality */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="trialFunctionality"
            checked={settings.trialFunctionality}
            onChange={handleChange}
          />
          <span>Enable Trial Functionality</span>
        </label>

        {/* Trial Period Days */}
        <label className="block text-sm font-semibold">Trial Period Number of days</label>
        <input
          type="number"
          name="trialPeriodDays"
          value={settings.trialPeriodDays}
          onChange={handleChange}
          placeholder="7"
          className="w-full p-2 border rounded"
        />

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

export default Setting;
