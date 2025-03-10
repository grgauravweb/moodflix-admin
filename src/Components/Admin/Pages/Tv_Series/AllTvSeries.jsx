import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import EditTvSeriesModal from "../../Modals/AllTVseries/EditTvSeries"; // Import the modal component
import { API_URLS } from "../../../../Apis/Globalapi";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const AllTvSeries = () => {
  const [tvSeries, setTvSeries] = useState([]);
  const [filteredTvSeries, setFilteredTvSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [publicationFilter, setPublicationFilter] = useState("All");
  const [editSeries, setEditSeries] = useState(null); // Track the series to be edited
  const [isEditing, setIsEditing] = useState(false); // Track modal visibility
  const navigate = useNavigate();

  // Fetch TV Series data from API
  const fetchTvSeries = async () => {
    try {
      const response = await axios.get(API_URLS.AllTvSeries);
      setTvSeries(response.data);
      console.log(response.data);
      setFilteredTvSeries(response.data);
      // console.log(fetchTvSeries)
    } catch (error) {
      console.error("Error fetching TV series:", error);
    }
  };

  useEffect(() => {
    fetchTvSeries();
  }, []);

  // Handle search and filter
  const handleSearch = () => {
    let filteredData = tvSeries;

    if (searchTerm) {
      filteredData = filteredData.filter((series) =>
        series.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (publicationFilter === "Published") {
      filteredData = filteredData.filter((series) => series.publish);
    } else if (publicationFilter === "Unpublished") {
      filteredData = filteredData.filter((series) => !series.publish);
    }

    setFilteredTvSeries(filteredData);
  };

  const handleEditClick = (series) => {
    setEditSeries(series);
    setIsEditing(true); // Show the edit modal
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${API_URLS.AllTvSeries}/${id}`);
      setTvSeries(tvSeries.filter((series) => series._id !== id));
      setFilteredTvSeries(
        filteredTvSeries.filter((series) => series._id !== id)
      );
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting series:", error);
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">All TV Series</h2>

      {/* Search and Filter Inputs */}
      <div className="flex justify-between mb-6">
        <a href="/admin/add-tv-series">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            + Add TV Series
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
            value={publicationFilter}
            onChange={(e) => setPublicationFilter(e.target.value)}
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
              <th className="p-2 border-b text-sm md:text-base">Add Episode</th>
              <th className="p-2 border-b text-sm md:text-base text-center">
                Paid
              </th>
              <th className="p-2 border-b text-sm md:text-base text-center">
                Status
              </th>
              <th className="p-2 border-b text-sm md:text-base text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTvSeries.map((series, index) => (
              <tr key={series._id} className="hover:bg-gray-100">
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">
                  <img
                    src={decodeURIComponent(series.thumbnail)}
                    alt={`${series.title} Thumbnail`}
                    className="w-12 h-12"
                  />
                </td>
                <td className="p-2 border-b">{series.title}</td>
                <td className="p-2 border-b">
                  <button onClick={()=> navigate(`/admin/add-tv-seriesEp/${series._id}`)} className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 transition px-4 py-2 text-white rounded-lg">
                    Add Episode <BiPlus className="ml-2" />
                  </button>
                </td>
                <td className="p-2 border-b text-center">
                  {series.freePaid === "Paid" ? "Yes" : "No"}
                </td>
                <td className="p-2 border-b text-center">
                  {series.publish ? "Published" : "Unpublished"}
                </td>
                <td className="p-2 border-b text-center">
                  <button
                    onClick={() => handleEditClick(series)}
                    className="text-green-500 hover:text-green-600 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(series._id)}
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

      {/* Edit TV Series Modal */}
      {isEditing && (
        <EditTvSeriesModal
          series={editSeries}
          onClose={() => setIsEditing(false)}
          onRefresh={() => {
            // After editing, refresh the TV series data
            fetchTvSeries();
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
};

export default AllTvSeries;
