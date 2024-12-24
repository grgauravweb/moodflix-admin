import React, { useState, useEffect } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";

const EditTVChannelModal = ({ channel, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    tvName: "",
    description: "",
    featured: false,
    freePaid: "",
    label: "",
    labelOptional1: "",
    labelOptional2: "",
    poster: "",
    publish: false,
    streamFrom: "",
    streamFromOptional1: "",
    streamFromOptional2: "",
    streamUrl: "",
    streamUrlOptional1: "",
    streamUrlOptional2: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (channel) {
      setFormData({
        tvName: channel.tvName,
        description: channel.description,
        featured: channel.featured,
        freePaid: channel.freePaid,
        label: channel.label,
        labelOptional1: channel.labelOptional1,
        labelOptional2: channel.labelOptional2,
        poster: channel.poster,
        publish: channel.publish,
        streamFrom: channel.streamFrom,
        streamFromOptional1: channel.streamFromOptional1,
        streamFromOptional2: channel.streamFromOptional2,
        streamUrl: channel.streamUrl,
        streamUrlOptional1: channel.streamUrlOptional1,
        streamUrlOptional2: channel.streamUrlOptional2,
        thumbnail: channel.thumbnail,
      });
    }
  }, [channel]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_URLS.editTvChannels}/${channel._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        onRefresh(); // Refresh the channel list
        onClose();
        alert("Data Updated"); // Close the modal
      } else {
        console.error("Failed to update channel");
      }
    } catch (error) {
      console.error("Error updating channel:", error);
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [type]: reader.result, // Save the base64 result to the correct field
        });
      };
      reader.readAsDataURL(file); // Convert the file to base64
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 pt-56 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-4xl overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Edit TV Channel</h2>
        <form onSubmit={handleSubmit} className="flex flex-row">
          <div className="flex-1 mr-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">TV Name</label>
              <input
                type="text"
                name="tvName"
                value={formData.tvName}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Free/Paid
              </label>
              <select
                name="freePaid"
                value={formData.freePaid}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              >
                <option value="">Select</option>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Label</label>
              <input
                type="text"
                name="label"
                value={formData.label}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Optional Label 1
              </label>
              <input
                type="text"
                name="labelOptional1"
                value={formData.labelOptional1}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Optional Label 2
              </label>
              <input
                type="text"
                name="labelOptional2"
                value={formData.labelOptional2}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
            </div>

         {/* Poster (Image Preview) */}
<div className="mb-4">
  <label className="block text-sm font-medium mb-1">
    Poster
  </label>
  <div className="flex items-center">
    {formData.poster && (
      <img
        src={formData.poster}
        alt="Poster Preview"
        className="w-32 h-32 object-cover rounded-lg mr-4"
      />
    )}
    <input
      type="file"
      onChange={(e) => handleImageChange(e, "poster")}
      accept="image/*"
      className="mt-2"
    />
  </div>
</div>

{/* Thumbnail (Image Preview) */}
<div className="mb-4">
  <label className="block text-sm font-medium mb-1">
    Thumbnail
  </label>
  <div className="flex items-center">
    {formData.thumbnail && (
      <img
        src={formData.thumbnail}
        alt="Thumbnail Preview"
        className="w-32 h-32 object-cover rounded-lg mr-4"
      />
    )}
    <input
      type="file"
      onChange={(e) => handleImageChange(e, "thumbnail")}
      accept="image/*"
      className="mt-2"
    />
  </div>
</div>



          </div>

          <div className="flex-1 ml-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Publish</label>
              <input
                type="checkbox"
                name="publish"
                checked={formData.publish}
                onChange={handleChange}
                className="mr-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Featured</label>
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="mr-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Stream From
              </label>
              <input
                type="text"
                name="streamFrom"
                value={formData.streamFrom}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Stream From Optional 1
              </label>
              <input
                type="text"
                name="streamFromOptional1"
                value={formData.streamFromOptional1}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Stream From Optional 2
              </label>
              <input
                type="text"
                name="streamFromOptional2"
                value={formData.streamFromOptional2}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Stream URL
              </label>
              <input
                type="text"
                name="streamUrl"
                value={formData.streamUrl}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Stream URL Optional 1
              </label>
              <input
                type="text"
                name="streamUrlOptional1"
                value={formData.streamUrlOptional1}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Stream URL Optional 2
              </label>
              <input
                type="text"
                name="streamUrlOptional2"
                value={formData.streamUrlOptional2}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
            </div>
          </div>
        </form>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTVChannelModal;
