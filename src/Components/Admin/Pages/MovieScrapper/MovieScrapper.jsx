import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { API_URLS } from "../../../../Apis/Globalapi";

const MovieScrapper = () => {
  const [isPublished, setIsPublished] = useState(false);
  const [fetchTrailer, setFetchTrailer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      // Fetch data based on searchTerm, isPublished, and fetchTrailer values
      const response = await fetch(
        `API_URLS.MovieScraper/scrap?query=${searchTerm}&publish=${isPublished}&trailer=${fetchTrailer}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      console.log(data); // Process data as needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Movie Scrapper</h2>

      <div className="flex items-center mb-4 justify-center mt-20 bg-slate-200 ">
        <label className="mr-4 flex items-center">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={() => setIsPublished(!isPublished)}
            className="mr-2"
          />
          Publish
        </label>

        <label className="mr-4 flex items-center">
          <input
            type="checkbox"
            checked={fetchTrailer}
            onChange={() => setFetchTrailer(!fetchTrailer)}
            className="mr-2"
          />
          Fetch Trailer
        </label>
      </div>

      <div className="flex items-center justify-center bg-slate-500 p-4 rounded-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter movie title..."
          className="border p-2 rounded mr-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <FaSearch className="inline-block mr-2" />
          Search
        </button>
      </div>
    </div>
  );
};

export default MovieScrapper;
