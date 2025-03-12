import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaTv } from "react-icons/fa";
import axios from "axios"; // Import the modal component
import { API_URLS } from "../../../../Apis/Globalapi";
import { BiCalendar, BiChevronDown, BiChevronUp, BiPlus, BiSearch, BiStar } from "react-icons/bi";
import { FiEdit3, FiFilm, FiFilter, FiPlus } from "react-icons/fi";
import { BsEye, BsTrash2 } from "react-icons/bs";
import { EpisodeForm } from "./components/EpisodeForm";
import { VideoPreview } from "./components/VideoPreview";
import { EpisodeList } from "./components/EpisodeList";
import EditAllSeries from "../../Modals/AllSeries/EditAllSeries";


export const AllTvSeriesNew = () => {
  const [tvSeries, setTvSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [expandedSeries, setExpandedSeries] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isEpisodeFormOpen, setIsEpisodeFormOpen] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState(null);
  const [selectedSeriesId, setSelectedSeriesId] = useState(null);
  const [loading, setLoading] = useState(false)
  const [editSeries, setEditSeries] = useState(null); // Track the series to be edited
    const [isEditing, setIsEditing] = useState(false); // Track modal visibility

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const toggleExpand = (id) => {
    setExpandedSeries(expandedSeries === id ? null : id);
  };

  const openVideoModal = (episode) => {
    setSelectedEpisode(episode);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedEpisode(null);
  };

  const openEpisodeForm = (seriesId, episode) => {
    setSelectedSeriesId(seriesId);
    setEditingEpisode(episode || null);
    setIsEpisodeFormOpen(true);
  };

  const closeEpisodeForm = () => {
    setIsEpisodeFormOpen(false);
    setEditingEpisode(null);
    setSelectedSeriesId(null);
  };




  const handleEpisodeSubmit = async (episodeData) => {
    if (!selectedSeriesId) return;
    console.log("selected: ", selectedSeriesId)
    if (editingEpisode) {
      console.log("Edit",episodeData)
    } else {
      try {
        setLoading(true)
        const response = await axios.post(`${API_URLS.AddTvSeriesep}/${selectedSeriesId}/add-episode`, episodeData, {
          headers: { "Content-Type": "multipart/form-data" },
        })

        console.log("TV Series Episode added successfully:", response.data)
        if (response.data.success === true) {
          // Reset form

          fetchTvSeries()

          alert("TV Series Episode added successfully")
          // Reset current episode form

        }

      } catch (error) {
        console.log("Error: ", error)
      } finally {
        setLoading(false)
      }
    }
    // setTvSeries(prevSeries => prevSeries.map(series => {
    //   if (series._id !== selectedSeriesId) return series;

    //   const updatedEpisodes = editingEpisode
    //     ? series.episodes.map(ep =>
    //       ep.seasonNumber === editingEpisode.seasonNumber &&
    //         ep.episodeNumber === editingEpisode.episodeNumber
    //         ? { ...ep, ...episodeData }
    //         : ep
    //     )
    //     : [...series.episodes, episodeData];

    //   return {
    //     ...series,
    //     episodes: updatedEpisodes,
    //   };
    // }));

    closeEpisodeForm();
  };

  const handleDeleteEpisode = (seriesId, episode) => {
    // if (!confirm('Are you sure you want to delete this episode?')) return;

    setTvSeries(prevSeries => prevSeries.map(series => {
      if (series._id !== seriesId) return series;

      return {
        ...series,
        episodes: series.episodes.filter(ep =>
          ep.seasonNumber !== episode.seasonNumber ||
          ep.episodeNumber !== episode.episodeNumber
        ),
      };
    }));
  };

  const filteredSeries = tvSeries.filter(series => {
    const matchesSearch = series.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' ||
      (filter === 'paid' && series.freePaid === 'Paid') ||
      (filter === 'free' && series.freePaid === 'Free') ||
      (filter === 'published' && series.publish) ||
      (filter === 'unpublished' && !series.publish);
    return matchesSearch && matchesFilter;
  });

  // Fetch TV Series data from API
  const fetchTvSeries = async () => {
    try {
      const response = await axios.get(API_URLS.AllTvSeries);
      setTvSeries(response.data);
    } catch (error) {
      console.error("Error fetching TV series:", error);
    }
  };

  
  useEffect(() => {
    fetchTvSeries();
  }, []);

  const handleEditClick = (series) => {
    setEditSeries(series);
    setIsEditing(true); // Show the edit modal
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 p-6">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <FaTv className="w-8 h-8" />
              TV Series Management
            </h1>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <FiPlus className="w-5 h-5" />
              Add New Series
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search TV series..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              value={filter}
              onChange={handleFilter}
            >
              <option value="all">All Series</option>
              <option value="paid">Paid Only</option>
              <option value="free">Free Only</option>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>
        </div>

        {/* Series Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredSeries.map(series => (
            <div key={series._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <img
                    src={series.thumbnail}
                    alt={series.title}
                    className="w-full md:w-48 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-bold text-gray-900">{series.title}</h2>
                      <div className="flex gap-2">
                        <button onClick={()=>handleEditClick(series)} className="text-blue-600 hover:text-blue-700 transition-colors">
                          <FiEdit3 className="w-5 h-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-700 transition-colors">
                          <BsTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600 line-clamp-2">{series.description}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <BiStar className="w-5 h-5 text-yellow-400" />
                        <span>{series.imdbRating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BsEye className="w-5 h-5 text-gray-500" />
                        <span>{series.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaThumbsUp className="w-5 h-5 text-gray-500" />
                        <span>{series.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiFilm className="w-5 h-5 text-gray-500" />
                        <span>{series.videoQuality}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BiCalendar className="w-5 h-5 text-gray-500" />
                        <span>{new Date(series.releaseDate).getFullYear()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => toggleExpand(series._id)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {expandedSeries === series._id ? (
                      <>
                        <BiChevronUp className="w-5 h-5" />
                        Hide Episodes
                      </>
                    ) : (
                      <>
                        <BiChevronDown className="w-5 h-5" />
                        Show Episodes ({series.episodes.length})
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => openEpisodeForm(series._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <BiPlus className="w-5 h-5" />
                    Add Episode
                  </button>
                </div>
                {expandedSeries === series._id && (
                  <div className="mt-4 border-t pt-4">
                    <EpisodeList
                      episodes={series.episodes}
                      onEditEpisode={(episode) => openEpisodeForm(series._id, episode)}
                      onDeleteEpisode={(episode) => handleDeleteEpisode(series._id, episode)}
                      onPreviewEpisode={openVideoModal}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

     
      {isEditing && (
         <EditAllSeries
          seriesData={editSeries}
          onClose={() => setIsEditing(false)}
          onRefresh={() => {
            // After editing, refresh the TV series data
            fetchTvSeries();
            setIsEditing(false);
          }}
        />
      )}

      {/* Video Preview Modal */}
      {isVideoModalOpen && selectedEpisode && (
        <VideoPreview
          episode={selectedEpisode}
          onClose={closeVideoModal}
        />
      )}

      {/* Episode Form Modal */}
      {isEpisodeFormOpen && (
        <EpisodeForm
          loading={loading}
          episode={editingEpisode}
          onSubmit={handleEpisodeSubmit}
          onClose={closeEpisodeForm}
        />
      )}
    </div>
  );
};

