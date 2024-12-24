import React, { useState, useEffect } from 'react';

const EditMovieModal = ({ isOpen, onClose, movie, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (movie) {
      setFormData({
        _id: movie._id, // Ensuring _id is set
        title: movie.title,
        thumbnail: movie.thumbnail,
        poster: movie.poster,
        releaseDate: movie.releaseDate ? movie.releaseDate.split('T')[0] : '',
        description: movie.description,
        actors: movie.actors,
        directors: movie.directors,
        writers: movie.writers,
        genres: movie.genres,
        videoQuality: movie.videoQuality,
        runtime: movie.runtime,
        freePaid: movie.freePaid,
        enableDownload: movie.enableDownload,
        publish: movie.publish,
        sendNewsletter: movie.sendNewsletter,
        sendPushNotification: movie.sendPushNotification,
        trailerUrl: movie.trailerUrl,
        imdbRating: movie.imdbRating,
        slug: movie.slug,
      });
    }
  }, [movie]);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...movie, ...formData });
    alert("Data Updated")
    onClose();
  };


  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [type]: reader.result, // Save the base64 result
        });
      };
      reader.readAsDataURL(file); // Convert the file to base64
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto pt-96 mt-10 ">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl mt-44">
        <h2 className="text-xl font-semibold mb-4">Edit Movie</h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap">
          <div className="w-1/2 pr-2 mb-4">
            <label className="block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="px-4 py-2 border rounded w-full"
              required
            />
          </div>

         {/* Thumbnail URL */}
<div className='flex gap-x-10'>
  <div className="w-full mb-4">
    <label className="block mb-1">Thumbnail</label>
    {formData.thumbnail && (
      <div className="mt-2">
        <img
          src={formData.thumbnail}
          alt="Thumbnail Preview"
          className="w-32 h-32 object-cover mt-2 border rounded"
        />
      </div>
    )}
    <input
      type="file"
      onChange={(e) => handleImageChange(e, 'thumbnail')}
      accept="image/*"
      className="mt-2"
    />
  </div>

  {/* Poster URL */}
  <div className="w-full mb-4">
    <label className="block mb-1">Poster</label>
    {formData.poster && (
      <div className="mt-2">
        <img
          src={formData.poster}
          alt="Poster Preview"
          className="w-32 h-32 object-cover mt-2 border rounded"
        />
      </div>
    )}
    <input
      type="file"
      onChange={(e) => handleImageChange(e, 'poster')}
      accept="image/*"
      className="mt-2"
    />
  </div>
</div>

           

          <div className="w-1/2 pl-2 mb-4">
            <label className="block mb-1">Release Date</label>
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className="px-4 py-2 border rounded w-full"
              required
            />
          </div>

          <div className="w-1/2 pr-2 mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="px-4 py-2 border rounded w-full"
              required
            />
          </div>

          <div className="w-1/2 pl-2 mb-4">
            <label className="block mb-1">Actors</label>
            <input
              type="text"
              name="actors"
              value={formData.actors}
              onChange={handleChange}
              className="px-4 py-2 border rounded w-full"
              required
            />
          </div>

          <div className="w-1/2 pr-2 mb-4">
            <label className="block mb-1">Directors</label>
            <input
              type="text"
              name="directors"
              value={formData.directors}
              onChange={handleChange}
              className="px-4 py-2 border rounded w-full"
              required
            />
          </div>

          <div className="w-1/2 pl-2 mb-4">
            <label className="block mb-1">Writers</label>
            <input
              type="text"
              name="writers"
              value={formData.writers}
              onChange={handleChange}
              className="px-4 py-2 border rounded w-full"
              required
            />
          </div>

          <div className="w-1/2 pr-2 mb-4">
            <label className="block mb-1">Genres</label>
            <input
              type="text"
              name="genres"
              value={formData.genres}
              onChange={handleChange}
              className="px-4 py-2 border rounded w-full"
              required
            />
          </div>

          <div className="w-1/2 pl-2 mb-4">
            <label className="block mb-1">Video Quality</label>
            <input
              type="text"
              name="videoQuality"
              value={formData.videoQuality}
              onChange={handleChange}
              className="px-4 py-2 border rounded w-full"
              required
            />
          </div>

          <div className="w-1/2 pr-2 mb-4">
            <label className="block mb-1">Runtime</label>
            <input
              type="text"
              name="runtime"
              value={formData.runtime}
              onChange={handleChange}
              className="px-4 py-2 border rounded w-full"
              required
            />
          </div>

          <div className="w-1/2 pl-2 mb-4">
            <label className="block mb-1">Free/Paid</label>
            <select
              name="freePaid"
              value={formData.freePaid}
              onChange={handleChange}
              className="px-4 py-2 border rounded w-full"
              required
            >
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          <div className="w-1/2 pr-2 mb-4">
            <label className="block mb-1">Enable Download</label>
            <input
              type="checkbox"
              name="enableDownload"
              checked={formData.enableDownload}
              onChange={handleChange}
            />
          </div>

          <div className="w-1/2 pl-2 mb-4">
            <label className="block mb-1">Publish</label>
            <input
              type="checkbox"
              name="publish"
              checked={formData.publish}
              onChange={handleChange}
            />
          </div>

          <div className="w-1/2 pr-2 mb-4">
            <label className="block mb-1">Send Newsletter</label>
            <input
              type="checkbox"
              name="sendNewsletter"
              checked={formData.sendNewsletter}
              onChange={handleChange}
            />
          </div>

          <div className="w-1/2 pl-2 mb-4">
            <label className="block mb-1">Send Push Notification</label>
            <input
              type="checkbox"
              name="sendPushNotification"
              checked={formData.sendPushNotification}
              onChange={handleChange}
            />
          </div>

          <div className="w-1/2 pr-2 mb-4">
            <label className="block mb-1">Trailer URL</label>
            <input
              type="text"
              name="trailerUrl"
              value={formData.trailerUrl}
              onChange={handleChange}
              className="px-4 py-2 border rounded w-full"
            />
          </div>

          <div className="w-1/2 pl-2 mb-4">
            <label className="block mb-1">IMDB Rating</label>
            <input
              type="text"
              name="imdbRating"
              value={formData.imdbRating}
              onChange={handleChange}
              className="px-4 py-2 border rounded w-full"
            />
          </div>

          <div className="w-1/2 pr-2 mb-4">
            <label className="block mb-1">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="px-4 py-2 border rounded w-full"
              required
            />
          </div>

          <div className="w-full flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovieModal;