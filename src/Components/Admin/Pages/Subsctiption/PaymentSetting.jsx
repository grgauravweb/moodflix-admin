import React, { useState, useEffect } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";

const PaymentSetting = () => {
  const [settings, setSettings] = useState({
    offlineEnabled: false,
    offlineTitle: "",
    offlineInstruction: "",
    paypalEnabled: false,
    paypalEmail: "paypal@yourwebsite.com",
    paypalClientId: "",
    stripeEnabled: false,
    stripePublishableKey: "",
    stripeSecretKey: "",
    razorpayEnabled: false,
    exchangeRate: 1,
    razorpayKeyId: "",
    razorpayKeySecret: "",
  });

  // Fetch settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(API_URLS.paymentSettings);
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
      const response = await fetch(API_URLS.paymentSettings, {
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
      <h2 className="text-2xl font-semibold mb-6">Payment Settings</h2>
      <form className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow">
        {/* Offline Payment */}
        <h3 className="text-lg font-semibold mb-2">Offline Payment</h3>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="offlineEnabled"
            checked={settings.offlineEnabled}
            onChange={handleChange}
          />
          <span>Offline Payment Enable/Disable?</span>
        </label>
        <input
          type="text"
          name="offlineTitle"
          value={settings.offlineTitle}
          onChange={handleChange}
          placeholder="Offline Payment Title"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="offlineInstruction"
          value={settings.offlineInstruction}
          onChange={handleChange}
          placeholder="Offline Payment Instruction"
          className="w-full p-2 border rounded"
        />

        {/* PayPal Payment Gateway */}
        <h3 className="text-lg font-semibold mt-4">PayPal Payment Gateway</h3>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="paypalEnabled"
            checked={settings.paypalEnabled}
            onChange={handleChange}
          />
          <span>Paypal Enable/Disable?</span>
        </label>
        <input
          type="email"
          name="paypalEmail"
          value={settings.paypalEmail}
          onChange={handleChange}
          placeholder="PayPal Merchant Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="paypalClientId"
          value={settings.paypalClientId}
          onChange={handleChange}
          placeholder="PayPal Client ID (For mobile App Only)"
          className="w-full p-2 border rounded"
        />

        {/* Stripe Payment Gateway */}
        <h3 className="text-lg font-semibold mt-4">Stripe Payment Gateway</h3>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="stripeEnabled"
            checked={settings.stripeEnabled}
            onChange={handleChange}
          />
          <span>Stripe Enable/Disable?</span>
        </label>
        <input
          type="text"
          name="stripePublishableKey"
          value={settings.stripePublishableKey}
          onChange={handleChange}
          placeholder="Stripe Publishable Key"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="stripeSecretKey"
          value={settings.stripeSecretKey}
          onChange={handleChange}
          placeholder="Stripe Secret Key"
          className="w-full p-2 border rounded"
        />

        {/* Razorpay Payment Gateway */}
        <h3 className="text-lg font-semibold mt-4">Razorpay Payment Gateway</h3>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="razorpayEnabled"
            checked={settings.razorpayEnabled}
            onChange={handleChange}
          />
          <span>Razorpay Enable/Disable?</span>
        </label>
        <label className="block text-sm mt-2 ml-2 mb-1">Exchange Rate</label>
        <input
          type="number"
          name="exchangeRate"
          value={settings.exchangeRate}
          onChange={handleChange}
          placeholder="Exchange Rate (1 INR = ?)"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="razorpayKeyId"
          value={settings.razorpayKeyId}
          onChange={handleChange}
          placeholder="Razorpay Key ID"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="razorpayKeySecret"
          value={settings.razorpayKeySecret}
          onChange={handleChange}
          placeholder="Razorpay Key Secret"
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

export default PaymentSetting;
