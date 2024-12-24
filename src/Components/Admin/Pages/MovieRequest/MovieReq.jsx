import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { API_URLS } from "../../../../Apis/Globalapi";

const MovieReq = () => {
  const [requests, setRequests] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(API_URLS.movieRequests);
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleOpenEditModal = (request) => {
    setEditingRequest(request);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingRequest(null);
  };

  const handleUpdateRequest = async (updatedRequest) => {
    try {
      const response = await fetch(`${API_URLS.movieRequests}/${updatedRequest._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRequest),
      });

      if (!response.ok) {
        throw new Error("Failed to update request");
      }

      const data = await response.json();
      setRequests(requests.map((req) => (req._id === data._id ? data : req)));
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  const handleDeleteClick = async (requestId) => {
    try {
      const response = await fetch(`${API_URLS.movieRequests}/${requestId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete request");
      }

      setRequests(requests.filter((req) => req._id !== requestId));
      alert("deleted successfully!");
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Request Management</h1>

      <div className="bg-white p-4 shadow-md rounded overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b text-sm md:text-base">#</th>
              <th className="p-2 border-b text-sm md:text-base">Option</th>
              <th className="p-2 border-b text-sm md:text-base">Full Name</th>
              <th className="p-2 border-b text-sm md:text-base">Email</th>
              <th className="p-2 border-b text-sm md:text-base">Request Movie</th>
              <th className="p-2 border-b text-sm md:text-base">Message</th>
              <th className="p-2 border-b text-sm md:text-base">Request Date</th>
              <th className="p-2 border-b text-sm md:text-base">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr className="hover:bg-gray-100" key={request._id}>
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b text-center">
                  <button
                    onClick={() => handleOpenEditModal(request)}
                    className="text-green-500 hover:text-green-600 mr-4"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDeleteClick(request._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
                <td className="p-2 border-b">{request.fullName}</td>
                <td className="p-2 border-b">{request.email}</td>
                <td className="p-2 border-b">{request.requestMovie}</td>
                <td className="p-2 border-b">{request.message}</td>
                <td className="p-2 border-b">{new Date(request.requestDate).toLocaleDateString()}</td>
                <td className="p-2 border-b">{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieReq;
