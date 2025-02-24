import React, { useState, useEffect } from 'react';
import MovieForm from './MovieForm';
import { BiCheck } from 'react-icons/bi';
import { FiChevronLeft, FiChevronRight, FiImage, FiVideo, FiX } from 'react-icons/fi';
import axios from 'axios';
import { API_URLS } from '../../../../Apis/Globalapi';

export const AddMoviesNew = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [movieData, setMovieData] = useState({
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
    runtime: "",
    freePaid: "Paid",
    trailerUrl: "",
    videoUrl: "",
    videoQuality: "4K",
    thumbnail: null,
    poster: null,
    video: null,
    sendNewsletter: false,
    sendPushNotification: false,
    publish: false,
    enableDownload: false,
  });

  const [genresData, setGenresData] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({
    video: 0,
    thumbnail: 0,
    poster: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState({
    video: null,
    thumbnail: null,
    poster: null
  });

  const validateStep = (step) => {
    const errors = {};

    switch (step) {
      case 1: // Movie Info
        if (!movieData.title.trim()) errors.title = "Title is required";
        if (!movieData.description.trim()) errors.description = "Description is required";
        if (!movieData.actors.trim()) errors.actors = "Actors are required";
        if (!movieData.directors.trim()) errors.directors = "Directors are required";
        if (!movieData.releaseDate) errors.releaseDate = "Release date is required";
        if (!movieData.runtime) errors.runtime = "Runtime is required";
        break;
      case 2: // Media
        if (!movieData.video) errors.video = "Video file is required";
        if (!movieData.thumbnail) errors.thumbnail = "Thumbnail is required";
        if (!movieData.poster) errors.poster = "Poster is required";
        break;
      case 3: // Settings
        // Optional settings, no validation needed
        break;
        default:
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setMovieData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };
  

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e, type) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      if (type === 'video' && !file.type.startsWith('video/')) {
        alert('Please drop a video file');
        return;
      }
      if ((type === 'thumbnail' || type === 'poster') && !file.type.startsWith('image/')) {
        alert('Please drop an image file');
        return;
      }
      
      setMovieData({
        ...movieData,
        [type]: file
      });

      // Clear error when file is uploaded
      if (formErrors[type]) {
        setFormErrors({
          ...formErrors,
          [type]: null
        });
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviews(prev => ({
        ...prev,
        [type]: previewUrl
      }));

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        if (progress <= 100) {
          setUploadProgress(prev => ({
            ...prev,
            [type]: progress
          }));
        } else {
          clearInterval(interval);
        }
      }, 100);
    }
  };

  const removeFile = (type) => {
    setMovieData(prev => ({
      ...prev,
      [type]: null
    }));
    setPreviews(prev => ({
      ...prev,
      [type]: null
    }));
    setUploadProgress(prev => ({
      ...prev,
      [type]: 0
    }));
  };

  const handlePublish = () => {
    // Validate all steps before publishing
    let isValid = true;
    for (let step = 1; step <= 3; step++) {
      if (!validateStep(step)) {
        isValid = false;
        setCurrentStep(step);
        break;
      }
    }

    if (isValid) {
      // Proceed with publishing
      console.log('Publishing movie:', movieData);
      alert('Movie published successfully!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching Genres
        const genresResponse = await axios.get(API_URLS.genre);
        setGenresData(genresResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        }
        };
        fetchData();
    }, []);

  const StepIndicator = ({ number, title, isActive, isCompleted }) => (
    <div className={`flex items-center ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
      <div className={`
        flex items-center justify-center w-8 h-8 rounded-full border-2 
        ${isActive ? 'border-blue-600 bg-blue-50' : isCompleted ? 'border-green-500 bg-green-50' : 'border-gray-300'}
        ${isCompleted ? 'text-green-500' : ''}
      `}>
        {isCompleted ? <BiCheck size={16} /> : number}
      </div>
      <span className="ml-2 font-medium">{title}</span>
      {number < 3 && <div className={`w-12 h-0.5 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />}
    </div>
  );

  const UploadBox = ({ type, accept, icon: Icon }) => (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, type)}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          isDragging ? 'border-blue-500 bg-blue-50' : formErrors[type] ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        <Icon className={`mx-auto mb-4 ${formErrors[type] ? 'text-red-400' : 'text-gray-400'}`} size={48} />
        <p className={`mb-2 ${formErrors[type] ? 'text-red-600' : 'text-gray-600'}`}>
          {formErrors[type] || `Drag & drop your ${type} here`}
        </p>
        <p className="text-sm text-gray-500">or</p>
        <label className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
          Browse Files
          <input
            type="file"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setMovieData({ ...movieData, [type]: file });
                const previewUrl = URL.createObjectURL(file);
                setPreviews(prev => ({
                  ...prev,
                  [type]: previewUrl
                }));
                // Clear error when file is uploaded
                if (formErrors[type]) {
                  setFormErrors({
                    ...formErrors,
                    [type]: null
                  });
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
          {type === 'video' ? (
            <video
              src={previews[type]}
              controls
              className="w-full rounded-lg"
              style={{ maxHeight: '200px' }}
            />
          ) : (
            <img
              src={previews[type]}
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
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Movie</h1>
            
            {/* Step Indicator */}
            <div className="flex justify-center items-center mb-8">
              <StepIndicator 
                number={1} 
                title="Movie Info" 
                isActive={currentStep === 1} 
                isCompleted={currentStep > 1} 
              />
              <StepIndicator 
                number={2} 
                title="Media" 
                isActive={currentStep === 2} 
                isCompleted={currentStep > 2} 
              />
              <StepIndicator 
                number={3} 
                title="Settings" 
                isActive={currentStep === 3} 
                isCompleted={currentStep > 3} 
              />
            </div>

            {/* TMDB Import Section */}
            {currentStep === 1 && (
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-blue-900">Import from TMDB</h2>
                    <p className="text-blue-700">Quickly import movie details using TMDB ID</p>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      name="tmdbId"
                      value={movieData.tmdbId}
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
              <MovieForm 
                movieData={movieData} 
                handleInputChange={handleInputChange}
                errors={formErrors}
                genresData={genresData}
                setMovieData={setMovieData}
              />
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Upload Video</h3>
                  <UploadBox type="video" accept="video/*" icon={FiVideo} />
                </div>
                
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
                      { id: 'sendNewsletter', label: 'Send Newsletter', description: 'Notify subscribers about this new movie' },
                      { id: 'sendPushNotification', label: 'Send Push Notification', description: 'Send push notifications to mobile app users' },
                      { id: 'publish', label: 'Publish Immediately', description: 'Make this movie visible to users' },
                      { id: 'enableDownload', label: 'Enable Downloads', description: 'Allow users to download this movie' }
                    ].map(({ id, label, description }) => (
                      <div key={id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <input
                          type="checkbox"
                          id={id}
                          name={id}
                          checked={movieData[id]}
                          onChange={handleInputChange}
                          className="mt-1 h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <div>
                          <label htmlFor={id} className="font-medium text-gray-900">{label}</label>
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
              className={`flex items-center px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
                currentStep === 1 ? 'invisible' : ''
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
                  className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Publish Movie
                  <BiCheck size={20} className="ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
