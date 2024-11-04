import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faEnvelopeOpenText, faFileUpload } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/lost-items");
  };

  const handleAddNewItem = () => {
    navigate("/add-lost-item");
  };

  return (
    <div className="relative overflow-hidden">
      {/* Navbar with higher z-index */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-300 via-white to-purple-300 animate-pulse-slow"></div>

      {/* Main Content */}
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white font-poppins p-6 relative z-10"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/random/1920x1080?lost-and-found')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 tracking-wide leading-tight md:text-6xl">
            Welcome to
            <br />
            <span className="blinking">Lost & Found</span>
          </h1>

          <p className="text-lg mb-10 md:text-xl">
            We help you find and recover lost items with ease. Browse items or
            add new ones to help others.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button
              onClick={handleViewAll}
              className="w-48 h-14 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
            >
              View All Lost Items
            </button>
            <button
              onClick={handleAddNewItem}
              className="w-48 h-14 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-full transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50"
            >
              Add New Item
            </button>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-4xl bg-white bg-opacity-90 rounded-lg p-6 md:p-12 shadow-xl backdrop-blur-md text-gray-800">
          <h2 className="text-3xl font-semibold text-center mb-8">
            How It Works?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4 shadow-md transform transition duration-300 group-hover:scale-110">
                <FontAwesomeIcon
                  icon={faUserPlus}
                  size="2x"
                  className="text-blue-600 group-hover:text-blue-800"
                />
              </div>
              <p className="font-medium text-lg">1. Register your account</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4 shadow-md transform transition duration-300 group-hover:scale-110">
                <FontAwesomeIcon
                  icon={faEnvelopeOpenText}
                  size="2x"
                  className="text-green-600 group-hover:text-green-800"
                />
              </div>
              <p className="font-medium text-lg">
                2. Confirm your account via email
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto flex items-center justify-center mb-4 shadow-md transform transition duration-300 group-hover:scale-110">
                <FontAwesomeIcon
                  icon={faFileUpload}
                  size="2x"
                  className="text-purple-600 group-hover:text-purple-800"
                />
              </div>
              <p className="font-medium text-lg">
                3. Add new lost items for approval
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
