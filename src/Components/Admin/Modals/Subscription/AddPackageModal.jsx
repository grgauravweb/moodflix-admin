import React, { useState, useEffect } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";

const AddPackageModal = ({
  isOpen,
  onClose,
  onAdd,
  onEdit,
  editingPackage,
}) => {
  const [packageName, setPackageName] = useState("");
  const [validity, setValidity] = useState("1 week (7 days)");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (editingPackage) {
      setPackageName(editingPackage.packageName);
      setValidity(editingPackage.validity);
      setPrice(editingPackage.price);
      setStatus(editingPackage.status);
      setDescription(editingPackage.description);
    } else {
      setPackageName("");
      setValidity("1 week (7 days)");
      setPrice("");
      setStatus("Active");
      setDescription("");
    }
  }, [editingPackage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const packageData = {
      packageName,
      validity,
      price,
      status,
      description,
    };

    try {
      let response;

      if (editingPackage) {
        // Update existing package
        response = await fetch(`${API_URLS.packages}/${editingPackage._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(packageData),
        });
      } else {
        // Create new package
        response = await fetch(API_URLS.packages, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(packageData),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save package");
      }

      const newPackage = await response.json();
      if (editingPackage) {
        onEdit(newPackage); // Pass updated package to the parent
      } else {
        onAdd(newPackage); // Pass new package to the parent
      }

      onClose(); // Close the modal after successful addition or edit
      alert("Date Saved");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save package: " + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-20 p-5">
      <div className="bg-white rounded p-4 max-w-sm w-full overflow-hidden shadow-lg">
        <h3 className="text-xl font-semibold mb-2">
          {editingPackage ? "Edit Package" : "Add Package"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block mb-1">Package Name</label>
            <input
              type="text"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="border w-full p-1 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Validity (Days)</label>
            <select
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              className="border w-full p-1 rounded"
            >
              <option value="7">1 week (7 days)</option>
              <option value="14">2 weeks (14 days)</option>
              <option value="21">3 weeks (21 days)</option>
              <option value="28">4 weeks (28 days)</option>
              <option value="30">1 month (30 days)</option>
              <option value="60">2 months (60 days)</option>
              <option value="90">3 months (90 days)</option>
              <option value="180">6 months (180 days)</option>
              <option value="365">12 months (365 days)</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block mb-1">Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border w-full p-1 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border w-full p-1 rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="block mb-1">
              Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter description..."
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded mr-2 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200"
            >
              {editingPackage ? "Update Package" : "Add Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackageModal;
