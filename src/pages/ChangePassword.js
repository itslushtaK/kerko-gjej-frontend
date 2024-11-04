import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      await axios.put(
        "http://localhost:5000/api/auth/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowModal(true); // Show modal on success
    } catch (error) {
      setError("Old password is not correct, please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token to log out
    window.location.href = "/login"; // Redirect to login page
  };

  const handleStayLoggedIn = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg my-8">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Change Password
      </h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Current Password
          </label>
          <input
            type="password"
            className="border rounded px-3 py-2 w-full"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            New Password
          </label>
          <input
            type="password"
            className="border rounded px-3 py-2 w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            className="border rounded px-3 py-2 w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition duration-200"
        >
          Update Password
        </button>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md max-w-xs w-full">
            <h3 className="text-lg font-semibold mb-4">Password Updated</h3>
            <p className="mb-4">Your password has been successfully changed.</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
              <button
                onClick={handleStayLoggedIn}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
              >
                Stay Logged In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
