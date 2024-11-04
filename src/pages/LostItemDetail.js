import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const LostItemDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [lostItem, setLostItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultImage =
    "https://imgs.search.brave.com/Tn5pKlMOw0_FerWffTprFCqRcdROmyyfH62WlFnrX-A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9h/L2FjL05vX2ltYWdl/X2F2YWlsYWJsZS5z/dmc"; // Default image URL

  useEffect(() => {
    const fetchLostItem = async () => {
      try {
        console.log("Fetching lost item with ID:", id);
        const response = await axios.get(
          `http://localhost:5000/api/lost-items/lost-items/${id}`
        );
        console.log("API response:", response.data);
        setLostItem(response.data);
      } catch (err) {
        console.error("Error fetching lost item:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLostItem();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!lostItem) return <div className="text-center">Lost item not found.</div>;

  return (
    <div className="max-w-2xl mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">{lostItem.name}</h2>
      <img
        src={lostItem.image || defaultImage} // Use default image if item image is not available
        alt={lostItem.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-700 mb-2">{lostItem.description}</p>
      <p className="text-gray-500 mb-2">
        Posted on: {new Date(lostItem.datePosted).toLocaleDateString()}
      </p>
      <p className="text-gray-600">Contact: {lostItem.phoneNumber}</p>
    </div>
  );
};

export default LostItemDetail;
