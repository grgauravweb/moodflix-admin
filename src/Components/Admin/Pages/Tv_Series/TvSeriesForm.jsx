import { Fragment } from "react"
import { BsLink } from "react-icons/bs"
import { FiCalendar, FiFile, FiFilm, FiGlobe, FiInfo, FiLayers, FiStar, FiTag, FiUsers, FiVideo } from "react-icons/fi"
import Select from "react-select"

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
      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 ${
        error ? "border-red-500 bg-red-50" : ""
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
)

const TVSeriesForm = ({
  seriesData,
  handleInputChange,
  errors,
  genresData,
  actorData,
  writerData,
  directorData,
  setSeriesData,
}) => {
  const options = {
    actors: actorData.map((item) => ({
      value: item._id,
      label: item.starName,
    })),
    directors: directorData.map((item) => ({
      value: item._id,
      label: item.starName,
    })),
    writers: writerData.map((item) => ({
      value: item._id,
      label: item.starName,
    })),
    genresdataOptions: genresData.map((item) => ({
      value: item._id,
      label: item.name,
    })),
  }

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
            value={seriesData.title}
            onChange={handleInputChange}
            placeholder="Enter TV series title"
            error={errors.title}
            icon={FiFile}
          />

          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
            <FiInfo className="mr-1 h-4 w-4 text-blue-500" />
            Description
          </label>
          <textarea
            type="text"
            rows={4}
            name="description"
            value={seriesData.description}
            onChange={handleInputChange}
            placeholder="Enter TV series description"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 ${
              errors.description ? "border-red-500 bg-red-50" : ""
            }`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}

          <InputField
            label="Trailer URL"
            name="trailerUrl"
            type="text"
            value={seriesData.trailerUrl}
            onChange={handleInputChange}
            placeholder="Enter TV series trailer URL"
            error={errors.trailerUrl}
            icon={BsLink}
          />
        </div>
      </div>

      {/* Cast and Crew Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiUsers className="mr-2 h-5 w-5 text-blue-500" />
          Cast & Crew
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Actors</label>
            <Select
              isMulti
              options={options.actors}
              value={options.actors.filter((option) => seriesData.actors.includes(option.value))}
              onChange={(selectedOptions) =>
                handleInputChange({
                  target: {
                    name: "actors",
                    value: selectedOptions.map((option) => option.value),
                  },
                })
              }
              className="text-gray-700"
            />
            {errors.actors && <p className="text-red-500 text-sm mt-1">{errors.actors}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Directors</label>
            <Select
              isMulti
              options={options.directors}
              value={options.directors.filter((option) => seriesData.directors.includes(option.value))}
              onChange={(selectedOptions) =>
                handleInputChange({
                  target: {
                    name: "directors",
                    value: selectedOptions.map((option) => option.value),
                  },
                })
              }
              className="text-gray-700"
            />
            {errors.directors && <p className="text-red-500 text-sm mt-1">{errors.directors}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Writers</label>
            <Select
              isMulti
              options={options.writers}
              value={options.writers.filter((option) => seriesData.writers.includes(option.value))}
              onChange={(selectedOptions) =>
                handleInputChange({
                  target: {
                    name: "writers",
                    value: selectedOptions.map((option) => option.value),
                  },
                })
              }
              className="text-gray-700"
            />
            {errors.writers && <p className="text-red-500 text-sm mt-1">{errors.writers}</p>}
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiFilm className="mr-2 h-5 w-5 text-blue-500" />
          Series Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="IMDb Rating"
            name="imdbRating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={seriesData.imdbRating}
            onChange={handleInputChange}
            error={errors.imdbRating}
            placeholder="0.0 - 10.0"
            icon={FiStar}
          />

          <InputField
            label="Release Date"
            name="releaseDate"
            type="date"
            value={seriesData.releaseDate}
            onChange={handleInputChange}
            error={errors.releaseDate}
            icon={FiCalendar}
          />

          <InputField
            label="Number of Seasons"
            name="seasons"
            type="number"
            placeholder="Number of seasons"
            value={seriesData.seasons}
            onChange={handleInputChange}
            error={errors.seasons}
            icon={FiLayers}
          />

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FiVideo className="mr-1 h-4 w-4 text-blue-500" />
              Quality
            </label>
            <select
              name="videoQuality"
              value={seriesData.videoQuality}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Genres</label>
            <Select
              isMulti
              options={options.genresdataOptions}
              value={options.genresdataOptions.filter(
                (option) => Array.isArray(seriesData.genres) && seriesData.genres?.includes(option.value),
              )}
              onChange={(selectedOptions) =>
                handleInputChange({
                  target: {
                    name: "genres",
                    value: selectedOptions ? selectedOptions.map((option) => option.value) : [],
                  },
                })
              }
              className="text-gray-700"
            />
            {errors.genresData && <p className="text-red-500 text-sm mt-1">{errors.genresData}</p>}
          </div>

          <div>
            <InputField
              label="Countries"
              name="countries"
              placeholder="USA, UK, India..."
              value={seriesData.countries}
              onChange={handleInputChange}
              error={errors.countries}
              icon={FiGlobe}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FiVideo className="mr-1 h-4 w-4 text-blue-500" />
              Slug (URL-friendly)
            </label>

            <select
              name="slug"
              value={seriesData.slug}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            >
              <option value="">Select</option>
              {genresData.map((data) => (
                <Fragment key={data._id}>
                  <option value={data._id}>{data.name}</option>
                </Fragment>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Free/Paid</label>
            <select
              name="freePaid"
              value={seriesData.freePaid}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            >
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TVSeriesForm

