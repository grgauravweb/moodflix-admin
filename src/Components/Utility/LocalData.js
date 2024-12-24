import React, { useState, useEffect } from 'react';

// Custom hook to fetch data from localStorage
const useFetchDataFromLocalStorage = () => {
  const [videoQualities, setVideoQualities] = useState([]);
  const [genresData, setGenresData] = useState([]);
  const [starsData, setStarsData] = useState([]);
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedVideoQualities = JSON.parse(localStorage.getItem('videoQualities') || '[]');
    const storedGenresData = JSON.parse(localStorage.getItem('genresData') || '[]');
    const storedStarsData = JSON.parse(localStorage.getItem('starsData') || '[]');
    const storedCountriesData = JSON.parse(localStorage.getItem('countriesData') || '[]');

    // Set the retrieved data to state
    setVideoQualities(storedVideoQualities);
    setGenresData(storedGenresData);
    setStarsData(storedStarsData);
    setCountriesData(storedCountriesData);
  }, []);

  return {
    videoQualities,
    genresData,
    starsData,
    countriesData,
  };
};

const MovieForm = () => {
  const { videoQualities, genresData, starsData, countriesData } = useFetchDataFromLocalStorage();
  const [movieData, setMovieData] = useState({
    videoQuality: '',
    genres: '',
    slug: '',
    country: '',
    actors: '',
    directors: '',
    writers: '',
    imdbRating: '',
    releaseDate: '',
    runtime: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Filter stars data by type
  const actors = starsData.filter(star => star.starType === "Actor");
  const directors = starsData.filter(star => star.starType === "Director");
  const writers = starsData.filter(star => star.starType === "Writer");

  return (
    <div className="bg-white flex-1 py-4 space-y-4">
      {/* Fields for Actors, Directors, Writers */}
      {["Actors", "Directors", "Writers"].map((field, index) => {
        const name = field.toLowerCase();
        let options = [];

        // Determine options based on field
        if (field === "Actors") {
          options = actors;
        } else if (field === "Directors") {
          options = directors;
        } else if (field === "Writers") {
          options = writers;
        }

        return (
          <div key={index}>
            <label className="block text-sm font-medium mb-1">{field}</label>
            <select
              name={name}
              value={movieData[name]}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select {field}</option>
              {options.map((star) => (
                <option key={star._id} value={star.starName}>
                  {star.starName}
                </option>
              ))}
            </select>
          </div>
        );
      })}

      {/* IMDb Rating */}
      <div>
        <label className="block text-sm font-medium mb-1">IMDb Rating</label>
        <input
          type="text"
          name="imdbRating"
          value={movieData.imdbRating}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

        {/* Slug */}
        {/* <div>
        <label className="block text-sm font-medium mb-1">Slug (URL-friendly)</label>
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
      </div> */}

      {/* Release Date */}
      <div>
        <label className="block text-sm font-medium mb-1">Release Date</label>
        <input
          type="date"
          name="releaseDate"
          value={movieData.releaseDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Runtime */}
      <div>
        <label className="block text-sm font-medium mb-1">Runtime</label>
        <input
          type="text"
          name="runtime"
          value={movieData.runtime}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Country Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-1">Country</label>
        <select
          name="country"
          value={movieData.country}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Country</option>
          {countriesData.map((country) => (
            <option key={country._id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MovieForm;
