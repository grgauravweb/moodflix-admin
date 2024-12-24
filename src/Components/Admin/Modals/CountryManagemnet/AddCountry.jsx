import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { API_URLS } from '../../../../Apis/Globalapi';

const AddCountry = ({ isOpen, onClose }) => {
  const [countryData, setCountryData] = useState({
    name: '',
    icon: null,
    slug: '',
    description: '',
    status: 'Published',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCountryData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCountryData((prevData) => ({
      ...prevData,
      icon: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the file to Base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64data = reader.result;

      const dataToSend = {
        ...countryData,
        icon: base64data, // Add the Base64 data
      };

      try {
        const response = await fetch(API_URLS.country, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          // Successfully added country
          onClose(); 
          alert("Country added sucessfully")
          window.location.reload()
        } else {
          console.error('Failed to add country:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (countryData.icon) {
      reader.readAsDataURL(countryData.icon); // Convert file to Base64
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Country</h2>
          <button onClick={onClose} className="text-red-500">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={countryData.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Upload Icon</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Slug</label>
            <input
              type="text"
              name="slug"
              value={countryData.slug}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={countryData.description}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={countryData.status}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            >
              <option value="Published">Published</option>
              <option value="Unpublished">Unpublished</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Country
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCountry;
