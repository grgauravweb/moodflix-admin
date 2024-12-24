import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { API_URLS } from "../../../../Apis/Globalapi";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(API_URLS.movieRequests);
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const handleOpenEditModal = (report) => {
    setEditingReport(report);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingReport(null);
  };

  const handleUpdateReport = async (updatedReport) => {
    try {
      const response = await fetch(`${API_URLS.movieRequests}/${updatedReport._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReport),
      });

      if (!response.ok) {
        throw new Error("Failed to update report");
      }

      const data = await response.json();
      setReports(reports.map((report) => (report._id === data._id ? data : report)));
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  const handleDeleteClick = async (reportId) => {
    try {
      const response = await fetch(`${API_URLS.movieRequests}/${reportId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete report");
      }

      setReports(reports.filter((report) => report._id !== reportId));
      alert("deleted successfully!");
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Report Management</h1>

      <div className="bg-white p-4 shadow-md rounded overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b text-sm md:text-base">#</th>
              <th className="p-2 border-b text-sm md:text-base">Option</th>
              <th className="p-2 border-b text-sm md:text-base">Title</th>
              <th className="p-2 border-b text-sm md:text-base">Issue</th>
              <th className="p-2 border-b text-sm md:text-base">Message</th>
              <th className="p-2 border-b text-sm md:text-base">Report Date</th>
              <th className="p-2 border-b text-sm md:text-base">Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr className="hover:bg-gray-100" key={report._id}>
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b text-center">
                  <button
                    onClick={() => handleOpenEditModal(report)}
                    className="text-green-500 hover:text-green-600 mr-4"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDeleteClick(report._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
                <td className="p-2 border-b">{report.title}</td>
                <td className="p-2 border-b">{report.issue}</td>
                <td className="p-2 border-b">{report.message}</td>
                <td className="p-2 border-b">{new Date(report.reportDate).toLocaleDateString()}</td>
                <td className="p-2 border-b">{report.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
