import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFilm, FaTv, FaBroadcastTower, FaStar, FaGlobe, FaTags } from 'react-icons/fa';
import { API_URLS } from '../../Apis/Globalapi';

const api = axios.create({
  baseURL: API_URLS.MainDashboard
});

// Function to format the date to a more readable format
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const MainDashboard = () => {
  const [moviesCount, setMoviesCount] = useState(0);
  const [tvSeriesCount, setTvSeriesCount] = useState(0);
  const [liveTvCount, setLiveTvCount] = useState(0); // Assuming you'll implement live TV data later
  const [starsCount, setStarsCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);
  const [genresCount, setGenresCount] = useState(0);
  const [mostPopularMovies, setMostPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [recentSubscribers, setRecentSubscribers] = useState([]);
  const [videoQualities, setVideoQualities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesResponse = await api.get('/movies');
        const moviesCount = moviesResponse.data.length;
        setMoviesCount(moviesCount);
        localStorage.setItem('moviesCount', moviesCount);
        localStorage.setItem('moviesData', JSON.stringify(moviesResponse.data)); // Save full data
      } catch (error) {
        console.error('Error fetching movies count:', error);
      }

      try {
        const tvSeriesResponse = await api.get('/tvseries');
        const tvSeriesCount = tvSeriesResponse.data.length;
        setTvSeriesCount(tvSeriesCount);
        localStorage.setItem('tvSeriesCount', tvSeriesCount);
        localStorage.setItem('tvSeriesData', JSON.stringify(tvSeriesResponse.data)); // Save full data
      } catch (error) {
        console.error('Error fetching TV series count:', error);
      }

      try {
        const starsResponse = await api.get('/stars');
        const starsCount = starsResponse.data.length;
        setStarsCount(starsCount);
        localStorage.setItem('starsCount', starsCount);
        localStorage.setItem('starsData', JSON.stringify(starsResponse.data)); // Save full data
      } catch (error) {
        console.error('Error fetching stars count:', error);
      }

      try {
        const countriesResponse = await api.get('/countries');
        const countriesCount = countriesResponse.data.length;
        setCountriesCount(countriesCount);
        localStorage.setItem('countriesCount', countriesCount);
        localStorage.setItem('countriesData', JSON.stringify(countriesResponse.data)); // Save full data
      } catch (error) {
        console.error('Error fetching countries count:', error);
      }

      try {
        const genresResponse = await api.get('/genres');
        const genresCount = genresResponse.data.length;
        setGenresCount(genresCount);
        localStorage.setItem('genresCount', genresCount);
        localStorage.setItem('genresData', JSON.stringify(genresResponse.data)); // Save full data
      } catch (error) {
        console.error('Error fetching genres count:', error);
      }

      // Fetch Most Popular Movies
      try {
        const popularMoviesResponse = await api.get('/popularMovies');
        const mostPopularMovies = popularMoviesResponse.data;
        setMostPopularMovies(mostPopularMovies);
        localStorage.setItem('mostPopularMovies', JSON.stringify(mostPopularMovies));
      } catch (error) {
        console.error('Error fetching most popular movies:', error);
      }

      // Fetch Top Rated Movies
      try {
        const topRatedMoviesResponse = await api.get('/topRatedMovies');
        const topRatedMovies = topRatedMoviesResponse.data;
        setTopRatedMovies(topRatedMovies);
        localStorage.setItem('topRatedMovies', JSON.stringify(topRatedMovies));
      } catch (error) {
        console.error('Error fetching top rated movies:', error);
      }

    // Fetch Video Qualities
    try {
      const videoQualitiesResponse = await api.get('/videoQualities');
      const videoQualities = videoQualitiesResponse.data;
      setVideoQualities(videoQualities);
      localStorage.setItem('videoQualities', JSON.stringify(videoQualities)); // Save full data
    } catch (error) {
      console.error('Error fetching video qualities:', error);
    }
  };

  fetchData();
}, []); //


  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-3 gap-6">
        {/* Dashboard Cards */}
        <div className="bg-blue-600 p-4 shadow-md rounded flex items-center text-white">
          <FaFilm className="text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium">Movies</h3>
            <p className="text-2xl">{moviesCount}</p>
          </div>
        </div>
        <div className="bg-green-600 p-4 shadow-md rounded flex items-center text-white">
          <FaTv className="text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium">TV Series</h3>
            <p className="text-2xl">{tvSeriesCount}</p>
          </div>
        </div>
        <div className="bg-purple-600 p-4 shadow-md rounded flex items-center text-white">
          <FaBroadcastTower className="text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium">Live TV</h3>
            <p className="text-2xl">{liveTvCount}</p>
          </div>
        </div>
        <div className="bg-yellow-600 p-4 shadow-md rounded flex items-center text-white">
          <FaStar className="text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium">Stars</h3>
            <p className="text-2xl">{starsCount}</p>
          </div>
        </div>
        <div className="bg-red-600 p-4 shadow-md rounded flex items-center text-white">
          <FaGlobe className="text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium">Countries</h3>
            <p className="text-2xl">{countriesCount}</p>
          </div>
        </div>
        <div className="bg-indigo-600 p-4 shadow-md rounded flex items-center text-white">
          <FaTags className="text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium">Genres</h3>
            <p className="text-2xl">{genresCount}</p>
          </div>
        </div>
      </div>

      {/* Popular and Top Rated Movies Tables */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 shadow-md rounded">
          <h3 className="text-lg font-medium mb-2">Most Popular Movies</h3>
          <table className="w-full mt-2 border-collapse text-center">
            <thead>
              <tr className="bg-gray-200 border-b">
                <th className="p-2">Title</th>
                <th className="p-2">Release</th>
                <th className="p-2">Total View</th>
              </tr>
            </thead>
            <tbody>
              {mostPopularMovies.slice(0, 5).map((movie) => (
                <tr key={movie._id} className="border-b hover:bg-gray-100">
                  <td className="p-2">{movie.title}</td>
                  <td className="p-2">{formatDate(movie.releaseDate)}</td>
                  <td className="p-2">{movie.totalView}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white p-4 shadow-md rounded">
          <h3 className="text-lg font-medium mb-2">Top Rated Movies</h3>
          <table className="w-full mt-2 border-collapse text-center">
            <thead>
              <tr className="bg-gray-200 border-b">
                <th className="p-2">Title</th>
                <th className="p-2">Release</th>
                <th className="p-2">Total Rating</th>
              </tr>
            </thead>
            <tbody>
              {topRatedMovies.slice(0, 5).map((movie) => (
                <tr key={movie._id} className="border-b hover:bg-gray-100">
                  <td className="p-2">{movie.title}</td>
                  <td className="p-2">{formatDate(movie.releaseDate)}</td>
                  <td className="p-2">{movie.totalRating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Subscribers Table */}
      <div className="bg-white p-4 shadow-md rounded mt-6">
        <h3 className="text-lg font-medium mb-2">Recent Subscribers</h3>
        <table className="w-full mt-2 border-collapse text-center">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Subscribe At</th>
            </tr>
          </thead>
          <tbody>
            {recentSubscribers.slice(0, 5).map((subscriber, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-2">{subscriber.name}</td>
                <td className="p-2">{subscriber.email}</td>
                <td className="p-2">{formatDate(subscriber.subscribeAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainDashboard;
