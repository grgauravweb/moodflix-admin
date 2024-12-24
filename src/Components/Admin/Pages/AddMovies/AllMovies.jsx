import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditMovieModal from "../../Modals/AllMovie/EditAllMovie";
import axios from "axios"; // Make sure to install axios
import { API_URLS } from "../../../../Apis/Globalapi";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All Release");
  const [publicationFilter, setPublicationFilter] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

   // States for stars, genres, and countries
   const [stars, setStars] = useState([]);
   const [genres, setGenres] = useState([]);
   const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching movies
        const movieResponse = await axios.get(API_URLS.AddMovies);
        setMovies(movieResponse.data);

        // Fetching stars
        const starsResponse = await axios.get(`${API_URLS.BASE_URL}/stars`);
        setStars(starsResponse.data);

        // Fetching genres
        const genresResponse = await axios.get(`${API_URLS.BASE_URL}/genres`);
        setGenres(genresResponse.data);

        // Fetching countries
        const countriesResponse = await axios.get(`${API_URLS.BASE_URL}/countries`);
        setCountries(countriesResponse.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  // Fetch movies from backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URLS.AddMovies); // Update this URL to match your backend
        setMovies(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Search functionality
  const handleSearch = () => {
    const filteredMovies = movies.filter((movie) => {
      const matchesTitle = movie.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesYear =
        selectedYear === "All Release" ||
        new Date(movie.releaseDate).getFullYear() === parseInt(selectedYear);
      const matchesPublication =
        publicationFilter === "All" ||
        (publicationFilter === "Published" ? movie.publish : !movie.publish);

      return matchesTitle && matchesYear && matchesPublication;
    });

    return filteredMovies;
  };

  const handleEditClick = (movie) => {
    setSelectedMovie(movie);
    setEditModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${API_URLS.AddMovies}/${id}`); // Update this URL
      setMovies(movies.filter((movie) => movie._id !== id));
      alert("Date deleted")
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleSaveMovie = async (updatedMovie) => {
    try {
      const response = await axios.put(
        `${API_URLS.AddMovies}/${updatedMovie._id}`,
        updatedMovie
      ); // Note the use of _id
      setMovies(
        movies.map((movie) =>
          movie._id === response.data._id ? response.data : movie
        )
      );
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  // Get filtered movies based on the search
  const filteredMovies = handleSearch();

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">All Movies</h2>

      <div className="flex justify-between mb-6">
        <a href="/admin/add-movies">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            + Add Movie
          </button>
        </a>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded"
          />

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="All Release">All Release</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

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

      <div className="bg-white p-4 shadow-md rounded overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b text-sm md:text-base">#</th>
              <th className="p-2 border-b text-sm md:text-base">Thumbnail</th>
              <th className="p-2 border-b text-sm md:text-base">Title</th>
              <th className="p-2 border-b text-sm md:text-base">Release</th>
              <th className="p-2 border-b text-sm md:text-base">Download</th>
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
            {filteredMovies.map((movie, index) => (
              <tr key={movie._id} className="hover:bg-gray-100">
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className="w-16 h-16"
                  />
                </td>
                <td className="p-2 border-b">{movie.title}</td>
                <td className="p-2 border-b">
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </td>
                <td className="p-2 border-b">
                  {movie.enableDownload ? "Yes" : "No"}
                </td>
                <td className="p-2 border-b text-center">
                  {movie.freePaid === "Paid" ? "Yes" : "No"}
                </td>
                <td className="p-2 border-b text-center">
                  {movie.publish ? "Published" : "Unpublished"}
                </td>
                <td className="p-2 border-b text-center">
                  <button
                    onClick={() => handleEditClick(movie)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(movie._id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditMovieModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        movie={selectedMovie}
        onSave={handleSaveMovie}
      />
    </div>
  );
};

export default AllMovies;
