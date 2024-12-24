// src/components/ModalForm.js
import React, { useState } from 'react';
import { API_URLS } from '../../../../../Apis/Globalapi';

const AddGuide = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    tvChannel: '',
    programTitle: '',
    date: '',
    time: '',
    type: 'Upcoming',
    status: 'Publish',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(API_URLS.ProgramGuide, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      closeModal();
      alert("Date Saved")
    } else {
      console.error('Failed to add program guide');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-semibold mb-4">Add Program Guide</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">TV Channel</label>
            <input
              type="text"
              name="tvChannel"
              value={formData.tvChannel}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter TV Channel"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Program Title</label>
            <input
              type="text"
              name="programTitle"
              value={formData.programTitle}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Program Title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Aired">Aired</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Publish">Publish</option>
              <option value="Unpublish">Unpublish</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 mr-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Program Guide
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGuide;
