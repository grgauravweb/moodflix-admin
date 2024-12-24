import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddImageSlider from "../../Modals/Slider/AddImageSlider";
import EditImageSlider from "../../Modals/Slider/EditImageSlider";
import { API_URLS } from "../../../../Apis/Globalapi";

const ImageSliderManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sliders, setSliders] = useState([]);
  const [editingSlider, setEditingSlider] = useState(null);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch(API_URLS.slider);
        if (!response.ok) {
          throw new Error("Failed to fetch sliders");
        }
        const data = await response.json();
        setSliders(data);
      } catch (error) {
        console.error("Error fetching sliders:", error);
      }
    };

    fetchSliders();
  }, []);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (slider) => {
    setEditingSlider(slider);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingSlider(null);
  };

  const handleAddSlider = (newSlider) => {
    setSliders([...sliders, newSlider]);
    handleCloseAddModal();
  };

  const handleUpdateSlider = async (updatedSlider) => {
    try {
      const response = await fetch(`${API_URLS.slider}/${updatedSlider._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSlider),
      });

      if (!response.ok) {
        throw new Error("Failed to update slider");
      }

      const data = await response.json();

      setSliders(sliders.map((slider) => (slider._id === data._id ? data : slider)));
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating slider:", error);
    }
  };

  const handleDeleteClick = async (sliderId) => {
    try {
      const response = await fetch(`${API_URLS.slider}/${sliderId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete slider");
      }

      setSliders(sliders.filter((slider) => slider._id !== sliderId));
      alert("deleted successfully!");
    } catch (error) {
      console.error("Error deleting slider:", error);
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Image Slider Management</h2>

      <button
        onClick={handleOpenAddModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600"
      >
        + Add Image Slider
      </button>

      <AddImageSlider
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAdd={handleAddSlider}
      />

      <EditImageSlider
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onUpdate={handleUpdateSlider}
        editingSlider={editingSlider}
      />

      <div className="bg-white p-4 shadow-md rounded overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b text-sm md:text-base">#</th>
              <th className="p-2 border-b text-sm md:text-base">Title</th>
              <th className="p-2 border-b text-sm md:text-base">Description</th>
              <th className="p-2 border-b text-sm md:text-base">Sort Order</th>
              <th className="p-2 border-b text-sm md:text-base">Action Type</th>
              <th className="p-2 border-b text-sm md:text-base">Action Button Text</th>
              <th className="p-2 border-b text-sm md:text-base">Status</th>
              <th className="p-2 border-b text-sm md:text-base text-center">Options</th>
            </tr>
          </thead>
          <tbody>
            {sliders.map((slider, index) => (
              <tr className="hover:bg-gray-100" key={slider._id}>
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{slider.title}</td>
                <td className="p-2 border-b">{slider.description}</td>
                <td className="p-2 border-b">{slider.sortOrder}</td>
                <td className="p-2 border-b">{slider.actionType}</td>
                <td className="p-2 border-b">{slider.actionButtonText}</td>
                <td className="p-2 border-b">{slider.status}</td>
                <td className="p-2 border-b text-center">
                  <button
                    onClick={() => handleOpenEditModal(slider)}
                    className="text-green-500 hover:text-green-600 mr-4"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDeleteClick(slider._id)}
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

export default ImageSliderManagement;
