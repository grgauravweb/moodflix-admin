import React, { useState, useEffect } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";

const EmailSetting = () => {
  const [settings, setSettings] = useState({
    contactEmail: "contact@mydomain.com",
    mailType: "Mail",
    outgoingEmail: "",
    smtpServerAddress: "",
    smtpUsername: "",
    smtpPassword: "",
    smtpPort: "",
    smtpCrypto: "ssl", // Default value for SMTP Crypto
  });

  // Fetch settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(API_URLS.emailSettings);
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
      const response = await fetch(API_URLS.emailSettings, {
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
      <h2 className="text-2xl font-semibold mb-6">Email Settings</h2>
      <form className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Email Setting</h3>
        
        <label className="block mb-2">Contact Email</label>
        <input
          type="email"
          name="contactEmail"
          value={settings.contactEmail}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <label className="block mb-2">Mail Type</label>
        <select
          name="mailType"
          value={settings.mailType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Mail">Mail</option>
          <option value="SMTP">SMTP</option>
          <option value="Sendmail">Sendmail</option>
        </select>

        {settings.mailType === "SMTP" && (
          <>
            <label className="block mb-2">SMTP Server Address</label>
            <input
              type="text"
              name="smtpServerAddress"
              value={settings.smtpServerAddress}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            
            <label className="block mb-2">SMTP Username</label>
            <input
              type="text"
              name="smtpUsername"
              value={settings.smtpUsername}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="block mb-2">SMTP Password</label>
            <input
              type="password"
              name="smtpPassword"
              value={settings.smtpPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="block mb-2">SMTP Port</label>
            <input
              type="number"
              name="smtpPort"
              value={settings.smtpPort}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="block mb-2">SMTP Crypto</label>
            <select
              name="smtpCrypto"
              value={settings.smtpCrypto}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="ssl">SSL</option>
              <option value="tls">TLS</option>
            </select>
          </>
        )}

        <label className="block mb-2">Outgoing Email</label>
        <input
          type="text"
          name="outgoingEmail"
          value={settings.outgoingEmail}
          onChange={handleChange}
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

export default EmailSetting;
