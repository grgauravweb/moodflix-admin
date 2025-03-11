import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa';
import Select from "react-select";
import axios from "axios"; // Make sure to install axios
import { API_URLS } from "../../../../Apis/Globalapi";

function EditAllSeries({ seriesData, onClose, onRefresh }) {
    const [thumbnail, setThumbnail] = useState("");
    const [poster, setPoster] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState(seriesData);
    const [options, setOptions] = useState({
        genresdataOptions: [],
        actors: [],
        directors: [],
        writers: [],
        });

    const [series, setseries] = useState({
        title: "",
        slug: "",
        releaseDate: "",
        imdbRating: "",
        videoQuality: "",
        freePaid: "",
        runtime: "",
        countries: "",
        genres: [],
        actors: [],
        directors: [],
        writers: [],
        trailerUrl: "",
        description: "",
        thumbnail: "",
        poster: "",
        publish: false,
        enableDownload: false,
        sendNewsletter: false,
        sendPushNotification: false,
        });

        console.log("selectedMovie", selectedMovie);
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

          const handleSaveMovie = async () => {
            console.log("selectedMovie", selectedMovie);
            try {
              await axios.put(`${API_URLS.EditTvSeries}/${selectedMovie._id}`, selectedMovie);
              onRefresh(); // Refresh the list after updating
              onClose(); // Close the modal after successful update
              alert("Data Updated");
            } catch (error) {
              console.error('Error updating TV series:', error);
            }
          };

            useEffect(() => {

                const fetchGenres = async () => {
                    try {
                        const response = await axios.get(API_URLS.genre);
                        setOptions((prev) => ({
                        ...prev,
                        genresdataOptions: response.data.map((genre) => ({
                            value: genre._id,
                            label: genre.name,
                        })),
                        }));
                    } catch (error) {
                        console.error("Error fetching genres:", error);
                    }
                    };
                    const fetchActors = async () => {
                    try {
                        const response = await axios.get(API_URLS.getActor);
                        console.log(response.data)
                        setOptions((prev) => ({
                        ...prev,
                        actors: response.data.map((actor) => ({
                            value: actor._id,
                            label: actor.starName,
                        })),
                        }));
                    } catch (error) {
                        console.error("Error fetching actors:", error);
                    }
                    }
                    const fetchDirectors = async () => {
                    try {
                        const response = await axios.get(API_URLS.getDirector);
                        setOptions((prev) => ({
                        ...prev,
                        directors: response.data.map((director) => ({
                            value: director._id,
                            label: director.starName,
                        })),
                        }));
                    } catch (error) {
                        console.error("Error fetching directors:", error);
                    }
                    }
                    const fetchWriters = async () => {
                    try {
                        const response = await axios.get(API_URLS.getWriter);
                        setOptions((prev) => ({
                        ...prev,
                        writers: response.data.map((writer) => ({
                            value: writer._id,
                            label: writer.starName,
                        })),
                        }));
                    } catch (error) {
                        console.error("Error fetching writers:", error);
                    }
                    }
                    fetchGenres();
                    fetchActors();
                    fetchDirectors();
                    fetchWriters();
                    }, []);






  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Edit Series</h3>
              <button
                onClick={() => setIsEditModalOpen(onClose)}
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
                  value={selectedMovie.releaseDate ? selectedMovie.releaseDate.split("T")[0] : ""}
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

  )
}

export default EditAllSeries
        
        
        