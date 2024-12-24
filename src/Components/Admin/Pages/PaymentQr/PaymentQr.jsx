import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URLS } from '../../../../Apis/Globalapi';

const PaymentQr = () => {
  const [qrData, setQrData] = useState({
    name: '',
    image: null,
  });

  const [qrList, setQrList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentQr, setCurrentQr] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQrData({ ...qrData, [name]: value });
  };

  const handleFileChange = (e) => {
    setQrData({ ...qrData, image: e.target.files[0] });
  };

  const handleSubmit = async () => {
    if (!qrData.name || !qrData.image) {
      alert("Please fill in all fields.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(qrData.image);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        await axios.post(API_URLS.paymentQr, {
          name: qrData.name,
          image: base64Image,
        });
        fetchQrCodes(); // Fetch updated QR codes
        setQrData({ name: '', image: null }); // Reset the form
        alert("QR code added successfully!"); // Alert on successful addition
      } catch (error) {
        console.error("Error adding QR code:", error);
        alert("Error adding QR code."); // Alert on error
      }
    };
  };

  const fetchQrCodes = async () => {
    const response = await axios.get(API_URLS.paymentQr);
    setQrList(response.data);
  };

  const handleEditClick = (qr) => {
    setCurrentQr(qr);
    setQrData({ name: qr.name, image: null }); // Reset image to avoid confusion
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!qrData.name) {
      alert("Please fill in the QR code name.");
      return;
    }

    const updatedQrData = {
      ...currentQr,
      name: qrData.name,
      image: qrData.image ? await convertToBase64(qrData.image) : currentQr.image,
    };

    try {
      await axios.put(`${API_URLS.paymentQr}/${currentQr._id}`, updatedQrData);
      fetchQrCodes(); // Fetch updated QR codes
      setIsEditModalOpen(false); // Close the modal
      setQrData({ name: '', image: null }); // Reset the form
      alert("QR code updated successfully!"); // Alert on successful update
    } catch (error) {
      console.error("Error updating QR code:", error);
      alert("Error updating QR code."); // Alert on error
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this QR code?")) {
      try {
        await axios.delete(`${API_URLS.paymentQr}/${id}`);
        fetchQrCodes(); // Refresh the QR codes list
        alert("QR code deleted successfully!"); // Alert on successful deletion
      } catch (error) {
        console.error("Error deleting QR code:", error);
        alert("Error deleting QR code."); // Alert on error
      }
    }
  };

  useEffect(() => {
    fetchQrCodes(); // Fetch QR codes on component mount
  }, []);

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Add Payment QR</h2>

      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold">QR Code Info</h3>

        <div>
          <label className="block text-sm font-medium mb-1">QR Name</label>
          <input
            type="text"
            name="name"
            value={qrData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter QR code name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">QR Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2"
          />
        </div>

        {/* Image Preview Section */}
        <div className="mt-4">
          {qrData.image ? (
            <img
              src={URL.createObjectURL(qrData.image)}
              alt="Selected QR"
              className="h-32 object-cover border rounded"
            />
          ) : (
            <div className="h-32 border-dashed border-2 border-gray-400 flex items-center justify-center rounded">
              <span className="text-gray-400">No Image Selected</span>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 w-full p-2 bg-blue-600 text-white rounded transition duration-300 ease-in-out hover:bg-blue-700"
        >
          Add QR Code
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-6">Existing QR Codes</h3>
      <div className="space-y-4">
        {qrList.map((qr, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md">
            <h4 className="text-md font-semibold">{qr.name}</h4>
            {qr.image && <img src={qr.image} alt={qr.name} className="mt-2 h-32 object-cover" />}
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => handleEditClick(qr)}
                className="bg-yellow-500 text-white p-1 rounded py-2 px-8 hover:bg-yellow-300 all ease"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(qr._id)}
                className="bg-red-500 text-white p-1 rounded py-2 px-8 hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold">Edit QR Code</h3>

            <div>
              <label className="block text-sm font-medium mb-1">QR Name</label>
              <input
                type="text"
                name="name"
                value={qrData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter QR code name"
              />
            </div>

            <div className="mt-4">
              <img
                src={currentQr ? currentQr.image : ''}
                alt={currentQr ? currentQr.name : ''}
                className="h-32 object-cover border rounded"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">QR Image</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-2"
              />
            </div>

            <button
              onClick={handleUpdate}
              className="mt-4 w-full p-2 bg-blue-600 text-white rounded transition duration-300 ease-in-out hover:bg-blue-700"
            >
              Update QR Code
            </button>

            <button
              onClick={() => setIsEditModalOpen(false)}
              className="mt-2 w-full p-2 bg-gray-400 text-white rounded transition duration-300 ease-in-out hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentQr;
