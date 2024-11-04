import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );
      setMessage(response.data.msg);
      setShowModal(true); // Show success modal
    } catch (error) {
      setError(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mx-4 md:mx-0">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md text-center">
            {error}
          </div>
        )}
        {message && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md text-center">
            {message}
          </div>
        )}
        <form onSubmit={handleForgotPassword} className="space-y-4 mt-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
          <p className="mt-2 text-center">
            <Link to="/login" className="text-blue-500 hover:underline">
              Back to Login?
            </Link>
          </p>
        </form>
      </div>

      {/* Modal for Success Message */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full text-center">
            <div className="text-green-500 mb-4">
              {/* Animated Checkmark */}
              <svg
                className="w-12 h-12 animate-pulse mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <p className="text-lg font-semibold mb-2">Email Sent!</p>
            <p className="text-gray-600 mb-4">
              Please check your email for the password reset link.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
