import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditQualityModal from "../../Modals/Setting/EditQuality";
import { API_URLS } from "../../../../Apis/Globalapi";

const MovieVideoQuality = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [videoQualities, setVideoQualities] = useState([]);
  const [editingQuality, setEditingQuality] = useState(null);

  const [newQuality, setNewQuality] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    const fetchQualities = async () => {
      try {
        const response = await fetch(API_URLS.videoQualities);
        if (!response.ok) {
          throw new Error("Failed to fetch video qualities");
        }
        const data = await response.json();
        setVideoQualities(data);
      } catch (error) {
        console.error("Error fetching video qualities:", error);
      }
    };

    fetchQualities();
  }, []);

  const handleOpenEditModal = (quality) => {
    setEditingQuality(quality);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingQuality(null);
  };

  const handleAddQuality = async (e) => {
    e.preventDefault();

    const newQualityData = { quality: newQuality, description: newDescription };

    try {
      const response = await fetch(API_URLS.videoQualities, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQualityData),
      });

      if (!response.ok) {
        throw new Error("Failed to add video quality");
      }

      const data = await response.json();
      setVideoQualities([...videoQualities, data]);
      setNewQuality("");
      setNewDescription("");
    } catch (error) {
      console.error("Error adding video quality:", error);
    }
  };

  const handleUpdateQuality = async (updatedQuality) => {
    try {
      const response = await fetch(`${API_URLS.videoQualities}/${updatedQuality._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuality),
      });

      if (!response.ok) {
        throw new Error("Failed to update video quality");
      }

      const data = await response.json();
      setVideoQualities(videoQualities.map((quality) => (quality._id === data._id ? data : quality)));
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating video quality:", error);
    }
  };

  const handleDeleteClick = async (qualityId) => {
    if (window.confirm("Are you sure you want to delete this video quality?")) {
      try {
        const response = await fetch(`${API_URLS.videoQualities}/${qualityId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete video quality");
        }

        setVideoQualities(videoQualities.filter((quality) => quality._id !== qualityId));
        alert("deleted successfully!");
      } catch (error) {
        console.error("Error deleting video quality:", error);
      }
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Video Quality Management</h2>

      {/* Add Video Quality Form */}
      <div className="bg-white p-4 shadow-md rounded mb-6">
        <h3 className="text-xl font-medium mb-4">Add New Video Quality</h3>
        <form onSubmit={handleAddQuality}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Video Quality</label>
            <input
              type="text"
              value={newQuality}
              onChange={(e) => setNewQuality(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Video Quality
          </button>
        </form>
      </div>

      {/* Edit Video Quality Modal */}
      <EditQualityModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onUpdate={handleUpdateQuality}
        editingQuality={editingQuality}
      />

      {/* Video Quality Table */}
      <div className="bg-white p-4 shadow-md rounded overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b text-sm md:text-base">#</th>
              <th className="p-2 border-b text-sm md:text-base">Video Quality</th>
              <th className="p-2 border-b text-sm md:text-base">Description</th>
              <th className="p-2 border-b text-sm md:text-base text-center">Options</th>
            </tr>
          </thead>
          <tbody>
            {videoQualities.map((quality, index) => (
              <tr className="hover:bg-gray-100" key={quality._id}>
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{quality.quality}</td>
                <td className="p-2 border-b">{quality.description}</td>
                <td className="p-2 border-b text-center">
                  <button
                    onClick={() => handleOpenEditModal(quality)}
                    className="text-green-500 hover:text-green-600 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(quality._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieVideoQuality;
