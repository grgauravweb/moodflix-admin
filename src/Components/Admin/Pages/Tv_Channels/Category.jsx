import React, { useState, useEffect } from 'react';
import { API_URLS } from '../../../../Apis/Globalapi';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Category = () => {
  const [categoryData, setCategoryData] = useState({
    liveTvCategory: '',
    description: '',
  });
  const [categoryList, setCategoryList] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(API_URLS.categories);
      const data = await response.json();
      setCategoryList(data);
    };

    fetchCategories();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  // Handle form submission (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editCategoryId ? 'PUT' : 'POST';
    const url = editCategoryId
      ? `${API_URLS.categories}/${editCategoryId}`
      : API_URLS.categories;

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });

    if (response.ok) {
      const updatedCategory = await response.json();

      // Update category list based on whether adding or editing
      if (editCategoryId) {
        setCategoryList(
          categoryList.map((category) =>
            category._id === editCategoryId ? updatedCategory : category
          )
        );
      } else {
        setCategoryList([...categoryList, updatedCategory]);
      }

      // Reset form data
      setCategoryData({ liveTvCategory: '', description: '' });
      setEditCategoryId(null);
      setShowModal(false); // Close modal after submit

      alert('Category saved successfully!');
    } else {
      alert('Failed to save category. Please try again.');
    }
  };

  // Handle edit category
  const handleEdit = (category) => {
    setCategoryData({
      liveTvCategory: category.liveTvCategory,
      description: category.description,
    });
    setEditCategoryId(category._id);
    setShowModal(true); // Open modal
  };

  // Handle delete category
  const handleDelete = async (id) => {
    const response = await fetch(`${API_URLS.categories}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setCategoryList(categoryList.filter((category) => category._id !== id));
      alert('Category deleted successfully!');
    } else {
      alert('Failed to delete category. Please try again.');
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Add TV Channel Category</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Live TV Category</label>
          <input
            type="text"
            name="liveTvCategory"
            value={categoryData.liveTvCategory}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter live TV category"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={categoryData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter category description"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editCategoryId ? 'Update Category' : 'Add Category'}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">TV Channel Category List</h3>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((category, index) => (
            <tr key={category._id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{category.liveTvCategory}</td>
              <td className="border px-4 py-2">{category.description}</td>
              <td className="border px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="text-xl text-yellow-500 hover:text-yellow-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="text-xl text-red-500 hover:text-red-600"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Category</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Live TV Category</label>
                <input
                  type="text"
                  name="liveTvCategory"
                  value={categoryData.liveTvCategory}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter live TV category"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={categoryData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter category description"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update Category
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-red-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
