import React, { useState, useEffect } from 'react';

const EditGenre = ({ isOpen, onClose, onUpdate, editingGenre }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(null);
  const [iconBase64, setIconBase64] = useState(''); // To hold the base64 string
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (editingGenre) {
      setName(editingGenre.name);
      setIcon(null); // Resetting the file input
      setIconBase64(editingGenre.icon); // Set base64 icon from editing genre
      setSlug(editingGenre.slug);
      setDescription(editingGenre.description);
      setFeatured(editingGenre.featured);
      setStatus(editingGenre.status);
    }
  }, [editingGenre]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedIconBase64 = iconBase64;

    if (icon) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedIconBase64 = reader.result; // Update with the new base64 URL
        const updatedGenre = {
          _id: editingGenre._id,
          name,
          icon: updatedIconBase64,
          slug,
          description,
          featured,
          status,
        };
        onUpdate(updatedGenre);
      };
      reader.readAsDataURL(icon); // Convert the image file to base64
    } else {
      // Use existing icon if no new icon is uploaded
      const updatedGenre = {
        _id: editingGenre._id,
        name,
        icon: iconBase64,
        slug,
        description,
        featured,
        status,
      };
      onUpdate(updatedGenre);
    }

    onClose();
    alert("Data Updated");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Genre</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Icon</label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={(e) => setIcon(e.target.files[0])}
              className="border rounded p-2 w-full"
            />
            {iconBase64 && (
              <img
                src={iconBase64}
                alt="Current Icon"
                className="w-20 h-20 mt-2 border border-gray-300 rounded"
              />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Featured</label>
            <input
              type="checkbox"
              checked={featured}
              onChange={() => setFeatured(!featured)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded p-2 w-full"
              required
            >
              <option value="" disabled>Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Update Genre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGenre;
