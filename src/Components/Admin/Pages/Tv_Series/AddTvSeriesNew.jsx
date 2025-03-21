
import { useState, useEffect } from "react"
import TVSeriesForm from "./TvSeriesForm"
import { BiCheck } from "react-icons/bi"
import {
  FiChevronLeft,
  FiChevronRight,
  FiImage,
  FiLoader,
  FiX,
} from "react-icons/fi"
import axios from "axios"
import { API_URLS } from "../../../../Apis/Globalapi"

export const AddTVSeriesNew = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formErrors, setFormErrors] = useState({})
  const [seriesData, setSeriesData] = useState({
    tmdbId: "",
    title: "",
    slug: "",
    description: "",
    actors: "",
    directors: "",
    writers: "",
    imdbRating: "",
    releaseDate: "",
    countries: "India",
    genres: [],
    seasons: 1,
    freePaid: "Paid",
    trailerUrl: "",
    videoQuality: "4K",
    thumbnail: null,
    poster: null,
    sendNewsletter: false,
    sendPushNotification: false,
    publish: false,
    enableDownload: false,
  })

  const [genresData, setGenresData] = useState([])
  const [actorData, setActorData] = useState([])
  const [writerData, setWriterData] = useState([])
  const [directorData, setDirectorData] = useState([])
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

  const validateStep = (step) => {
    const errors = {}

    switch (step) {
      case 1: // Series Info
        if (!seriesData.title.trim()) errors.title = "Title is required"
        if (!seriesData.description.trim()) errors.description = "Description is required"
        if (!seriesData.actors) errors.actors = "Actors are required"
        if (!seriesData.directors) errors.directors = "Directors are required"
        if (!seriesData.releaseDate) errors.releaseDate = "Release date is required"
        if (!seriesData.seasons) errors.seasons = "Number of seasons is required"
        break
      case 2: // Media
        if (!seriesData.thumbnail) errors.thumbnail = "Thumbnail is required"
        if (!seriesData.poster) errors.poster = "Poster is required"
        break
      case 3: // Settings
        // Optional settings, no validation needed
        break
      default:
        break
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5))
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    setSeriesData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }))
    }
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


      setSeriesData({
        ...seriesData,
        [type]: file,
      })


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

    setSeriesData((prev) => ({
      ...prev,
      [type]: null,
    }))


    setPreviews((prev) => ({
      ...prev,
      [type]: null,
    }))
    setUploadProgress((prev) => ({
      ...prev,
      [type]: 0,
    }))
  }

  const handlePublish = async () => {
    // Validate all steps before publishing
    let isValid = true
    for (let step = 1; step <= 4; step++) {
      if (!validateStep(step)) {
        isValid = false
        setCurrentStep(step)
        break
      }
    }

    if (isValid) {
      // Proceed with publishing
      setLoading(true)
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
          seasons,
          freePaid,
          trailerUrl,
          videoQuality,
          sendNewsletter,
          sendPushNotification,
          publish,
          enableDownload,
          thumbnail,
          poster,
        } = seriesData

        const genresArray = Array.isArray(genres) ? genres : []

        const actorsArray = Array.isArray(actors)
          ? actors
          : typeof actors === "string"
            ? actors.split(",").map((a) => a.trim())
            : []
        const directorsArray = Array.isArray(directors)
          ? directors
          : typeof directors === "string"
            ? directors.split(",").map((d) => d.trim())
            : []
        const writersArray = Array.isArray(writers)
          ? writers
          : typeof writers === "string"
            ? writers.split(",").map((w) => w.trim())
            : []

        // Create FormData for file uploads
        const formData = new FormData()
        formData.append("title", title)
        formData.append("slug", slug)
        formData.append("description", description)
        formData.append("actors", actorsArray)
        formData.append("directors", directorsArray)
        formData.append("writers", writersArray)
        formData.append("imdbRating", imdbRating)
        formData.append("releaseDate", releaseDate)
        formData.append("countries", countries)
        formData.append("genres", genresArray)
        formData.append("seasons", seasons)
        formData.append("freePaid", freePaid)
        formData.append("trailerUrl", trailerUrl)
        formData.append("videoQuality", videoQuality)
        formData.append("sendNewsletter", sendNewsletter)
        formData.append("sendPushNotification", sendPushNotification)
        formData.append("publish", publish)
        formData.append("enableDownload", enableDownload)

        if (thumbnail) formData.append("thumbnail", thumbnail)
        if (poster) formData.append("poster", poster)

        // for (let pair of formData.entries()) {
        //   console.log(`${pair[0]}:`, pair[1]);
        // }

        // Send request to API
        const response = await axios.post(API_URLS.AddTvSeries, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })

        console.log("TV Series added successfully:", response.data)
        if (response.data.success === true) {
          // Reset form
          setSeriesData({
            title: "",
            slug: "",
            description: "",
            actors: "",
            directors: "",
            writers: "",
            imdbRating: "",
            releaseDate: "",
            countries: "India",
            genres: [],
            seasons: 1,
            freePaid: "Paid",
            trailerUrl: "",
            videoQuality: "4K",
            thumbnail: null,
            poster: null,
            sendNewsletter: false,
            sendPushNotification: false,
            publish: false,
            enableDownload: false,
          })
          setCurrentStep(1)
          alert("TV Series added successfully")
          window.location.pathname = "admin/all-tv-series";
        }
      } catch (error) {
        console.error("Error adding TV Series:", error.response?.data || error.message)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching Genres
        const genresResponse = await axios.get(API_URLS.genre)
        setGenresData(genresResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    const fetchActorData = async () => {
      try {
        // Fetching Actors
        const actorResponse = await axios.get(API_URLS.getActor)
        setActorData(actorResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    const fetchWriterData = async () => {
      try {
        // Fetching Writers
        const genresResponse = await axios.get(API_URLS.getWriter)
        setWriterData(genresResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    const fetchDirectorData = async () => {
      try {
        // Fetching Directors
        const genresResponse = await axios.get(API_URLS.getDirector)
        setDirectorData(genresResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
    fetchActorData()
    fetchWriterData()
    fetchDirectorData()
  }, [])

  const StepIndicator = ({ number, title, isActive, isCompleted }) => (
    <div className={`flex items-center ${isActive ? "text-blue-600" : "text-gray-500"}`}>
      <div
        className={`
        flex items-center justify-center w-8 h-8 rounded-full border-2 
        ${isActive ? "border-blue-600 bg-blue-50" : isCompleted ? "border-green-500 bg-green-50" : "border-gray-300"}
        ${isCompleted ? "text-green-500" : ""}
      `}
      >
        {isCompleted ? <BiCheck size={16} /> : number}
      </div>
      <span className="ml-2 font-medium">{title}</span>
      {number < 3 && <div className={`w-12 h-0.5 mx-2 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`} />}
    </div>
  )

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

                setSeriesData({ ...seriesData, [type]: file })

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
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New TV Series</h1>

            {/* Step Indicator */}
            <div className="flex flex-wrap justify-center items-center mb-8 gap-2">
              <StepIndicator
                number={1}
                title="Series Info"
                isActive={currentStep === 1}
                isCompleted={currentStep > 1}
              />
              <StepIndicator number={2} title="Media" isActive={currentStep === 2} isCompleted={currentStep > 2} />
              <StepIndicator number={3} title="Settings" isActive={currentStep === 4} isCompleted={currentStep > 3} />
            </div>

            {/* TMDB Import Section */}
            {currentStep === 1 && (
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-blue-900">Import from TMDB</h2>
                    <p className="text-blue-700">Quickly import TV series details using TMDB ID</p>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      name="tmdbId"
                      value={seriesData.tmdbId}
                      onChange={handleInputChange}
                      placeholder="Enter TMDB ID"
                      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      Import
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {currentStep === 1 && (
              <TVSeriesForm
                seriesData={seriesData}
                handleInputChange={handleInputChange}
                errors={formErrors}
                genresData={genresData}
                actorData={actorData}
                writerData={writerData}
                directorData={directorData}
                setSeriesData={setSeriesData}
              />
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Thumbnail</h3>
                    <UploadBox type="thumbnail" accept="image/*" icon={FiImage} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Poster</h3>
                    <UploadBox type="poster" accept="image/*" icon={FiImage} />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg">
                  <h3 className="text-xl font-semibold mb-6">Publication Settings</h3>
                  <div className="space-y-4">
                    {[
                      {
                        id: "sendNewsletter",
                        label: "Send Newsletter",
                        description: "Notify subscribers about this new TV series",
                      },
                      {
                        id: "sendPushNotification",
                        label: "Send Push Notification",
                        description: "Send push notifications to mobile app users",
                      },
                      {
                        id: "publish",
                        label: "Publish Immediately",
                        description: "Make this TV series visible to users",
                      },
                      {
                        id: "enableDownload",
                        label: "Enable Downloads",
                        description: "Allow users to download episodes",
                      },
                    ].map(({ id, label, description }) => (
                      <div
                        key={id}
                        className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <input
                          type="checkbox"
                          id={id}
                          name={id}
                          checked={seriesData[id]}
                          onChange={handleInputChange}
                          className="mt-1 h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <div>
                          <label htmlFor={id} className="font-medium text-gray-900">
                            {label}
                          </label>
                          <p className="text-sm text-gray-500">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className={`flex items-center px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${currentStep === 1 ? "invisible" : ""
                }`}
            >
              <FiChevronLeft size={20} className="mr-2" />
              Back
            </button>
            <div className="flex space-x-4">
              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Next
                  <FiChevronRight size={20} className="ml-2" />
                </button>
              ) : (
                <button
                  onClick={handlePublish}
                  disabled={loading}
                  className={`flex items-center px-6 py-2 ${loading ? "bg-red-500" : "bg-green-500 hover:bg-green-600 transition-colors"}  text-white rounded-lg `}
                >
                  {loading ? "Please wait..." : "Publish TV Series"}
                  {loading ? (
                    <FiLoader size={20} className="ml-2 animate-pulse" />
                  ) : (
                    <BiCheck size={20} className="ml-2" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

