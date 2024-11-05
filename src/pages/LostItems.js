import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LostItems = () => {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const defaultImage =
    "https://imgs.search.brave.com/Tn5pKlMOw0_FerWffTprFCqRcdROmyyfH62WlFnrX-A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9h/L2FjL05vX2ltYWdl/X2F2YWlsYWJsZS5z/dmc";

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await axios.get(
          "https://kerko-gjej-production.up.railway.app/api/lost-items/lost-items"
        );
        setLostItems(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLostItems();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="loader mb-4"></div>
        <p className="text-lg text-gray-600">Loading lost items...</p>
        <style jsx>{`
          .loader {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto pt-20 px-4 py-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Lost Items
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lostItems.map((item) => (
          <Link
            to={`/lost-item/${item._id}`}
            key={item._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 mb-4" // Added mb-4 for spacing between cards
          >
            <img
              src={item.image ? item.image : defaultImage}
              alt={item.name || "Lost item"}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600 mb-2">
                {item.description.length > 20
                  ? `${item.description.slice(0, 20)}...`
                  : item.description}
              </p>
              <p className="text-sm text-gray-500">
                Posted on: {new Date(item.datePosted).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Contact: {item.phoneNumber}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LostItems;
