import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import AddCountry from '../Modals/CountryManagemnet/AddCountry';
import EditCountry from '../Modals/CountryManagemnet/EditCountry';
import { API_URLS } from '../../../Apis/Globalapi';

const CountryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [countries, setCountries] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = (country) => {
    setCurrentCountry(country);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setCurrentCountry(null);
  };

  const handleSave = (updatedCountry) => {
    // Save the updated country details (you would usually send this to an API)
    console.log('Updated country:', updatedCountry);
    handleEditModalClose();
  };

  // Fetch countries from the backend
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(API_URLS.country); // Update with your backend API URL
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleDelete = async (countryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this country?');
    
    if (confirmDelete) {
      try {
        await fetch(`${API_URLS.country}/${countryId}`, {
          method: 'DELETE',
        });
        // Update the countries list after deletion
        setCountries(countries.filter(country => country._id !== countryId));
        alert("deleted successfully!");
      } catch (error) {
        console.error('Error deleting country:', error);
      }
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Country Management</h2>

      {/* Add Country Button */}
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600"
      >
        + Add Country
      </button>

      <AddCountry isOpen={isModalOpen} onClose={handleCloseModal} />

      <EditCountry
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        country={currentCountry || {}}
        onSave={handleSave}
      />

      {/* Table Container */}
      <div className="bg-white p-4 shadow-md rounded overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b text-sm md:text-base">#</th>
              <th className="p-2 border-b text-sm md:text-base">Name</th>
              <th className="p-2 border-b text-sm md:text-base">Icon</th>
              <th className="p-2 border-b text-sm md:text-base">Slug</th>
              <th className="p-2 border-b text-sm md:text-base">Description</th>
              <th className="p-2 border-b text-sm md:text-base">Status</th>
              <th className="p-2 border-b text-sm md:text-base text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr key={country._id} className="hover:bg-gray-100">
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{country.name}</td>
                <td className="p-2 border-b">
                  <img
                    src={country.icon} // Use base64 icon here
                    alt={`${country.name} Icon`}
                    className="w-6 h-6 inline-block"
                  />
                </td>
                <td className="p-2 border-b">{country.slug}</td>
                <td className="p-2 border-b">{country.description}</td>
                <td className="p-2 border-b">{country.status}</td>
                <td className="p-2 border-b text-center">
                  <button
                    onClick={() => handleEditClick(country)}
                    className="text-green-500 hover:text-green-600 mr-4"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(country._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryManagement;
