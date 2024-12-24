import React, { useState } from 'react';
import { API_URLS } from '../../../../../Apis/Globalapi';

const AddGenre = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState(null);
  const [slug, setSlug] = useState('');
  const [featured, setFeatured] = useState('Non Featured');
  const [status, setStatus] = useState('Published');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let iconBase64 = '';
    if (icon) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        iconBase64 = reader.result; // This will be the base64 URL

        const genreData = {
          name,
          description,
          slug,
          featured: featured === 'Featured', // Convert to boolean
          status,
          icon: iconBase64 // Use the base64 string
        };

        try {
          const response = await fetch(API_URLS.genre, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(genreData), // Send JSON data
          });

          if (response.ok) {
            const newGenre = await response.json();
            onAdd(newGenre); // Pass new genre to the parent
            onClose(); // Close the modal after successful addition
            alert("Date Saved")
          } else {
            const errorData = await response.json();
            console.error('Error:', errorData.message);
            alert('Failed to add genre: ' + errorData.message);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Failed to add genre: ' + error.message);
        }
      };
      reader.readAsDataURL(icon); // Convert the image file to base64
    } else {
      // If there's no icon, just proceed to create the genre without it
      const genreData = {
        name,
        description,
        slug,
        featured: featured === 'Featured',
        status,
      };

      try {
        const response = await fetch(API_URLS.genre, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(genreData),
        });

        if (response.ok) {
          const newGenre = await response.json();
          onAdd(newGenre);
          onClose();
        } else {
          const errorData = await response.json();
          console.error('Error:', errorData.message);
          alert('Failed to add genre: ' + errorData.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to add genre: ' + error.message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-20 p-5">
      <div className="bg-white rounded p-4 max-w-sm w-full overflow-hidden shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Add Genre</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border w-full p-1 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border w-full p-1 rounded"
              required
              rows={2}
            />
          </div>

          <div className="mb-3 flex flex-col items-center">
            <label className="block mb-1">Icon</label>
            <input
              type="file"
              accept=".png"
              onChange={(e) => setIcon(e.target.files[0])}
              className="border w-full p-1 rounded mb-1"
            />
            <img
              src={icon ? URL.createObjectURL(icon) : 'https://via.placeholder.com/100?text=No+Image'}
              alt="Selected Icon"
              className="w-20 h-20 mt-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="border w-full p-1 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Featured</label>
            <select
              value={featured}
              onChange={(e) => setFeatured(e.target.value)}
              className="border w-full p-1 rounded"
            >
              <option value="Non Featured">Non Featured</option>
              <option value="Featured">Featured</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block mb-1">Publication</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border w-full p-1 rounded"
            >
              <option value="Published">Published</option>
              <option value="Unpublished">Unpublished</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded mr-2 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200"
            >
              Add Genre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGenre;
