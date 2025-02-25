import React, { useState, useEffect } from "react";
import { FaEdit, FaSearch, FaTimes, FaTrashAlt } from "react-icons/fa";
import EditMovieModal from "../../Modals/AllMovie/EditAllMovie";
import axios from "axios"; // Make sure to install axios
import { API_URLS } from "../../../../Apis/Globalapi";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All Release");
  const [publicationFilter, setPublicationFilter] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // States for stars, genres, and countries
  const [stars, setStars] = useState([]);
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching movies
        const movieResponse = await axios.get(API_URLS.AddMovies);
        console.log(movieResponse.data);
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
    setIsEditModalOpen(true);
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
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Movies</h2>

      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <a
          href="/admin/add-movies"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full md:w-auto text-center"
        >
          + Add Movie
        </a>

        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border rounded"
          />

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full md:w-40 px-4 py-2 border rounded"
          >
            <option value="All Release">All Release</option>
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={publicationFilter}
            onChange={(e) => setPublicationFilter(e.target.value)}
            className="w-full md:w-40 px-4 py-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Published">Published</option>
            <option value="Unpublished">Unpublished</option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full md:w-auto flex items-center justify-center"
          >
            <FaSearch className="mr-2" /> Search
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thumbnail
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Release
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Download
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMovies.map((movie, index) => (
                <tr key={movie._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={movie.thumbnail || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{movie.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(movie.releaseDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{movie.enableDownload ? "Yes" : "No"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {movie.freePaid === "Paid" ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${movie.publish ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {movie.publish ? "Published" : "Unpublished"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button onClick={() => handleEditClick(movie)} className="text-blue-500 hover:text-blue-700 mr-2">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteClick(movie._id)} className="text-red-500 hover:text-red-700">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Edit Movie</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSaveMovie(selectedMovie)
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={selectedMovie.title}
                    onChange={(e) => setSelectedMovie({ ...selectedMovie, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Slug</label>
                  <input
                    type="text"
                    value={selectedMovie.slug}
                    onChange={(e) => setSelectedMovie({ ...selectedMovie, slug: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Release Date</label>
                  <input
                    type="date"
                    value={selectedMovie.releaseDate}
                    onChange={(e) => setSelectedMovie({ ...selectedMovie, releaseDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">IMDB Rating</label>
                  <input
                    type="text"
                    value={selectedMovie.imdbRating}
                    onChange={(e) => setSelectedMovie({ ...selectedMovie, imdbRating: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Video Quality</label>
                  <select
                    value={selectedMovie.videoQuality}
                    onChange={(e) => setSelectedMovie({ ...selectedMovie, videoQuality: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="1080p">1080p</option>
                    <option value="4K">4K</option>
                    <option value="8K">8K</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Free/Paid</label>
                  <select
                    value={selectedMovie.freePaid}
                    onChange={(e) => setSelectedMovie({ ...selectedMovie, freePaid: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Runtime</label>
                  <input
                    type="text"
                    value={selectedMovie.runtime}
                    onChange={(e) => setSelectedMovie({ ...selectedMovie, runtime: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Countries</label>
                  <input
                    type="text"
                    value={selectedMovie.countries}
                    onChange={(e) => setSelectedMovie({ ...selectedMovie, countries: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Genres</label>
                  <input
                    type="text"
                    value={selectedMovie.genres.join(", ")}
                    onChange={(e) => setSelectedMovie({ ...selectedMovie, genres: e.target.value.split(", ") })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Actors</label>
                  <input
                    type="text"
                    value={selectedMovie.actors}
                    onChange={(e) => setSelectedMovie({ ...selectedMovie, actors: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Directors</label>
                  <input
                    type="text"
                    value={selectedMovie.directors}
                    onChange={(e) => setSelectedMovie({ ...selectedMovie, directors: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Writers</label>
                  <input
                    type="text"
                    value={selectedMovie.writers}
                    onChange={(e) => setSelectedMovie({ ...selectedMovie, writers: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Trailer URL</label>
                  <input
                    type="text"
                    value={selectedMovie.trailerUrl}
                    onChange={(e) => setSelectedMovie({ ...selectedMovie, trailerUrl: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={selectedMovie.description}
                    onChange={(e) => setSelectedMovie({ ...selectedMovie, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                  <input
                    type="text"
                    value={selectedMovie.thumbnail}
                    onChange={(e) => setSelectedMovie({ ...selectedMovie, thumbnail: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <img
                    src={selectedMovie.thumbnail || "/placeholder.svg"}
                    alt="Thumbnail"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Poster</label>
                  <input
                    type="text"
                    value={selectedMovie.poster}
                    onChange={(e) => setSelectedMovie({ ...selectedMovie, poster: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <img
                    src={selectedMovie.poster || "/placeholder.svg"}
                    alt="Poster"
                    className="mt-2 w-32 h-48 object-cover rounded"
                  />
                </div>
                <div className="col-span-2 flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedMovie.publish}
                      onChange={(e) => setSelectedMovie({ ...selectedMovie, publish: e.target.checked })}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Publish</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedMovie.enableDownload}
                      onChange={(e) => setSelectedMovie({ ...selectedMovie, enableDownload: e.target.checked })}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Enable Download</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedMovie.sendNewsletter}
                      onChange={(e) => setSelectedMovie({ ...selectedMovie, sendNewsletter: e.target.checked })}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Send Newsletter</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedMovie.sendPushNotification}
                      onChange={(e) => setSelectedMovie({ ...selectedMovie, sendPushNotification: e.target.checked })}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Send Push Notification</label>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* <EditMovieModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        movie={selectedMovie}
        onSave={handleSaveMovie}
      /> */}
    </div>
  );
};

export default AllMovies;
