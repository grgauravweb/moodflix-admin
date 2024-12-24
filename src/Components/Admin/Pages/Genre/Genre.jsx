import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddGenre from "../../Modals/CountryManagemnet/Genre/AddGenre";
import EditGenre from "../../Modals/CountryManagemnet/Genre/EditGenre";
import { API_URLS } from "../../../../Apis/Globalapi";

const GenreManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [editingGenre, setEditingGenre] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(API_URLS.genre);
        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (genre) => {
    setEditingGenre(genre);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingGenre(null);
  };

  const handleAddGenre = (newGenre) => {
    setGenres([...genres, newGenre]);
    handleCloseAddModal();
  };

  const handleUpdateGenre = async (updatedGenre) => {
    try {
      const response = await fetch(`${API_URLS.genre}/${updatedGenre._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGenre),
      });

      if (!response.ok) {
        throw new Error("Failed to update genre");
      }

      const data = await response.json();

      setGenres(genres.map((genre) => (genre._id === data._id ? data : genre)));
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating genre:", error);
    }
  };

  const handleDeleteClick = async (genreId) => {
    if (window.confirm("Are you sure you want to delete this genre?")) {
      try {
        const response = await fetch(`${API_URLS.genre}/${genreId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete genre");
        }

        setGenres(genres.filter((genre) => genre._id !== genreId));
        alert("deleted successfully!");
      } catch (error) {
        console.error("Error deleting genre:", error);
      }
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Genre Management</h2>

      <button
        onClick={handleOpenAddModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600"
      >
        + Add Genre
      </button>

      <AddGenre
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAdd={handleAddGenre}
      />

      <EditGenre
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onUpdate={handleUpdateGenre}
        editingGenre={editingGenre}
      />

      <div className="bg-white p-4 shadow-md rounded overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b text-sm md:text-base">Sl</th>
              <th className="p-2 border-b text-sm md:text-base">Name</th>
              <th className="p-2 border-b text-sm md:text-base">Icon</th>
              <th className="p-2 border-b text-sm md:text-base">Slug</th>
              <th className="p-2 border-b text-sm md:text-base">Description</th>
              <th className="p-2 border-b text-sm md:text-base">Featured</th>
              <th className="p-2 border-b text-sm md:text-base">Status</th>
              <th className="p-2 border-b text-sm md:text-base text-center">Options</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre, index) => (
              <tr className="hover:bg-gray-100" key={genre._id}>
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{genre.name}</td>
                <td className="p-2 border-b">
                  <img
                    src={genre.icon}
                    alt={genre.name}
                    className="w-6 h-6 inline-block"
                  />
                </td>
                <td className="p-2 border-b">{genre.slug}</td>
                <td className="p-2 border-b">{genre.description}</td>
                <td className="p-2 border-b">{genre.featured ? "Featured" : "Non Featured"}</td>
                <td className="p-2 border-b">{genre.status}</td>
                <td className="p-2 border-b text-center">
                  <button
                    onClick={() => handleOpenEditModal(genre)}
                    className="text-green-500 hover:text-green-600 mr-4"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDeleteClick(genre._id)}
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

export default GenreManagement;
