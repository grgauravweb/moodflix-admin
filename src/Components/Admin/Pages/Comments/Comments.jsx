import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { API_URLS } from "../../../../Apis/Globalapi";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(API_URLS.comment);
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const filteredComments = comments
    .filter((comment) => {
      if (filter === "all") return true;
      return comment.status.toLowerCase() === filter.toLowerCase();
    })
    .filter((comment) => 
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Movie/TV-Series Comments Management</h2>

      {/* Search and Filter */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search comments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-4"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="unapproved">Unapproved</option>
          <option value="spam">Spam</option>
          <option value="trash">Trash</option>
        </select>
      </div>

      <div className="bg-white p-4 shadow-md rounded overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b text-sm md:text-base">Sl</th>
              <th className="p-2 border-b text-sm md:text-base">Author</th>
              <th className="p-2 border-b text-sm md:text-base">Comment</th>
              <th className="p-2 border-b text-sm md:text-base">In Response To</th>
              <th className="p-2 border-b text-sm md:text-base">Submitted On</th>
              <th className="p-2 border-b text-sm md:text-base">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentComments.length > 0 ? (
              currentComments.map((comment, index) => (
                <tr className="hover:bg-gray-100" key={comment._id}>
                  <td className="p-2 border-b">{index + 1}</td>
                  <td className="p-2 border-b">{comment.author}</td>
                  <td className="p-2 border-b">{comment.text}</td>
                  <td className="p-2 border-b">{comment.inResponseTo}</td>
                  <td className="p-2 border-b">{new Date(comment.submittedOn).toLocaleDateString()}</td>
                  <td className="p-2 border-b">{comment.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: Math.ceil(filteredComments.length / commentsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 mx-1 ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredComments.length / commentsPerPage)}
            className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
