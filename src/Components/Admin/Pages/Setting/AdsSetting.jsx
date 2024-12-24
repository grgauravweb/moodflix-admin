import React, { useState, useEffect } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";

const AdsSetting = () => {
  const [settings, setSettings] = useState({
    rewardAds: "Disable",
    rewardAdsId: "",
    bannerAds: "Disable",
    bannerAdsId: "",
    interstitialAds: "Disable",
    interstitialAdsId: "",
    nativeAds: "Disable",
    nativeAdsId: "",
    admobPublisherId: "",
    unityTestMode: false,
    unityGameIdAndroid: "",
    unityGameIdIOS: "",
  });

  // Fetch settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(API_URLS.adsSettings);
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();
        setSettings(data); // Set the form inputs with fetched data
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
      const response = await fetch(API_URLS.adsSettings, {
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
      <h2 className="text-2xl font-semibold mb-6">Ads Setting</h2>
      <form className="space-y-6 max-w-3xl mx-auto bg-white p-6 rounded shadow">
        
        {/* Reward Ads */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-2">Reward Ads</h3>
          <label className="block mb-1">Reward Ads</label>
          <select
            name="rewardAds"
            value={settings.rewardAds}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Disable">Disable</option>
            <option value="adMob">adMob</option>
            <option value="unity ads">Unity Ads</option>
            <option value="appLovin">AppLovin</option>
            <option value="facebook audience network">Facebook Audience Network</option>
          </select>
          <label className="block mb-1">Reward Ads ID</label>
          <input
            type="text"
            name="rewardAdsId"
            value={settings.rewardAdsId}
            onChange={handleChange}
            placeholder="Reward Ads ID"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Banner Ads */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-2">Banner Ads</h3>
          <label className="block mb-1">Banner Ads</label>
          <select
            name="bannerAds"
            value={settings.bannerAds}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Disable">Disable</option>
            <option value="adMob">adMob</option>
            <option value="unity ads">Unity Ads</option>
            <option value="appLovin">AppLovin</option>
            <option value="facebook audience network">Facebook Audience Network</option>
          </select>
          <label className="block mb-1">Banner Ads ID</label>
          <input
            type="text"
            name="bannerAdsId"
            value={settings.bannerAdsId}
            onChange={handleChange}
            placeholder="Banner Ads ID"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Interstitial Ads */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-2">Interstitial Ads</h3>
          <label className="block mb-1">Interstitial Ads</label>
          <select
            name="interstitialAds"
            value={settings.interstitialAds}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Disable">Disable</option>
            <option value="adMob">adMob</option>
            <option value="unity ads">Unity Ads</option>
            <option value="appLovin">AppLovin</option>
            <option value="facebook audience network">Facebook Audience Network</option>
          </select>
          <label className="block mb-1">Interstitial Ads ID</label>
          <input
            type="text"
            name="interstitialAdsId"
            value={settings.interstitialAdsId}
            onChange={handleChange}
            placeholder="Interstitial Ads ID"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Native Ads */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-2">Native Ads</h3>
          <label className="block mb-1">Native Ads</label>
          <select
            name="nativeAds"
            value={settings.nativeAds}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Disable">Disable</option>
            <option value="adMob">adMob</option>
            <option value="unity ads">Unity Ads</option>
            <option value="appLovin">AppLovin</option>
            <option value="facebook audience network">Facebook Audience Network</option>
          </select>
          <label className="block mb-1">Native Ads ID</label>
          <input
            type="text"
            name="nativeAdsId"
            value={settings.nativeAdsId}
            onChange={handleChange}
            placeholder="Native Ads ID"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Admob Publisher ID */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-2">Admob</h3>
          <label className="block mb-1">Admob Publisher ID</label>
          <input
            type="text"
            name="admobPublisherId"
            value={settings.admobPublisherId}
            onChange={handleChange}
            placeholder="Admob Publisher ID"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Unity Game IDs */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Unity</h3>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="unityTestMode"
              checked={settings.unityTestMode}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Test Mode</span>
          </label>
          <label className="block mb-1">Unity Game ID (Android)</label>
          <input
            type="text"
            name="unityGameIdAndroid"
            value={settings.unityGameIdAndroid}
            onChange={handleChange}
            placeholder="Unity Game ID (Android)"
            className="w-full p-2 border rounded"
          />
          <label className="block mb-1">Unity Game ID (iOS)</label>
          <input
            type="text"
            name="unityGameIdIOS"
            value={settings.unityGameIdIOS}
            onChange={handleChange}
            placeholder="Unity Game ID (iOS)"
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

export default AdsSetting;
