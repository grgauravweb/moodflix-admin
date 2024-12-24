import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddPackageModal from "../../Modals/Subscription/AddPackageModal";
import { API_URLS } from "../../../../Apis/Globalapi";

const Package = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(API_URLS.packages);
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const handleOpenAddModal = () => {
    setEditingPackage(null); // Reset editing package
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setEditingPackage(null); // Reset editing package on close
  };

  const handleAddPackage = (newPackage) => {
    setPackages([...packages, newPackage]);
    handleCloseAddModal();
  };

  const handleUpdatePackage = (updatedPackage) => {
    setPackages(packages.map((pkg) => (pkg._id === updatedPackage._id ? updatedPackage : pkg)));
    handleCloseAddModal();
  };

  const handleEditClick = (pkg) => {
    setEditingPackage(pkg);
    setIsAddModalOpen(true);
  };

  const handleDeleteClick = async (packageId) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        const response = await fetch(`${API_URLS.packages}/${packageId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete package");
        }

        setPackages(packages.filter((pkg) => pkg._id !== packageId));
        alert("deleted successfully!");
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Package Management</h2>

      <button
        onClick={handleOpenAddModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600"
      >
        + Add Package
      </button>

      <AddPackageModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAdd={handleAddPackage}
        onEdit={handleUpdatePackage}
        editingPackage={editingPackage} // Pass the editing package
      />

      <div className="bg-white p-4 shadow-md rounded overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b">#</th>
              <th className="p-2 border-b">Package Name</th>
              <th className="p-2 border-b">Validity (Day)</th>
              <th className="p-2 border-b">Price (₹)</th>
              <th className="p-2 border-b">Status</th>
              <th className="p-2 border-b text-center">Options</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg, index) => (
              <tr key={pkg._id} className="hover:bg-gray-100">
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{pkg.packageName}</td>
                <td className="p-2 border-b">{pkg.validity}</td>
                <td className="p-2 border-b">₹{pkg.price}</td>
                <td className="p-2 border-b">{pkg.status}</td>
                <td className="p-2 border-b text-center">
                  <button
                    onClick={() => handleEditClick(pkg)} // Open modal for editing
                    className="text-green-500 hover:text-green-600 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(pkg._id)}
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

export default Package;
