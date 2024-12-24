import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import EditTvChannelModal from '../../Modals/AllTvChannel/EditTVChannelModal'; // Import the modal component
import { API_URLS } from '../../../../Apis/Globalapi';

const AllTvChannel = () => {
  const [tvChannels, setTvChannels] = useState([]);
  const [filteredTvChannels, setFilteredTvChannels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editChannel, setEditChannel] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch TV Channel data from API
  const fetchTvChannels = async () => {
    try {
      const response = await axios.get(API_URLS.tvchannels);
      
      // Log the data coming from the API
      console.log('Fetched TV Channels:', response.data);

      setTvChannels(response.data);
      setFilteredTvChannels(response.data);
    } catch (error) {
      console.error('Error fetching TV channels:', error);
    }
  };

  useEffect(() => {
    fetchTvChannels();
  }, []);

  // Handle search and filter
  const handleSearch = () => {
    let filteredData = tvChannels;

    if (searchTerm) {
      filteredData = filteredData.filter(channel =>
        channel.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter === 'Published') {
      filteredData = filteredData.filter(channel => channel.publish);
    } else if (statusFilter === 'Unpublished') {
      filteredData = filteredData.filter(channel => !channel.publish);
    }

    setFilteredTvChannels(filteredData);
  };

  const handleEditClick = (channel) => {
    setEditChannel(channel);
    setIsEditing(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${API_URLS.tvchannels}/${id}`);
      setTvChannels(tvChannels.filter(channel => channel._id !== id));
      setFilteredTvChannels(filteredTvChannels.filter(channel => channel._id !== id));
      alert("Data Deleted")
    } catch (error) {
      console.error('Error deleting channel:', error);
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">All TV Channels</h2>

      {/* Search and Filter Inputs */}
      <div className="flex justify-between mb-6">
      <a href="/admin/add-tv-channel">
  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    + Add TV Channel
  </button>
</a>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Published">Published</option>
            <option value="Unpublished">Unpublished</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white p-4 shadow-md rounded overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b text-sm md:text-base">#</th>
              <th className="p-2 border-b text-sm md:text-base">Thumbnail</th>
              <th className="p-2 border-b text-sm md:text-base">Name</th>
              <th className="p-2 border-b text-sm md:text-base text-center">Status</th>
              <th className="p-2 border-b text-sm md:text-base text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTvChannels.map((channel, index) => (
              <tr key={channel._id} className="hover:bg-gray-100">
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">
                  <img
                    src={channel.thumbnail}  // Directly use base64 URL
                    alt={`${channel.name} Thumbnail`}
                    className="w-12 h-12"
                  />
                </td>
                <td className="p-2 border-b">{channel.tvName}</td>
                <td className="p-2 border-b text-center">
                  {channel.publish ? 'Published' : 'Unpublished'}
                </td>
                <td className="p-2 border-b text-center">
                  <button
                    onClick={() => handleEditClick(channel)}
                    className="text-green-500 hover:text-green-600 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(channel._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit TV Channel Modal */}
      {isEditing && (
        <EditTvChannelModal
          channel={editChannel}
          onClose={() => setIsEditing(false)}
          onRefresh={() => {
            fetchTvChannels();
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
};

export default AllTvChannel;
