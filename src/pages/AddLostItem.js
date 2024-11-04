import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLostItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); // Changed to string
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const phoneRegex = /^\+383\d{8,}$/; // Matches +383 followed by at least 8 digits
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      setError("Phone number must start with +383 and have at least 8 digits.");
      setLoading(false);
      return;
    }

    const itemData = {
      name,
      description,
      image,
      phoneNumber,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/lost-items/add",
        itemData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccessMessage(
        "Your post has been submitted for approval to the admin."
      );

      setTimeout(() => {
        navigate("/lost-items");
      }, 2000); // Delay before navigating (2 seconds)
    } catch (err) {
      setError(err.response?.data?.error || "Error adding lost item");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set image as Base64 string
      };
      reader.readAsDataURL(file);
    } else {
      setImage(""); // Reset image if no file is selected
    }
  };

  return (
    <div className="max-w-md mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Add Lost Item</h2>
      {error && (
        <div
          className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M18 8a8 8 0 11-16 0 8 8 0 0116 0zm-9 4h2v2H9v-2zm0-8h2v6H9V4z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      {successMessage && (
        <div
          className="flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9 12l2-2 5 5L9 4l-5 5z" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Item Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Upload Image(optional): </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white rounded py-2 px-4 ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Lost Item"}
        </button>
      </form>
    </div>
  );
};

export default AddLostItem;
