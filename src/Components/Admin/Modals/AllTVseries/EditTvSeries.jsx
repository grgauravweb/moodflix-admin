import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URLS } from '../../../../Apis/Globalapi';

const EditTvSeries = ({ series, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({ ...series });
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [posterPreview, setPosterPreview] = useState('');

  // Use effect to update previews when series prop changes
  useEffect(() => {
    if (series) {
      setFormData({ ...series });
      setThumbnailPreview(series.thumbnail || '');
      setPosterPreview(series.poster || '');
    }
  }, [series]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'thumbnail') {
          setThumbnailPreview(reader.result);
          setFormData((prev) => ({ ...prev, thumbnail: reader.result }));
        } else if (type === 'poster') {
          setPosterPreview(reader.result);
          setFormData((prev) => ({ ...prev, poster: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URLS.EditTvSeries}/${series._id}`, formData);
      onRefresh(); // Refresh the list after updating
      onClose(); // Close the modal after successful update
      alert("Data Updated");
    } catch (error) {
      console.error('Error updating TV series:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto pt-56">
      <div className="bg-white p-6 rounded shadow-md w-2/4  ">
        <h3 className="text-xl mb-4 text-center font-semibold">Edit TV Series</h3>
        <form onSubmit={handleSubmit} className="flex flex-wrap">
          {/* Left Column */}
          <div className="w-1/2 p-2">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter the title"
                className="border rounded px-2 py-1 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a brief description"
                className="border rounded px-2 py-1 w-full"
                rows="3"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="genres" className="block text-sm font-medium mb-1">Genres</label>
              <input
                type="text"
                id="genres"
                name="genres"
                value={formData.genres}
                onChange={handleChange}
                placeholder="Enter genres (comma-separated)"
                className="border rounded px-2 py-1 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="directors" className="block text-sm font-medium mb-1">Directors</label>
              <input
                type="text"
                id="directors"
                name="directors"
                value={formData.directors}
                onChange={handleChange}
                placeholder="Enter directors (comma-separated)"
                className="border rounded px-2 py-1 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="actors" className="block text-sm font-medium mb-1">Actors</label>
              <input
                type="text"
                id="actors"
                name="actors"
                value={formData.actors}
                onChange={handleChange}
                placeholder="Enter actors (comma-separated)"
                className="border rounded px-2 py-1 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="writers" className="block text-sm font-medium mb-1">Writers</label>
              <input
                type="text"
                id="writers"
                name="writers"
                value={formData.writers}
                onChange={handleChange}
                placeholder="Enter writers (comma-separated)"
                className="border rounded px-2 py-1 w-full"
                required
              />
            </div>

            {/* Thumbnail Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Thumbnail</label>
              {thumbnailPreview && (
               <img
               src={`data:image/jpeg;base64,${series.thumbnail}`} 
               alt={`${series.title} Thumbnail`}
               className="w-12 h-12"
             />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'thumbnail')}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/2 p-2">
            <div className="mb-4">
              <label htmlFor="countries" className="block text-sm font-medium mb-1">Countries</label>
              <input
                type="text"
                id="countries"
                name="countries"
                value={formData.countries}
                onChange={handleChange}
                placeholder="Enter countries (comma-separated)"
                className="border rounded px-2 py-1 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="imdbRating" className="block text-sm font-medium mb-1">IMDB Rating</label>
              <input
                type="text"
                id="imdbRating"
                name="imdbRating"
                value={formData.imdbRating}
                onChange={handleChange}
                placeholder="Enter IMDB rating"
                className="border rounded px-2 py-1 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="trailerUrl" className="block text-sm font-medium mb-1">Trailer URL</label>
              <input
                type="text"
                id="trailerUrl"
                name="trailerUrl"
                value={formData.trailerUrl}
                onChange={handleChange}
                placeholder="Enter trailer URL"
                className="border rounded px-2 py-1 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="videoQuality" className="block text-sm font-medium mb-1">Video Quality</label>
              <input
                type="text"
                id="videoQuality"
                name="videoQuality"
                value={formData.videoQuality}
                onChange={handleChange}
                placeholder="Enter video quality"
                className="border rounded px-2 py-1 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="runtime" className="block text-sm font-medium mb-1">Runtime</label>
              <input
                type="text"
                id="runtime"
                name="runtime"
                value={formData.runtime}
                onChange={handleChange}
                placeholder="Enter runtime"
                className="border rounded px-2 py-1 w-full"
                required
              />
            </div>

            <div className="mb-4">
  <label htmlFor="releaseDate" className="block text-sm font-medium mb-1">Release Date</label>
  <input
    type="date"
    id="releaseDate"
    name="releaseDate"
    value={formData.releaseDate ? formData.releaseDate.split('T')[0] : ''} // Only split if value is not null
    onChange={handleChange}
    className="border rounded px-2 py-1 w-full"
    required
  />
</div>

            <div className="mb-4">
              <label htmlFor="slug" className="block text-sm font-medium mb-1">Slug</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="Enter slug"
                className="border rounded px-2 py-1 w-full"
                required
              />
            </div>

            {/* Poster Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Poster</label>
              {posterPreview && (
               <img
               src={`data:image/jpeg;base64,${series.poster}`} 
               alt={`${series.title} Thumbnail`}
               className="w-12 h-12"
             />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'poster')}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTvSeries;
