import React, { useState, useEffect } from 'react';

const UserManagementModal = ({ isOpen, onClose, onAdd, userData, onInputChange, editMode }) => {
  const [localData, setLocalData] = useState(userData);

  // Sync the form data with the userData prop when modal is opened
  useEffect(() => {
    setLocalData(userData);
  }, [isOpen, userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(localData); // Call the onAdd function passed as a prop (either handleSubmit or handleUpdate)
    alert("Date Saved")
  };

  if (!isOpen) return null; // Don't render the modal if it's closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit User' : 'Add User'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={localData.fullName}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={localData.email}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
  <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
  <select
    id="role"
    name="role"
    value={localData.role}
    onChange={onInputChange}
    className="w-full p-2 border rounded"
    required
  >
    <option value="" disabled>Select Role</option> {/* Placeholder option */}
    <option value="Admin">Admin</option>
    <option value="User">User</option>
  </select>
</div>


          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={localData.password}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
              required={!editMode} 
              placeholder='xxxxxxxxxxx'
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editMode ? 'Update User' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserManagementModal;
