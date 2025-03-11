import React, { useState, useEffect } from "react";
import { FaEdit, FaSearch, FaTimes, FaTrashAlt } from "react-icons/fa";
import EditMovieModal from "../../Modals/AllMovie/EditAllMovie";
import axios from "axios"; // Make sure to install axios
import { API_URLS } from "../../../../Apis/Globalapi";
import Select from "react-select";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All Release");
  const [publicationFilter, setPublicationFilter] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [genresData, setGenresData] = useState([]);
  const [actorData, setActorData] = useState([]);
  const [writerData, setWriterData] = useState([]);
  const [directorData, setDirectorData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [poster, setPoster] = useState(null);

  console.log("ssss", selectedMovie);
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Fetching movies
        const movieResponse = await axios.get(API_URLS.AddMovies);
        console.log("data", movieResponse.data);
        setMovies(movieResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCountryData = async () => {
      try {
        // Fetching movies
        const countriesResponse = await axios.get(
          `${API_URLS.BASE_URL}/countries`
        );
        setCountries(countriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchData = async () => {
      try {
        // Fetching Genres
        const genresResponse = await axios.get(API_URLS.genre);
        setGenresData(genresResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchActorData = async () => {
      try {
        // Fetching Genres
        const actorResponse = await axios.get(API_URLS.getActor);
        setActorData(actorResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchWriterData = async () => {
      try {
        // Fetching Genres
        const genresResponse = await axios.get(API_URLS.getWriter);
        setWriterData(genresResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDirectorData = async () => {
      try {
        // Fetching Genres
        const genresResponse = await axios.get(API_URLS.getDirector);
        setDirectorData(genresResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovieData();
    fetchData();
    fetchActorData();
    fetchWriterData();
    fetchDirectorData();
  }, []);

  const thumbnailUpload = (file) => {
    if (file) {
      setSelectedMovie({
        ...selectedMovie,
        thumbnail: file,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const posterUpload = (file) => {
    if (file) {
      setSelectedMovie({
        ...selectedMovie,
        poster: file,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPoster(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const options = {
    actors: actorData.map((item) => ({
      value: item._id,
      label: item.starName,
    })),
    directors: directorData.map((item) => ({
      value: item._id,
      label: item.starName,
    })),
    writers: writerData.map((item) => ({
      value: item._id,
      label: item.starName,
    })),
    genresdataOptions: genresData.map((item) => ({
      value: item._id,
      label: item.name,
    })),
  };

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
      alert("Date deleted");
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleSaveMovie = async (updatedMovie) => {
    try {
      const {
        title,
        slug,
        description,
        actors,
        directors,
        writers,
        imdbRating,
        releaseDate,
        countries,
        genres,
        runtime,
        freePaid,
        trailerUrl,
        videoQuality,
        sendNewsletter,
        sendPushNotification,
        publish,
        enableDownload,
        thumbnail,
        poster,
        video,
      } = updatedMovie;

      console.log("Updated Movie:", updatedMovie);

      const genresArray = Array.isArray(genres) ? genres : []; // Use directly if already an array

      const actorsArray = Array.isArray(actors)
        ? actors
        : typeof actors === "string"
        ? actors.split(",").map((a) => a.trim())
        : [];
      const directorsArray = Array.isArray(directors)
        ? directors
        : typeof directors === "string"
        ? directors.split(",").map((d) => d.trim())
        : [];
      const writersArray = Array.isArray(writers)
        ? writers
        : typeof writers === "string"
        ? writers.split(",").map((w) => w.trim())
        : [];

      // Create FormData for file uploads
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("description", description);
      formData.append("actors", actorsArray);
      formData.append("directors", directorsArray);
      formData.append("writers", writersArray);
      formData.append("imdbRating", imdbRating);
      formData.append("releaseDate", releaseDate);
      formData.append("countries", countries);
      formData.append("genres", genresArray);
      formData.append("runtime", runtime);
      formData.append("freePaid", freePaid);
      formData.append("trailerUrl", trailerUrl);
      formData.append("videoQuality", videoQuality);
      formData.append("sendNewsletter", sendNewsletter);
      formData.append("sendPushNotification", sendPushNotification);
      formData.append("publish", publish);
      formData.append("enableDownload", enableDownload);

      if (video) formData.append("video", video);
      if (thumbnail) formData.append("thumbnail", thumbnail);
      if (poster) formData.append("poster", poster);

      console.log("Movie Payload:", formData);
      const response = await axios.put(
        `${API_URLS.AddMovies}/${updatedMovie._id}`,
        formData
      ); // Note the use of _id

      if (response.data.success === true) {
        alert("Movie updated successfully");
        setIsEditModalOpen(false);
      }
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
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
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {movie.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(movie.releaseDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {movie.enableDownload ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {movie.freePaid === "Paid" ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        movie.publish
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {movie.publish ? "Published" : "Unpublished"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleEditClick(movie)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(movie._id)}
                      className="text-red-500 hover:text-red-700"
                    >
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
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Edit Movie</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveMovie(selectedMovie);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={selectedMovie.title}
                    onChange={(e) =>
                      setSelectedMovie({
                        ...selectedMovie,
                        title: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Slug
                  </label>

                  <Select
                    options={options.genresdataOptions}
                    value={options.genresdataOptions.filter(
                      (option) =>
                        selectedMovie.slug &&
                        selectedMovie.slug.includes(option.value)
                    )}
                    onChange={(selectedOption) =>
                      setSelectedMovie({
                        ...selectedMovie,
                        slug: selectedOption ? selectedOption.value : "",
                      })
                    }
                    className="text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Release Date
                  </label>
                  <input
                    type="date"
                    value={
                      selectedMovie.releaseDate
                        ? selectedMovie.releaseDate.split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setSelectedMovie({
                        ...selectedMovie,
                        releaseDate: e.target.value, // Will be in YYYY-MM-DD format
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    IMDB Rating
                  </label>
                  <input
                    type="text"
                    value={selectedMovie.imdbRating}
                    onChange={(e) =>
                      setSelectedMovie({
                        ...selectedMovie,
                        imdbRating: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Video Quality
                  </label>
                  <select
                    value={selectedMovie.videoQuality}
                    onChange={(e) =>
                      setSelectedMovie({
                        ...selectedMovie,
                        videoQuality: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="1080p">1080p</option>
                    <option value="4K">4K</option>
                    <option value="8K">8K</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Free/Paid
                  </label>
                  <select
                    value={selectedMovie.freePaid}
                    onChange={(e) =>
                      setSelectedMovie({
                        ...selectedMovie,
                        freePaid: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Runtime
                  </label>
                  <input
                    type="text"
                    value={selectedMovie.runtime}
                    onChange={(e) =>
                      setSelectedMovie({
                        ...selectedMovie,
                        runtime: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Countries
                  </label>
                  <input
                    type="text"
                    value={selectedMovie.countries}
                    onChange={(e) =>
                      setSelectedMovie({
                        ...selectedMovie,
                        countries: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Genres
                  </label>

                  <Select
                    isMulti
                    options={options.genresdataOptions} // Use dynamically generated options from generedata
                    value={options.genresdataOptions.filter(
                      (option) =>
                        Array.isArray(selectedMovie.genres) &&
                        selectedMovie.genres?.includes(option.value)
                    )}
                    onChange={(selectedOptions) =>
                      setSelectedMovie({
                        ...selectedMovie,
                        genres: selectedOptions.map((option) => option.value),
                      })
                    }
                    className="text-gray-700"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Actors
                  </label>

                  <Select
                    isMulti
                    options={options.actors}
                    value={options.actors.filter((option) =>
                      selectedMovie.actors?.includes(option.value)
                    )}
                    onChange={(selectedOptions) =>
                      setSelectedMovie({
                        ...selectedMovie,
                        actors: selectedOptions.map((option) => option.value),
                      })
                    }
                    className="text-gray-700"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Directors
                  </label>

                  <Select
                    isMulti
                    options={options.directors}
                    value={options.directors.filter((option) =>
                      selectedMovie.directors?.includes(option.value)
                    )}
                    onChange={(selectedOptions) =>
                      setSelectedMovie({
                        ...selectedMovie,
                        directors: selectedOptions.map(
                          (option) => option.value
                        ),
                      })
                    }
                    className="text-gray-700"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Writers
                  </label>

                  <Select
                    isMulti
                    options={options.writers}
                    value={options.writers.filter((option) =>
                      selectedMovie.writers?.includes(option.value)
                    )}
                    onChange={(selectedOptions) =>
                      setSelectedMovie({
                        ...selectedMovie,
                        writers: selectedOptions.map((option) => option.value),
                      })
                    }
                    className="text-gray-700"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Trailer URL
                  </label>
                  <input
                    type="text"
                    value={selectedMovie.trailerUrl}
                    onChange={(e) =>
                      setSelectedMovie({
                        ...selectedMovie,
                        trailerUrl: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={selectedMovie.description}
                    onChange={(e) =>
                      setSelectedMovie({
                        ...selectedMovie,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Thumbnail
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => thumbnailUpload(e.target.files[0])}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <img
                    src={
                      thumbnail
                        ? decodeURIComponent(thumbnail)
                        : decodeURIComponent(selectedMovie.thumbnail)
                    }
                    alt="Thumbnail"
                    className="mt-2 w-96 h-96 object-cover rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Poster
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => posterUpload(e.target.files[0])}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <img
                    src={
                      poster
                        ? decodeURIComponent(poster)
                        : decodeURIComponent(selectedMovie.poster)
                    }
                    alt="Poster"
                    className="mt-2 w-96 h-96 object-cover rounded"
                  />
                </div>

                <div className="col-span-2 flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedMovie.publish}
                      onChange={(e) =>
                        setSelectedMovie({
                          ...selectedMovie,
                          publish: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Publish
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedMovie.enableDownload}
                      onChange={(e) =>
                        setSelectedMovie({
                          ...selectedMovie,
                          enableDownload: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Enable Download
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedMovie.sendNewsletter}
                      onChange={(e) =>
                        setSelectedMovie({
                          ...selectedMovie,
                          sendNewsletter: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Send Newsletter
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedMovie.sendPushNotification}
                      onChange={(e) =>
                        setSelectedMovie({
                          ...selectedMovie,
                          sendPushNotification: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Send Push Notification
                    </label>
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
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
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
