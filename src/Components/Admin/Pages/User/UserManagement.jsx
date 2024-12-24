import React, { useState, useEffect } from 'react';
import { API_URLS } from '../../../../Apis/Globalapi';
import UserManagementModal from '../../Modals/User/UserMangementModal'; // Ensure this path is correct
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import React Icons

const UserManagement = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    role: '',
    password: '', // password for user creation
  });
  const [userList, setUserList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // Track user being edited

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(API_URLS.users);
      const data = await response.json();
      setUserList(data);
    };

    fetchUsers();
  }, []);

  // Handle input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle form submission (creating a new user)
  const handleSubmit = async (newUser) => {
    const response = await fetch(API_URLS.users, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      const savedUser = await response.json();
      setUserList([...userList, savedUser]);
      setModalOpen(false);
      alert("Date Saved")
    } else {
      console.error('Failed to add user');
    }
  };

  // Handle edit functionality
  const handleEdit = (user) => {
    setUserData({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      password: '', // Don't pre-fill password during edit
    });
    setEditMode(true);
    setEditingUser(user);
    setModalOpen(true);
  };

  // Handle update functionality (for editing)
  const handleUpdate = async (updatedUser) => {
    const response = await fetch(`${API_URLS.users}/${editingUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
      const savedUser = await response.json();
      setUserList(userList.map(user => (user._id === savedUser._id ? savedUser : user)));
      setModalOpen(false);
      setEditMode(false);
    } else {
      console.error('Failed to update user');
    }
  };

  // Handle delete functionality
  const handleDelete = async (userId) => {
    const response = await fetch(`${API_URLS.users}/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setUserList(userList.filter(user => user._id !== userId));
      alert("User deleted successfully!");
    } else {
      console.error('Failed to delete user');
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">User Management</h2>

      <button
        onClick={() => setModalOpen(true)} // Open modal to add a new user
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600"
      >
        Add User
      </button>

      <UserManagementModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={editMode ? handleUpdate : handleSubmit} // Submit function changes based on editMode
        userData={userData} // Pass userData to modal
        onInputChange={handleInputChange}
        editMode={editMode}
      />

      <h3 className="text-xl font-semibold mb-4">User List</h3>
      <table className="min-w-full border text-center">
  <thead>
    <tr className="bg-gray-200">
      <th className="border px-4 py-2">#</th>
      <th className="border px-4 py-2">Full Name</th>
      <th className="border px-4 py-2">Email</th>
      <th className="border px-4 py-2">Role</th>
      <th className="border px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {userList.map((user, index) => (
      <tr key={user._id}>
        <td className="border px-4 py-2">{index + 1}</td> {/* Sequential index */}
        <td className="border px-4 py-2">{user.fullName}</td> {/* User full name */}
        <td className="border px-4 py-2">{user.email}</td> {/* User email */}
        <td className="border px-4 py-2">{user.role}</td> {/* User role */}
        <td className="border px-4 py-2">
          {/* Edit and Delete actions */}
          <button onClick={() => handleEdit(user)} className="text-blue-500 mx-2">
            <FaEdit />
          </button>
          <button onClick={() => handleDelete(user._id)} className="text-red-500 mx-2">
            <FaTrashAlt />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default UserManagement;
