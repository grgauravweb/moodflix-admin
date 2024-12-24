import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaTrashAlt } from "react-icons/fa";
import { API_URLS } from "../../../../Apis/Globalapi";

const SearchAndImport = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("Movie by title");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  useEffect(() => {
    // Initial fetch if necessary
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `API_URLS.SearchMovie/search?query=${searchTerm}&type=${searchOption}`
      );
      if (!response.ok) throw new Error("Failed to search");

      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleOpenImportModal = () => {
    setIsImportModalOpen(true);
  };

  const handleCloseImportModal = () => {
    setIsImportModalOpen(false);
  };

  const handleImportMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
    handleCloseImportModal();
  };

  const handleDeleteMovie = async (movieId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`API_URLS.SearchMovie/${movieId}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete");

        setMovies(movies.filter((movie) => movie._id !== movieId));
        alert("deleted successfully!");
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Movie Search & Import</h2>

      <div className="flex items-center mb-6">
        <select
          value={searchOption}
          onChange={(e) => setSearchOption(e.target.value)}
          className="border p-2 rounded mr-2"
        >
          <option value="Movie by title">Movie by title</option>
          <option value="TvShows by Title">TV Shows by Title</option>
          <option value="Popular movies">Popular movies</option>
          <option value="Top movies">Top movies</option>
          <option value="Upcoming movies">Upcoming movies</option>
          <option value="Movies by year">Movies by year</option>
          <option value="Popular Tv shows">Popular TV shows</option>
          <option value="Top Tv shows">Top TV shows</option>
          <option value="On the Air Tv shows">On the Air TV shows</option>
          <option value="Tv shows by Year">TV shows by Year</option>
        </select>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter title"
          className="border p-2 rounded mr-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <FaSearch className="inline-block mr-2" />
          Search
        </button>
      </div>

      {/* <button
        onClick={handleOpenImportModal}
        className="bg-green-500 text-white px-4 py-2 rounded mb-6 hover:bg-green-600"
      >
        <FaPlus className="inline-block mr-2" />
        Import Movie
      </button> */}

      {/* Import Modal Component */}
      {isImportModalOpen && (
        <div>
          {/* Modal content and form for importing */}
        </div>
      )}

      <div className="bg-white p-4 shadow-md rounded overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b text-sm md:text-base">Sl</th>
              <th className="p-2 border-b text-sm md:text-base">Title</th>
              <th className="p-2 border-b text-sm md:text-base">Release Date</th>
              <th className="p-2 border-b text-sm md:text-base">Genre</th>
              <th className="p-2 border-b text-sm md:text-base text-center">Options</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr className="hover:bg-gray-100" key={movie._id}>
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{movie.title}</td>
                <td className="p-2 border-b">{movie.releaseDate}</td>
                <td className="p-2 border-b">{movie.genre}</td>
                <td className="p-2 border-b text-center">
                  <button onClick={() => handleDeleteMovie(movie._id)} className="text-red-500 hover:text-red-600">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchAndImport;
