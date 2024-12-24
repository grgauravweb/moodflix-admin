// src/components/Modals/EditGuide.js
import React, { useState } from 'react';
import { API_URLS } from '../../../../../Apis/Globalapi';

const EditGuide = ({ program, closeModal, fetchPrograms }) => {
  const [formData, setFormData] = useState({
    tvChannel: program.tvChannel,
    programTitle: program.programTitle,
    date: program.date,
    time: program.time,
    type: program.type,
    status: program.status,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URLS.programs}/${program._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        fetchPrograms();
        closeModal();
        alert("Date Saved")
      } else {
        alert('Failed to update the program. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating the program:', error);
      alert('An error occurred while updating the program. Please try again.');
    }
  };
  

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg w-96 shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-4">Edit Program Guide</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="tvChannel" className="block text-sm font-medium text-gray-700">TV Channel</label>
            <input
              type="text"
              id="tvChannel"
              name="tvChannel"
              value={formData.tvChannel}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="programTitle" className="block text-sm font-medium text-gray-700">Program Title</label>
            <input
              type="text"
              id="programTitle"
              name="programTitle"
              value={formData.programTitle}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Program Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <input
              type="text"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="w-full p-2 bg-red-500 text-white rounded-md mt-2 hover:bg-red-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditGuide;
