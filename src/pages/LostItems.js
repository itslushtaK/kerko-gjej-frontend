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

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto pt-20 py-4">
      {" "}
      {/* Added 'pt-20' for padding-top */}
      <h2 className="text-2xl font-bold mb-4">Lost Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lostItems.map((item) => (
          <Link
            to={`/lost-item/${item._id}`}
            key={item._id}
            className="bg-white rounded-lg shadow p-4 transition-transform transform hover:scale-105"
          >
            <img
              src={item.image || defaultImage}
              alt={item.name}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <p className="text-gray-700">{item.description}</p>
            <p className="text-gray-500">
              Posted on: {new Date(item.datePosted).toLocaleDateString()}
            </p>
            <p className="text-gray-600">Contact: {item.phoneNumber}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LostItems;
