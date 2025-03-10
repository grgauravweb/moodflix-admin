import { useEffect, useState } from "react"
import EpisodeForm from "./EpisodeForm"
import { BiPlus } from "react-icons/bi"
import {
  FiImage,
  FiVideo,
  FiX,
  FiList,
  FiEdit,
  FiTrash2,
} from "react-icons/fi"
import axios from "axios"
import { API_URLS } from "../../../../Apis/Globalapi"
import { useParams } from "react-router-dom"

export const AddTvSeriesEpisode = () => {
  const { seriesId } = useParams()
  const [formErrors, setFormErrors] = useState({})
  const [episodes, setEpisodes] = useState([])

  const [currentEpisode, setCurrentEpisode] = useState({
    episodeNumber: "",
    title: "",
    seasonNumber:1,
    description: "",
    duration: "",
    thumbnail: null,
    video: null,
  })
  const [editingEpisodeIndex, setEditingEpisodeIndex] = useState(null)
  const [isAddingEpisode, setIsAddingEpisode] = useState(false)
  const [loading, setLoading] = useState(false)

  const [uploadProgress, setUploadProgress] = useState({
    video: 0,
    thumbnail: 0,
    poster: 0,
  })

  const [isDragging, setIsDragging] = useState(false)
  const [previews, setPreviews] = useState({
    video: null,
    thumbnail: null,
    poster: null,
  })

  const handleEpisodeInputChange = (e) => {
    const { name, value } = e.target
    setCurrentEpisode((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e, type) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      if (type === "video" && !file.type.startsWith("video/")) {
        alert("Please drop a video file")
        return
      }
      if ((type === "thumbnail" || type === "poster") && !file.type.startsWith("image/")) {
        alert("Please drop an image file")
        return
      }

      if (isAddingEpisode) {
        setCurrentEpisode({
          ...currentEpisode,
          [type]: file,
        })
      }

      // Clear error when file is uploaded
      if (formErrors[type]) {
        setFormErrors({
          ...formErrors,
          [type]: null,
        })
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setPreviews((prev) => ({
        ...prev,
        [type]: previewUrl,
      }))

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 5
        if (progress <= 100) {
          setUploadProgress((prev) => ({
            ...prev,
            [type]: progress,
          }))
        } else {
          clearInterval(interval)
        }
      }, 100)
    }
  }

  const removeFile = (type) => {
    if (isAddingEpisode) {
      setCurrentEpisode((prev) => ({
        ...prev,
        [type]: null,
      }))
    }

    setPreviews((prev) => ({
      ...prev,
      [type]: null,
    }))
    setUploadProgress((prev) => ({
      ...prev,
      [type]: 0,
    }))
  }

  const addEpisode = async () => {
    if (!currentEpisode.title || !currentEpisode.episodeNumber || !currentEpisode.video) {
      alert("Please fill in all required episode fields and upload a video")
      return
    }

    try {
      setLoading(true)
      const response = await axios.post(`${API_URLS.AddTvSeriesep}/${seriesId}/add-episode`, currentEpisode, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      console.log("TV Series Episode added successfully:", response.data)
      if (response.data.success === true) {
        // Reset form

        fetchEpisodes()

        alert("TV Series Episode added successfully")
          // Reset current episode form
    setCurrentEpisode({
      episodeNumber: "",
      title: "",
      description: "",
      duration: "",
      thumbnail: null,
      video: null,
    })
    setIsAddingEpisode(false)
    setPreviews({
      video: null,
      thumbnail: null,
      poster: null,
    })
      }

    } catch (error) {
      console.log("Error: ", error)
    }finally{
      setLoading(false)
    }

  
  }
  const fetchEpisodes = async () => {
    try {
      const response = await axios.get(`${API_URLS.AddTvSeriesep}/${seriesId}/episodes`)
      setEpisodes(response.data.episodes)
      console.log("Episodes:", response.data.episodes);
    } catch (error) {
      console.error("Error fetching episodes:", error)
    }
  }

  useEffect(() => {
    
    fetchEpisodes()
  }, [])

  const editEpisode = (index) => {
    setCurrentEpisode(episodes[index])
    setEditingEpisodeIndex(index)
    setIsAddingEpisode(true)
  }

  const deleteEpisode = (index) => {
    const updatedEpisodes = episodes.filter((_, i) => i !== index)
    setEpisodes(updatedEpisodes)
  }



  const UploadBox = ({ type, accept, icon: Icon }) => (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, type)}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${isDragging
          ? "border-blue-500 bg-blue-50"
          : formErrors[type]
            ? "border-red-500 bg-red-50"
            : "border-gray-300 hover:border-blue-400"
          }`}
      >
        <Icon className={`mx-auto mb-4 ${formErrors[type] ? "text-red-400" : "text-gray-400"}`} size={48} />
        <p className={`mb-2 ${formErrors[type] ? "text-red-600" : "text-gray-600"}`}>
          {formErrors[type] || `Drag & drop your ${type} here`}
        </p>
        <p className="text-sm text-gray-500">or</p>
        <label className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
          Browse Files
          <input
            type="file"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                if (isAddingEpisode) {
                  setCurrentEpisode({ ...currentEpisode, [type]: file })
                }
                const previewUrl = URL.createObjectURL(file)
                setPreviews((prev) => ({
                  ...prev,
                  [type]: previewUrl,
                }))
                // Clear error when file is uploaded
                if (formErrors[type]) {
                  setFormErrors({
                    ...formErrors,
                    [type]: null,
                  })
                }
              }
            }}
            className="hidden"
          />
        </label>
      </div>

      {/* Preview Section */}
      {previews[type] && (
        <div className="relative bg-gray-50 p-4 rounded-lg">
          <button
            onClick={() => removeFile(type)}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <FiX size={16} />
          </button>
          {type === "video" ? (
            <video src={previews[type]} controls className="w-full rounded-lg" style={{ maxHeight: "200px" }} />
          ) : (
            <img
              src={previews[type] || "/placeholder.svg"}
              alt={`${type} preview`}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
          {uploadProgress[type] > 0 && uploadProgress[type] < 100 && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress[type]}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">{uploadProgress[type]}% uploaded</p>
            </div>
          )}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add TV Series Episode</h1>
            <div className="space-y-8">
              {isAddingEpisode ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-6">
                    {editingEpisodeIndex !== null ? "Edit Episode" : "Add New Episode"}
                  </h3>
                  <EpisodeForm
                    episodeData={currentEpisode}
                    handleInputChange={handleEpisodeInputChange}
                    errors={formErrors}
                  />
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Episode Thumbnail</h3>
                      <UploadBox type="thumbnail" accept="image/*" icon={FiImage} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Episode Video</h3>
                      <UploadBox type="video" accept="video/*" icon={FiVideo} />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      onClick={() => {
                        setIsAddingEpisode(false)
                        setEditingEpisodeIndex(null)
                        setCurrentEpisode({
                          episodeNumber: "",
                          title: "",
                          description: "",
                          duration: "",
                          thumbnail: null,
                          video: null,
                        })
                        setPreviews({
                          video: null,
                          thumbnail: null,
                          poster: null,
                        })
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addEpisode}
                      disabled={loading}
                      className={`${loading ? " bg-red-500" : " bg-blue-500   hover:bg-blue-600 "} px-4 py-2 rounded-lg text-white`}
                    >
                      {editingEpisodeIndex !== null ? "Update Episode" : loading ? "Wait..." : "Add Episode"}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Episodes</h3>
                    <button
                      onClick={() => setIsAddingEpisode(true)}
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <BiPlus className="mr-2" />
                      Add Episode
                    </button>
                  </div>

                  {episodes.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      <FiList className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium text-gray-900">No episodes added</h3>
                      <p className="mt-1 text-sm text-gray-500">Get started by adding a new episode.</p>
                      <div className="mt-6">
                        <button
                          onClick={() => setIsAddingEpisode(true)}
                          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          <BiPlus className="mr-2" />
                          Add Episode
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                              Episode
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Duration</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {episodes.map((episode, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                {episode.episodeNumber}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{episode.title}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {episode.duration} min
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => editEpisode(index)}
                                    className="text-blue-600 hover:text-blue-900"
                                  >
                                    <FiEdit className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() => deleteEpisode(index)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <FiTrash2 className="h-5 w-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

