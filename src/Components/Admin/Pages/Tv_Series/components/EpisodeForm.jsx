import React, { useState } from 'react';
import { FiImage, FiVideo, FiX } from 'react-icons/fi';

export function EpisodeForm({ loading, episode, onSubmit, onClose }) {
 
    const [formData, setFormData] = useState({
        _id: episode?._id || '',
        seasonNumber: episode?.seasonNumber || 1,
        episodeNumber: episode?.episodeNumber || 1,
        title: episode?.title || '',
        description: episode?.description || '',
        duration: episode?.duration || '',
        video: episode?.video || '',
        thumbnail: episode?.thumbnail || '',
    });

    const [isDragging, setIsDragging] = useState(false)
    const [previews, setPreviews] = useState({
        video: null,
        thumbnail: null,
        poster: null,
    })

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title?.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!formData.seasonNumber || formData.seasonNumber < 1) {
            newErrors.seasonNumber = 'Valid season number is required';
        }
        if (!formData.episodeNumber || formData.episodeNumber < 1) {
            newErrors.episodeNumber = 'Valid episode number is required';
        }
        if (!formData.duration?.trim()) {
            newErrors.duration = 'Duration is required';
        }
        if (!formData.video) {
            newErrors.video = 'Video file is required';
        }
        if (!formData.thumbnail) {
            newErrors.thumbnail = 'Thumbnail image is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when field is modified
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

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



            // Clear error when file is uploaded
            if (errors[type]) {
                setErrors({
                    ...errors,
                    [type]: null,
                })
            }

            // Create preview URL
            const previewUrl = URL.createObjectURL(file)
            setPreviews((prev) => ({
                ...prev,
                [type]: previewUrl,
            }))

        }
    }

    const removeFile = (type) => {
        setPreviews((prev) => ({
            ...prev,
            [type]: null,
        }))
    }

    const handleFileSelect = (type, url) => {
        setFormData((prev) => ({
            ...prev,
            [type]: url, // Update formData with selected file URL
        }));
    };


    const UploadBox = ({ type, accept, name, icon: Icon }) => (
        <div className="space-y-4">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, type)}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${isDragging
                        ? "border-blue-500 bg-blue-50"
                        : errors[type]
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300 hover:border-blue-400"
                    }`}
            >
                <Icon className={`mx-auto mb-4 ${errors[type] ? "text-red-400" : "text-gray-400"}`} size={48} />
                <p className={`mb-2 ${errors[type] ? "text-red-600" : "text-gray-600"}`}>
                    {errors[type] || `Drag & drop your ${type} here`}
                </p>
                <p className="text-sm text-gray-500">or</p>
                <label className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                    Browse Files
                    <input
                        type="file"
                        accept={accept}
                        name={name}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const previewUrl = URL.createObjectURL(file);
                                setPreviews((prev) => ({
                                    ...prev,
                                    [type]: previewUrl,
                                }));

                                // Update formData with the file URL
                                setFormData((prev) => ({
                                    ...prev,
                                    [type]: file, // Updating video or thumbnail
                                }));

                                // Clear error when file is uploaded
                                if (errors[type]) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        [type]: null,
                                    }));
                                }
                            }
                        }}
                        className="hidden"
                    />
                </label>
            </div>

            {previews[type] ? (
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
                        <img src={previews[type] || "/placeholder.svg"} alt={`${type} preview`} className="w-full h-48 object-cover rounded-lg" />
                    )}
                </div>
            ) : (
                <div className="relative bg-gray-50 p-4 rounded-lg">
                    
                    {type === "video" ? (
                        <video src={formData.video} controls className="w-full rounded-lg" style={{ maxHeight: "200px" }} />
                    ) : (
                        <img src={formData.thumbnail
                    ? decodeURIComponent(formData.thumbnail)
                    : decodeURIComponent(formData.thumbnail)} alt={`${type} preview`} className="w-full h-48 object-cover rounded-lg" />
                    )}
                </div>
            )}
        </div>
    );


    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                        {episode ? 'Edit Episode' : 'Add New Episode'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Season Number
                            </label>
                            <input
                                type="number"
                                name="seasonNumber"
                                value={formData.seasonNumber}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.seasonNumber ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                min="1"
                            />
                            {errors.seasonNumber && (
                                <p className="mt-1 text-sm text-red-500">{errors.seasonNumber}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Episode Number
                            </label>
                            <input
                                type="number"
                                name="episodeNumber"
                                value={formData.episodeNumber}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.episodeNumber ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                min="1"
                            />
                            {errors.episodeNumber && (
                                <p className="mt-1 text-sm text-red-500">{errors.episodeNumber}</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Duration
                        </label>
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="HH:MM:SS"
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.duration ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.duration && (
                            <p className="mt-1 text-sm text-red-500">{errors.duration}</p>
                        )}
                    </div>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Episode Thumbnail</h3>
                            <UploadBox type="thumbnail" name="thumbnail" accept="image/*" icon={FiImage} onFileSelect={handleFileSelect} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Episode Video</h3>
                            <UploadBox type="video" name="video" accept="video/*" icon={FiVideo} onFileSelect={handleFileSelect} />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`${loading ? " bg-red-500" : " bg-blue-500   hover:bg-blue-600 "} px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors`}
                        >
                            {episode ? 'Save Changes' : 'Add Episode'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}