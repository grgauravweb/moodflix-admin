// src/Modals/Slider/AddImageSlider.jsx

import React, { useState } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";

const AddImageSlider = ({ isOpen, onClose, onAdd }) => {
  const [sliderData, setSliderData] = useState({
    title: "",
    description: "",
    sortOrder: 0,
    actionType: "Open WebView URL",
    actionButtonText: "Play",
    status: "Active",
    image: "", // Base64 image string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSliderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSliderData((prevData) => ({
        ...prevData,
        image: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URLS.slider, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sliderData),
      });

      if (!response.ok) {
        throw new Error("Failed to add slider");
      }

      const newSlider = await response.json();
      onAdd(newSlider);
      onClose();
      alert("Date Saved")
    } catch (error) {
      console.error("Error adding slider:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded shadow-md w-96 ">
        <h2 className="text-lg font-semibold mb-4">Add Image Slider</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={sliderData.title}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={sliderData.description}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Sort Order</label>
            <input
              type="number"
              name="sortOrder"
              value={sliderData.sortOrder}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Action Type</label>
            <select
              name="actionType"
              value={sliderData.actionType}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="Open WebView URL">Play Movie</option>
              <option value="Some Other Action">Play TV Series</option>
              <option value="Some Other Action">Watch TV Channel</option>
              <option value="Some Other Action">
                Open URL by external Browser
              </option>
              <option value="Some Other Action">Open WebView Url</option>
              {/* Add other action types as needed */}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Action Button Text</label>
            <input
              type="text"
              name="actionButtonText"
              value={sliderData.actionButtonText}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={sliderData.status}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Slider
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddImageSlider;
