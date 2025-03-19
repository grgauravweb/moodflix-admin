import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { API_URLS } from "../../../../Apis/Globalapi";
import axios from "axios";

const StarManagement = () => {
  const [stars, setStars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedStarId, setSelectedStarId] = useState(null);
  const [starType, setStarType] = useState("Actor");
  const [starName, setStarName] = useState("");
  const [starBio, setStarBio] = useState("");
  const [starImage, setStarImage] = useState("");
  const [tmdbId, setTmdbId] = useState("");
  const [tmdbType, setTmdbType] = useState("TMDB MOVIE");
  const [writerData, setWriterData] = useState([]); 
  const [directorData, setDirectorData] = useState([]); 
  const [data, setData] = useState([stars]);
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("Actor");

  useEffect(() => {
    fetchStars();
    fetchWriterData();
    fetchDirectorData();
  }, []);

  const fetchStars = async () => {
    try {
      setLoading(true);
      const actorResponse = await axios.get(API_URLS.getActor);
      setStars(actorResponse.data);
      setData(actorResponse.data); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };

  const fetchWriterData = async () => {
    try {
      setLoading(true);
      const genresResponse = await axios.get(API_URLS.getWriter);
      setWriterData(genresResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };

  const fetchDirectorData = async () => {
    try {
      setLoading(true);
      const genresResponse = await axios.get(API_URLS.getDirector);
      setDirectorData(genresResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setStarImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveStar = async () => {
    try {
      const starData = {
        starType,
        starName,
        starBio,
        starImage,
        tmdbId,
        tmdbType,
      };

      const response =
        modalType === "Add Star"
          ? await fetch(API_URLS.saveStar, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(starData),
            })
          : await fetch(`${API_URLS.saveStar}/${selectedStarId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(starData),
            });

      if (!response.ok) {
        throw new Error("Failed to save star");
      }
      setShowModal(false);
      alert("Added Succsfully");
      fetchStars();
      fetchDirectorData();
      fetchWriterData();
    } catch (error) {
      console.error("Error saving star:", error);
    }
  };

  const handleFetchFromTMDB = async () => {
    try {
      const response = await fetch(`${API_URLS.fetchFromTMDB}/${tmdbId}`);
      const data = await response.json();
      console.log("TMDB Data:", data);
      // Assuming the response contains fields like 'name', 'bio', and 'image'
      setStarName(data.name || "");
      setStarBio(data.bio || "");
      setStarImage(data.image || "");
      setModalType("Add Star"); // Switch to Add Star modal after fetching
    } catch (error) {
      console.error("Error fetching from TMDB:", error);
    }
  };

  const handleEditClick = (star) => {
    setSelectedStarId(star._id);
    setStarType(star.starType);
    setStarName(star.starName);
    setStarBio(star.starBio);
    setStarImage(star.starImage);
    setModalType("Edit Star");
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await fetch(`${API_URLS.saveStar}/${id}`, {
        method: "DELETE",
      });
      setStars(stars.filter((star) => star._id !== id));
      console.log("Deleted star with id:", id);
      alert("Deleted Succsfully");
    } catch (error) {
      console.error("Error deleting star:", error);
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Star Management</h2>

      <div className="flex justify-between mb-6">
        <button
          onClick={() => {
            setModalType("Add Star");
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Star
        </button>

        <button
          onClick={() => {
            setModalType("Fetch from TMDB");
            setShowModal(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Fetch from TMDB
        </button>
      </div>

      <div className="flex mb-6 justify-center gap-1 rounded-xl">
      <button
        onClick={() => {
          setData(stars);
          setActiveTab("Actor");
        }}
        className={`w-1/3 py-3 rounded-lg transition-all font-semibold shadow-md border-2 
          ${activeTab === "Actor" ? "bg-violet-500 text-white border-violet-500" : "bg-white border-violet-500 hover:bg-violet-500 hover:text-white"}`}
      >
        Actors
      </button>
    
      <button
        onClick={() => {
          setData(directorData);
          setActiveTab("Director");
        }}
        className={`w-1/3 py-3 rounded-lg transition-all font-semibold shadow-md border-2 
          ${activeTab === "Director" ? "bg-blue-500 text-white border-blue-500" : "bg-white border-blue-600 hover:bg-blue-500 hover:text-white"}`}
      >
        Directors
      </button>
    
      <button
        onClick={() => {
          setData(writerData);
          setActiveTab("Writer");
        }}
        className={`w-1/3 py-3 rounded-lg transition-all font-semibold shadow-md border-2 
          ${activeTab === "Writer" ? "bg-green-500 text-white border-green-500" : "bg-white border-green-600 hover:bg-green-500 hover:text-white"}`}
      >
        Writers
      </button>
    </div>
    

      {/* Table Container */}
      {loading ?  <div className="flex h-screen justify-center items-center">Loading...</div> :<div className="bg-white p-4 shadow-md rounded overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b text-sm md:text-base">#</th>
              <th className="p-2 border-b text-sm md:text-base">Photo</th>
              <th className="p-2 border-b text-sm md:text-base">Name</th>
              <th className="p-2 border-b text-sm md:text-base">Type</th>
              <th className="p-2 border-b text-sm md:text-base">Bio</th>
              <th className="p-2 border-b text-sm md:text-base text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.map((star, index) => (
              <tr key={star._id} className="hover:bg-gray-100">
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">
                  <img
                    src={star.starImage}
                    alt={`${star.starName} Thumbnail`}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-2 border-b">{star.starName}</td>
                <td className="p-2 border-b">{star.starType}</td>
                <td className="p-2 border-b">{star.starBio}</td>
                <td className="p-2 border-b text-center">
                  <button
                    onClick={() => handleEditClick(star)}
                    className="text-green-500 hover:text-green-600 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(star._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}

      {showModal && (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-semibold mb-4">{modalType}</h3>

            {modalType === "Add Star" || modalType === "Edit Star" ? (
              <>
                <label>Star Type</label>
                <select
                  value={starType}
                  onChange={(e) => setStarType(e.target.value)}
                  className="w-full p-2 border mb-4 rounded"
                >
                  <option value="Actor">Actor</option>
                  <option value="Director">Director</option>
                  <option value="Writer">Writer</option>
                </select>

                <label>Star Name</label>
                <input
                  type="text"
                  value={starName}
                  onChange={(e) => setStarName(e.target.value)}
                  className="w-full p-2 border mb-4 rounded"
                />

                <label>Star Bio</label>
                <textarea
                  value={starBio}
                  onChange={(e) => setStarBio(e.target.value)}
                  className="w-full p-2 border mb-4 rounded"
                ></textarea>

                <label>Photo</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full p-2 border mb-4 rounded"
                />
              </>
            ) : (
              <>
                <label>TMDB ID</label>
                <input
                  type="text"
                  value={tmdbId}
                  onChange={(e) => setTmdbId(e.target.value)}
                  className="w-full p-2 border mb-4 rounded"
                />

                <label>TMDB Type</label>
                <select
                  value={tmdbType}
                  onChange={(e) => setTmdbType(e.target.value)}
                  className="w-full p-2 border mb-4 rounded"
                >
                  <option value="TMDB MOVIE">TMDB MOVIE</option>
                  <option value="TMDB TV-SERIES">TMDB TV-SERIES</option>
                </select>

                <p className="text-xs text-gray-500 mb-2">
                  Enter TMDB ID to fetch the details.
                </p>

                <button
                  onClick={handleFetchFromTMDB}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
                >
                  Fetch
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Note: Actor photos will be imported by cron.
                </p>
              </>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStar}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StarManagement;
