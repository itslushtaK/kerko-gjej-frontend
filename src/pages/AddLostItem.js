import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression"; // Ensure you have this package installed

const AddLostItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    let errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Item Name is required.";
    }

    // Phone number validation
    const phoneRegex = /^\+383\d{8,}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber =
        "Phone number must start with +383 and have at least 8 digits.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!validateFields()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://kerko-gjej-production.up.railway.app/api/lost-items/add",
        formData, // Changed from itemData to formData
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setSuccessMessage(
        "Your post has been submitted for approval to the admin."
      );
      setTimeout(() => navigate("/lost-items"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Error adding lost item");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (in bytes)
      const fileSize = file.size; // size in bytes
      const maxSize = 80 * 1024; // 80 KB in bytes

      if (fileSize > maxSize) {
        setError("Image size should not exceed 80 KB.");
        return;
      }

      try {
        const options = {
          maxSizeMB: 0.08, // maximum size in MB (80 KB)
          maxWidthOrHeight: 1920, // max width or height
          useWebWorker: true, // use web worker for compression
        };

        // Compress the image
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(compressedFile); // Convert compressed image to base64 string
      } catch (err) {
        setError("Error compressing image.");
        console.error(err);
      }
    } else {
      setFormData((prev) => ({ ...prev, image: "" }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 bg-white rounded-lg shadow-md lg:shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Add Lost Item</h2>

        {error && (
          <div className="mt-5 mb-5 p-4 rounded-md text-center bg-red-100 text-red-800">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mt-5 mb-5 p-4 rounded-md text-center bg-green-100 text-green-800">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            onChange={handleChange}
            value={formData.name}
            required
            className={`block w-full py-3 px-1 text-gray-800 border-b-2 ${
              fieldErrors.name ? "border-red-500" : "border-gray-100"
            } focus:outline-none focus:border-gray-200`}
          />
          {fieldErrors.name && (
            <p className="text-red-500 text-sm">{fieldErrors.name}</p>
          )}

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={formData.description}
            required
            className="block w-full py-3 px-1 text-gray-800 border-b-2 border-gray-100 focus:outline-none focus:border-gray-200"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full py-3 px-1 text-gray-800 border-b-2 border-gray-100 focus:outline-none focus:border-gray-200"
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            value={formData.phoneNumber}
            className={`block w-full py-3 px-1 text-gray-800 border-b-2 ${
              fieldErrors.phoneNumber ? "border-red-500" : "border-gray-100"
            } focus:outline-none focus:border-gray-200`}
          />
          {fieldErrors.phoneNumber && (
            <p className="text-red-500 text-sm">{fieldErrors.phoneNumber}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-6 bg-gray-800 text-white rounded-sm font-medium uppercase hover:bg-gray-700 focus:outline-none"
          >
            {loading ? "Adding..." : "Add Lost Item"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLostItem;
