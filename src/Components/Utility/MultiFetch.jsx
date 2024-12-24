import { useState, useEffect } from 'react';
import { API_URLS } from '../../Apis/Globalapi';

const useMultiFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Define the API URLs with their respective localStorage keys
        const apiEndpoints = {
          categories: `${API_URLS.BASE_URL}/categories`,
          countries: `${API_URLS.BASE_URL}/countries`,
          genres: `${API_URLS.BASE_URL}/genres`,
          stars: `${API_URLS.BASE_URL}/stars`,
          tvChannels: `${API_URLS.BASE_URL}/tvChannels`,
          videoQualities: `${API_URLS.BASE_URL}/videoQualities`,
        };

        // Create an array of promises to fetch each URL
        const fetchPromises = Object.entries(apiEndpoints).map(async ([key, url]) => {
          const response = await fetch(url);
          const result = await response.json();
          localStorage.setItem(key, JSON.stringify(result));  // Save each result in localStorage
          return { key, data: result };  // Return key-value for setting state
        });

        // Resolve all fetch promises and set state
        const results = await Promise.all(fetchPromises);
        setData(results);
        console.log(results);  // Log the fetched data

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useMultiFetch;
