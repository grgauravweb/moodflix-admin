import React, { useState, useEffect } from 'react';
import { API_URLS } from '../../../../Apis/Globalapi';

const AddTvChannel = () => {
  const [tvChannelData, setTvChannelData] = useState({
    tvName: '',
    description: '',
    category: '',
    streamFrom: 'HLS',
    label: 'HD',
    streamUrl: '',
    streamFromOptional1: 'HLS',
    labelOptional1: 'SD',
    streamUrlOptional1: '',
    streamFromOptional2: 'HLS',
    labelOptional2: 'LQ',
    streamUrlOptional2: '',
    freePaid: 'Paid',
    thumbnail: null,
    poster: null,
    publish: false,
    featured: false,
  });

  const [categories, setCategories] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTvChannelData({
      ...tvChannelData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setTvChannelData({
      ...tvChannelData,
      [name]: files[0],
    });
  };

  const handleSubmit = async () => {
    try {
      // Convert thumbnail and poster images to base64
      const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };
  
      // Convert thumbnail and poster if available
      const thumbnailBase64 = tvChannelData.thumbnail
        ? await convertToBase64(tvChannelData.thumbnail)
        : null;
      const posterBase64 = tvChannelData.poster
        ? await convertToBase64(tvChannelData.poster)
        : null;
  
      // Prepare data to send
      const formData = {
        ...tvChannelData,
        thumbnail: thumbnailBase64,
        poster: posterBase64,
      };
  
      // Send data to the backend
      const response = await fetch(API_URLS.tvchannel, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check response status
      if (response.ok) {
        const result = await response.json();
        console.log('TV Channel created successfully:', result);
        alert("Data saved sucessfully")
        window.location.reload()
        // Optionally, reset form or handle success response
      } else {
        const error = await response.json();
        console.error('Failed to create TV Channel:', error);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_URLS.categories);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []); // Missing dependencies for 'data'

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Add New TV Channel</h2>

      <div className="flex gap-6">
        {/* TV Channel Info Section */}
        <div className="bg-white p-4 space-y-4 rounded shadow-md flex-1">
          <h3 className="text-lg font-semibold">TV Channel Info</h3>

          {/* TV Name */}
          <div>
            <label className="block text-sm font-medium mb-1">TV Name</label>
            <input
              type="text"
              name="tvName"
              value={tvChannelData.tvName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter TV channel name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={tvChannelData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={tvChannelData.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.liveTvCategory}>
                  {category.liveTvCategory}
                </option>
              ))}
            </select>
          </div>

          {/* Stream Rows */}
          {[
            {
              name: "streamFrom",
              label: "label",
              url: "streamUrl",
              labelText: "Primary Stream",
              defaultLabel: "HD",
              placeholder: "Primary/high quality stream URL"
            },
            {
              name: "streamFromOptional1",
              label: "labelOptional1",
              url: "streamUrlOptional1",
              labelText: "Optional Stream (SD)",
              defaultLabel: "SD",
              placeholder: "Standard quality stream URL"
            },
            {
              name: "streamFromOptional2",
              label: "labelOptional2",
              url: "streamUrlOptional2",
              labelText: "Optional Stream (LQ)",
              defaultLabel: "LQ",
              placeholder: "Low quality stream URL"
            }
          ].map((stream, index) => (
            <div className="flex gap-4 items-end mt-4" key={index}>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">{stream.labelText}</label>
                <select
                  name={stream.name}
                  value={tvChannelData[stream.name]}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="HLS">HLS/M3U8/HTTP</option>
                  <option value="M3U8">RTMP</option>
                  <option value="HTTP">Youtube Live</option>
                  <option value="HTTP">Embeded</option>
                  <option value="HTTP">From</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Label</label>
                <input
                  type="text"
                  name={stream.label}
                  value={tvChannelData[stream.label]}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder={stream.defaultLabel}
                />
              </div>

              <div className="flex-2">
                <label className="block text-sm font-medium mb-1">Stream URL</label>
                <input
                  type="text"
                  name={stream.url}
                  value={tvChannelData[stream.url]}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder={stream.placeholder}
                />
              </div>
            </div>
          ))}

          {/* Free/Paid */}
          <div>
            <label className="block text-sm font-medium mb-1">Free/Paid</label>
            <select
              name="freePaid"
              value={tvChannelData.freePaid}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>

        {/* Thumbnail & Poster Image Section */}
        <div className="bg-white p-4 space-y-4 rounded shadow-md flex-1">
          <h3 className="text-lg font-semibold">Thumbnail & Poster Image</h3>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail</label>
            <div className="border border-dashed border-gray-400 rounded p-4 flex flex-col items-center">
              {tvChannelData.thumbnail ? (
                <img
                  src={URL.createObjectURL(tvChannelData.thumbnail)}
                  alt="Thumbnail Preview"
                  className="w-full h-32 object-cover mb-2"
                />
              ) : (
                <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500">
                  No image chosen
                </div>
              )}
              <input
                type="file"
                name="thumbnail"
                onChange={handleFileChange}
                className="mt-2"
              />
            </div>
          </div>

          {/* Poster */}
          <div>
            <label className="block text-sm font-medium mb-1">Poster</label>
            <div className="border border-dashed border-gray-400 rounded p-4 flex flex-col items-center">
              {tvChannelData.poster ? (
                <img
                  src={URL.createObjectURL(tvChannelData.poster)}
                  alt="Poster Preview"
                  className="w-full h-32 object-cover mb-2"
                />
              ) : (
                <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500">
                  No image chosen
                </div>
              )}
              <input
                type="file"
                name="poster"
                onChange={handleFileChange}
                className="mt-2"
              />
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-col space-y-2">
            <label>
              <input
                type="checkbox"
                name="publish"
                checked={tvChannelData.publish}
                onChange={handleInputChange}
              />{' '}
              Publish
            </label>
            <label>
              <input
                type="checkbox"
                name="featured"
                checked={tvChannelData.featured}
                onChange={handleInputChange}
              />{' '}
              Featured
            </label>
          </div>
        </div>
      </div>

      {/* Create Button */}
      <button
        onClick={handleSubmit}
        className="w-full p-4 bg-blue-600 text-white rounded mt-6"
      >
        Create TV Channel
      </button>
    </div>
  );
};

export default AddTvChannel;
