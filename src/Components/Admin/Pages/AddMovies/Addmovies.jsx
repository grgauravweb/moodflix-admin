import React, { useState, useEffect } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";
// import useMultiFetch from '../../../Utility/MultiFetch';
import MovieForm from "../../../Utility/LocalData";

const AddMovies = () => {
  const [movieData, setMovieData] = useState({
    tmdbId: "",
    title: "",
    slug: "",
    description: "",
    actors: "",
    directors: "",
    writers: "",
    imdbRating: "", // Ensure imdbRating is initialized
    releaseDate: "",
    countries: "India",
    genres: "Action, Comedy",
    runtime: "",
    freePaid: "Paid",
    trailerUrl: "",
    videoQuality: "4K",
    thumbnail: null,
    poster: null,
    sendNewsletter: false,
    sendPushNotification: false,
    publish: false,
    enableDownload: false,
  });

  const [genresData, setGenresData] = useState([]); // State to hold genres data

  useEffect(() => {
    const storedGenresData = JSON.parse(
      localStorage.getItem("genresData") || "[]"
    );
    setGenresData(storedGenresData); // Set genres data from localStorage
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMovieData({
      ...movieData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setMovieData({
      ...movieData,
      [name]: e.target.files[0],
    });
  };

  const handleFetch = () => {
    // Logic to fetch movie data from TMDB using tmdbId
    console.log("Fetching movie data for TMDB ID:", movieData.tmdbId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      } = movieData;

      const moviePayload = {
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
      };

      if (thumbnail) moviePayload.thumbnail = await fileToBase64(thumbnail);
      if (poster) moviePayload.poster = await fileToBase64(poster);

      const response = await fetch(API_URLS.AddMovies, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(moviePayload),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      alert("Movie added successfully");

      // Reset the form
      setMovieData({
        title: "",
        slug: "",
        description: "",
        actors: "",
        directors: "",
        writers: "",
        imdbRating: "",
        releaseDate: "",
        countries: "India",
        genres: "",
        runtime: "",
        freePaid: "Paid",
        trailerUrl: "",
        videoQuality: "4K",
        thumbnail: null,
        poster: null,
        sendNewsletter: false,
        sendPushNotification: false,
        publish: false,
        enableDownload: false,
      });
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Add Movie/Video</h2>

      <div className="flex justify-center mb-6 flex-col items-center">
        <h1 className="bg-blue-500 text-white font-bold capitalize py-2 px-4 rounded-md mb-2">
          IMPORT MOVIES/VIDEOS FROM TMDB
        </h1>
        <div>
          <input
            type="text"
            name="tmdbId"
            value={movieData.tmdbId}
            onChange={handleInputChange}
            className="p-2 px-8 border rounded mr-2"
            placeholder="Enter TMDB ID"
          />
          <button
            onClick={handleFetch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Fetch
          </button>
        </div>
      </div>

      <div className="p-6 shadow-md rounded space-y-4 flex flex-col md:flex-row gap-5">
        {/* Movie Info Section */}
        <div className="bg-white flex-1 p-4 space-y-4">
          <h3 className="text-lg font-semibold">Movie Info</h3>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1 ">Title</label>
            <input
              type="text"
              name="title"
              value={movieData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Slug (URL-friendly)
            </label>
            <select
              name="slug"
              value={movieData.slug}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Slug</option>
              {genresData.map((slug) => (
                <option key={slug._id} value={slug.slug}>
                  {slug.slug}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={movieData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>

          {/* Actors, Directors, Writers, IMDb Rating, Release Date, Countries, Genres, Runtime, Free/Paid, Trailer URL, Video Quality */}
          {/* {['Actors', 'Directors', 'Writers', 'IMDb Rating', 'Release Date', 'Runtime'].map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium mb-1">{field}</label>
              <input
                type={field === 'Release Date' ? 'date' : 'text'}
                name={field.toLowerCase().replace(' ', '')}
                value={movieData[field.toLowerCase().replace(' ', '')]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          ))} */}

          {/* Trailer URL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Trailer URL
            </label>
            <input
              type="text"
              name="trailerUrl"
              value={movieData.trailerUrl}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* IMDb Rating */}
          {/* <div>
  <label className="block text-sm font-medium mb-1">IMDb Rating</label>
  <input
    type="number"
    name="imdbRating"
    value={movieData.imdbRating}
    onChange={handleInputChange}
    className="w-full p-2 border rounded"
    min="0"
    max="10"
    step="0.1"
    placeholder="Enter IMDb Rating (0 - 10)"
  />
</div> */}

          {/* Free/Paid */}
          <div>
            <label className="block text-sm font-medium mb-1">Free/Paid</label>
            <select
              name="freePaid"
              value={movieData.freePaid}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>


          
          <MovieForm
            movieData={movieData}
            handleInputChange={handleInputChange}
          />
          
        </div>
       
        {/* Upload Section */}
        <div className="bg-white flex-1 p-4 space-y-4">
          <h3 className="text-lg font-semibold">Upload</h3>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full border rounded p-2"
            />
          </div>

          {/* Poster */}
          <div>
            <label className="block text-sm font-medium mb-1">Poster</label>
            <input
              type="file"
              name="poster"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full border rounded p-2"
            />
          </div>
          <div className="p-6 shadow-md rounded mt-4">
            <h3 className="text-lg font-semibold">Notification Settings</h3>
            <div className="flex flex-col space-y-4">
              {/* Checkbox fields for notifications */}
              {[
                "Send Newsletter",
                "Send Push Notification",
                "Publish",
                "Enable Download",
              ].map((label, index) => (
                <div key={index}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name={label.toLowerCase().replace(" ", "")}
                      checked={movieData[label.toLowerCase().replace(" ", "")]}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Add Movie/Video
          </button>
        </div>
      </div>

      {/* Notification Settings */}
    </div>
  );
};

export default AddMovies;
