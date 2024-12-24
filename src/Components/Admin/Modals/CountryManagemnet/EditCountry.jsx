import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API calls
import { API_URLS } from '../../../../Apis/Globalapi';

const EditCountry = ({ isOpen, onClose, country, onSave }) => {
  const [updatedCountry, setUpdatedCountry] = useState({
    name: '',
    slug: '',
    description: '',
    status: '',
    icon: '',
  });

  useEffect(() => {
    if (country) {
      setUpdatedCountry({
        name: country.name || '',
        slug: country.slug || '',
        description: country.description || '',
        status: country.status || '',
        icon: country.icon || '',
      });
    }
  }, [country]);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      const response = await axios.put(`${API_URLS.country}/${country._id}`, updatedCountry);
      onSave(response.data); // Pass the updated country data back to the parent
      onClose();
      alert("Data Updated");
    } catch (error) {
      console.error('Error updating country:', error);
      alert('Failed to update country. Please try again.'); // Add user feedback for errors
    }
  };

  const handleChooseLogo = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedCountry((prevState) => ({
          ...prevState,
          icon: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-11/12 md:w-1/3">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Country</h2>

        <div className="mb-4 flex flex-col items-center">
          <h3 className="text-md font-semibold mb-2">Current Logo:</h3>
          {updatedCountry.icon ? (
            <img
              src={updatedCountry.icon}
              alt={`${updatedCountry.name} Icon`}
              className="w-24 h-24 inline-block"
            />
          ) : (
            <div className="w-24 h-24 mb-2 bg-gray-200 flex items-center justify-center rounded">
              <span>No Logo Available</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleChooseLogo}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mb-2"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Country Name:</label>
          <input
            type="text"
            value={updatedCountry.name}
            placeholder="Country Name"
            onChange={(e) => setUpdatedCountry({ ...updatedCountry, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />

          <label className="block font-semibold mb-1">Slug:</label>
          <input
            type="text"
            value={updatedCountry.slug}
            placeholder="Slug"
            onChange={(e) => setUpdatedCountry({ ...updatedCountry, slug: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />

          <label className="block font-semibold mb-1">Description:</label>
          <input
            type="text"
            value={updatedCountry.description}
            placeholder="Description"
            onChange={(e) => setUpdatedCountry({ ...updatedCountry, description: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />

          <label className="block font-semibold mb-1">Status:</label>
          <select
            value={updatedCountry.status}
            onChange={(e) => setUpdatedCountry({ ...updatedCountry, status: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          >
            <option value="Published">Published</option>
            <option value="Unpublished">Unpublished</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition duration-300">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditCountry;
