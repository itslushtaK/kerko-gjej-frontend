import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faViber, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const LostItemDetail = () => {
  const { id } = useParams();
  const [lostItem, setLostItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultImage =
    "https://imgs.search.brave.com/Tn5pKlMOw0_FerWffTprFCqRcdROmyyfH62WlFnrX-A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9h/L2FjL05vX2ltYWdl/X2F2YWlsYWJsZS5z/dmc";

  useEffect(() => {
    const fetchLostItem = async () => {
      try {
        const response = await axios.get(
          `https://kerko-gjej-production.up.railway.app/api/lost-items/lost-items/${id}`
        );
        setLostItem(response.data);
      } catch (err) {
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
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* Changed to flex and min-h-screen */}
      <div className="max-w-2xl mx-auto py-8 px-4 flex-grow">
        {" "}
        {/* Added flex-grow */}
        <Link
          to="/lost-items"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 inline-block mb-6 shadow-lg"
        >
          Back to All Lost Items
        </Link>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={lostItem.image || defaultImage}
            alt={lostItem.name}
            className="w-full h-72 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {lostItem.name}
            </h2>
            <p className="text-gray-600 mb-4">{lostItem.description}</p>
            <p className="text-gray-500 mb-4">
              <strong>Posted on:</strong>{" "}
              {new Date(lostItem.datePosted).toLocaleDateString()}
            </p>
            {lostItem.phoneNumber && (
              <div className="text-gray-600 flex items-center gap-4">
                <span className="font-semibold text-gray-700">Contact:</span>
                <a
                  href={`viber://add?number=${lostItem.phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:text-purple-600"
                  aria-label="Contact via Viber"
                >
                  <FontAwesomeIcon icon={faViber} className="text-2xl" />
                </a>
                <a
                  href={`https://wa.me/${lostItem.phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-600"
                  aria-label="Contact via WhatsApp"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
                </a>
                <a
                  href={`tel:${lostItem.phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                  aria-label="Contact via Phone"
                >
                  <FontAwesomeIcon icon={faPhone} className="text-2xl" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LostItemDetail;
