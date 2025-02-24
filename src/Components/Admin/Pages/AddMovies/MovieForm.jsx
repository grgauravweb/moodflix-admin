import React, { Fragment, useEffect, useRef, useState } from 'react';
import { FiCalendar, FiCheck, FiClock, FiFile, FiFilm, FiGlobe, FiInfo, FiStar, FiTag, FiUsers, FiVideo } from 'react-icons/fi';

const InputField = ({ label, name, value, onChange, placeholder, error, icon: Icon, type }) => (
    <div>
        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
            {Icon && <Icon className="mr-1 h-4 w-4 text-blue-500" />}
            {label}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 ${error ? 'border-red-500 bg-red-50' : ''
                }`}
        />
        {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
    </div>
);

const MultiSelectDropdown = ({ genresData, movieData, setMovieData }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleGenreChange = (slug) => {
        const newGenres = movieData.genres.includes(slug)
            ? movieData.genres.filter((genre) => genre !== slug)
            : [...movieData.genres, slug];

        setMovieData({ ...movieData, genres: newGenres });
    };

    // Close dropdown on clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiTag className="mr-1 h-4 w-4 text-blue-500" />
                Genres
            </label>

            {/* Dropdown Button */}
            <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-left"
            >
                {movieData.genres.length > 0
                    ? movieData.genres.join(', ')
                    : 'Select Genres'}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {genresData && genresData.map((data) => (
                        <Fragment key={data._id}>
                            <label
                                htmlFor={data.slug}
                                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    id={data.slug}
                                    type="checkbox"
                                    checked={movieData.genres.includes(data.slug)}
                                    onChange={() => handleGenreChange(data.slug)}
                                    className="mr-2 rounded text-blue-500 focus:ring-0"
                                />
                                {data.name}
                                {movieData.genres.includes(data.slug) && (
                                    <FiCheck className="ml-auto text-green-500" />
                                )}
                            </label>
                        </Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

const MovieForm = ({ movieData, handleInputChange, errors, genresData, setMovieData }) => {

    return (
        <div className="space-y-8">
            {/* Title and Description Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                <div className="space-y-4">
                    <InputField
                        label="Title"
                        name="title"
                        type="text"
                        value={movieData.title}
                        onChange={handleInputChange}
                        placeholder="Enter movie title"
                        error={errors.title}
                        icon={FiFile}
                    />

                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FiInfo className="mr-1 h-4 w-4 text-blue-500" />
                        Descriptions
                    </label>
                    <textarea
                        type="text"
                        rows={4}
                        name="description"
                        value={movieData.description}
                        onChange={handleInputChange}
                        placeholder="Enter movie description"
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 ${errors.description ? 'border-red-500 bg-red-50' : ''
                            }`}
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                </div>
            </div>

            {/* Cast and Crew Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiUsers className="mr-2 h-5 w-5 text-blue-500" />
                    Cast & Crew
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                        label="Actors"
                        name="actors"
                        type="text"
                        value={movieData.actors}
                        onChange={handleInputChange}
                        error={errors.actors}
                        placeholder="Enter actors (comma separated)"
                        icon={FiUsers}
                    />

                    <InputField
                        label="Directors"
                        name="directors"
                        type="text"
                        value={movieData.directors}
                        onChange={handleInputChange}
                        error={errors.directors}
                        placeholder="Enter directors"
                        icon={FiUsers}
                    />

                    <InputField
                        label="Writers"
                        name="writers"
                        type="text"
                        value={movieData.writers}
                        onChange={handleInputChange}
                        error={errors.writers}
                        placeholder="Enter writers"
                        icon={FiUsers}
                    />
                </div>
            </div>

            {/* Details Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiFilm className="mr-2 h-5 w-5 text-blue-500" />
                    Movie Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <InputField
                        label="IMDb Rating"
                        name="imdbRating"
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={movieData.imdbRating}
                        onChange={handleInputChange}
                        error={errors.imdbRating}
                        placeholder="0.0 - 10.0"
                        icon={FiStar}
                    />

                    <InputField
                        label="Release Date"
                        name="releaseDate"
                        type="date"
                        value={movieData.releaseDate}
                        onChange={handleInputChange}
                        error={errors.releaseDate}
                        icon={FiCalendar}
                    />

                    <InputField
                        label="Runtime (minutes)"
                        name="runtime"
                        type="number"
                        placeholder="Minutes"
                        value={movieData.runtime}
                        onChange={handleInputChange}
                        error={errors.runtime}
                        icon={FiClock}
                    />

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <FiVideo className="mr-1 h-4 w-4 text-blue-500" />
                            Quality
                        </label>
                        <select
                            name="videoQuality"
                            value={movieData.videoQuality}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        >
                            <option value="4K">4K Ultra HD</option>
                            <option value="1080p">1080p Full HD</option>
                            <option value="720p">720p HD</option>
                            <option value="480p">480p SD</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiTag className="mr-2 h-5 w-5 text-blue-500" />
                    Categories
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MultiSelectDropdown
                        genresData={genresData}
                        movieData={movieData}
                        setMovieData={setMovieData}
                    />

                    <InputField
                        label="Countries"
                        name="countries"
                        placeholder="USA, UK, India..."
                        value={movieData.countries}
                        onChange={handleInputChange}
                        error={errors.countries}
                        icon={FiGlobe}
                    />
                </div>
            </div>
        </div>
    );
};

export default MovieForm;