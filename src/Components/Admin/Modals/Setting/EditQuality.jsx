// EditQualityModal.js
import React, { useState, useEffect } from "react";

const EditQualityModal = ({ isOpen, onClose, onUpdate, editingQuality }) => {
  const [quality, setQuality] = useState(editingQuality?.quality || "");
  const [description, setDescription] = useState(editingQuality?.description || "");

  useEffect(() => {
    if (editingQuality) {
      setQuality(editingQuality.quality);
      setDescription(editingQuality.description);
    }
  }, [editingQuality]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...editingQuality, quality, description });
    alert("Data Updated");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Video Quality</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Video Quality</label>
            <input
              type="text"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQualityModal;
