import { FiClock, FiFile, FiInfo, FiHash } from "react-icons/fi"

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

const EpisodeForm = ({ episodeData = {}, handleInputChange, errors = {} }) => {
  // Add default empty object to prevent undefined errors
  const { episodeNumber = "", title = "", description = "", duration = "" } = episodeData || {}

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Episode Number"
          name="episodeNumber"
          type="text"
          value={episodeNumber}
          onChange={handleInputChange}
          placeholder="S01E01"
          error={errors.episodeNumber}
          icon={FiHash}
        />

        <InputField
          label="Episode Title"
          name="title"
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="Enter episode title"
          error={errors.title}
          icon={FiFile}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
          <FiInfo className="mr-1 h-4 w-4 text-blue-500" />
          Episode Description
        </label>
        <textarea
          rows={3}
          name="description"
          value={description}
          onChange={handleInputChange}
          placeholder="Enter episode description"
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 ${
            errors.description ? "border-red-500 bg-red-50" : ""
          }`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <InputField
        label="Duration (minutes)"
        name="duration"
        type="number"
        value={duration}
        onChange={handleInputChange}
        placeholder="Enter duration in minutes"
        error={errors.duration}
        icon={FiClock}
      />
    </div>
  )
}

export default EpisodeForm

