import React, { useState, useEffect } from 'react';
import AddGuide from './Modals/AddGuide';
import EditGuide from './Modals/editGuide';  // Import the Edit Modal
import { FaEdit, FaTrashAlt } from 'react-icons/fa';  // Import the icons
import { API_URLS } from '../../../../Apis/Globalapi';

const ProgramGuide = () => {
  const [programList, setProgramList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProgram, setEditProgram] = useState(null);  // To hold the program data for editing
  const [filters, setFilters] = useState({
    date: '',
    channel: 'All Channels',
    type: 'All'
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const fetchPrograms = async (searchFilters = {}) => {
    const queryParams = new URLSearchParams(searchFilters).toString();
    const response = await fetch(`${API_URLS.programs}?${queryParams}`);
    const data = await response.json();
    setProgramList(data);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleSearch = () => {
    fetchPrograms(filters);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);  // Close Edit Modal

  const handleEdit = (program) => {
    setEditProgram(program);
    setShowEditModal(true);  // Open the edit modal with program data
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      const response = await fetch(`${API_URLS.programs}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setProgramList(programList.filter(program => program._id !== id));
        alert("User deleted successfully!");
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const period = +hours >= 12 ? 'PM' : 'AM';
    const formattedHours = +hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">TV Program Guide Management</h2>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleShowModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Guide
        </button>

        <div className="flex space-x-4">
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1"
            placeholder="Select Date"
          />
          <select
            name="channel"
            value={filters.channel}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1"
          >
            <option>All Channels</option>
            <option>Channel 1</option>
            <option>Channel 2</option>
          </select>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1"
          >
            <option>All</option>
            <option>On Aired</option>
            <option>Upcoming</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">TV Channel</th>
            <th className="border px-4 py-2">Program Title</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Time</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {programList.map((program, index) => (
            <tr key={program._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">{program.tvChannel}</td>
              <td className="border px-4 py-2">{program.programTitle}</td>
              <td className="border px-4 py-2">{formatDate(program.date)}</td>
              <td className="border px-4 py-2">{formatTime(program.time)}</td>
              <td className="border px-4 py-2">{program.type}</td>
              <td className="border px-4 py-2">{program.status}</td>
              <td className="border px-4 py-2 flex space-x-2">
                <FaEdit
                  className="cursor-pointer text-blue-500"
                  onClick={() => handleEdit(program)}
                />
                <FaTrashAlt
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDelete(program._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && <AddGuide closeModal={handleCloseModal} />}
      {showEditModal && (
        <EditGuide
          program={editProgram}
          closeModal={handleCloseEditModal}
          fetchPrograms={fetchPrograms}
        />
      )}
    </div>
  );
};

export default ProgramGuide;
