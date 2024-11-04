import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    setMessage("");
    setIsSuccess(false);

    // Validate current password
    if (currentPassword.trim() === "") {
      setMessage("Current password is required.");
      setCurrentPasswordError(true);
      return;
    } else {
      setCurrentPasswordError(false);
    }

    // Validate new password requirements
    if (!validatePassword(newPassword)) {
      setMessage(
        "Password must be at least 8 characters long, contain at least one uppercase letter and one number."
      );
      setNewPasswordError(true);
      return;
    } else {
      setNewPasswordError(false);
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      setConfirmPasswordError(true);
      return;
    } else {
      setConfirmPasswordError(false);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "https://kerko-gjej-production.up.railway.app/api/auth/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Password updated successfully!");
      setIsSuccess(true);
      setShowModal(true); // Show modal on success
    } catch (error) {
      setMessage("Old password is not correct, please try again.");
      setIsSuccess(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleStayLoggedIn = () => {
    setShowModal(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 bg-white rounded-lg shadow-md lg:shadow-lg">
        <h1 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
          Change Password
        </h1>
        {message && (
          <div
            className={`mt-5 mb-5 p-4 rounded-md text-center ${
              isSuccess
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <input
            type="password"
            name="currentPassword"
            onChange={handleChange}
            placeholder="Current Password"
            required
            className={`block w-full py-3 px-1 text-gray-800 border-b-2 ${
              currentPasswordError ? "border-red-500" : "border-gray-100"
            } focus:outline-none focus:border-gray-200`}
          />
          <input
            type="password"
            name="newPassword"
            onChange={handleChange}
            placeholder="New Password"
            required
            className={`block w-full py-3 px-1 text-gray-800 border-b-2 ${
              newPasswordError ? "border-red-500" : "border-gray-100"
            } focus:outline-none focus:border-gray-200`}
          />
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm New Password"
            required
            className={`block w-full py-3 px-1 text-gray-800 border-b-2 ${
              confirmPasswordError ? "border-red-500" : "border-gray-100"
            } focus:outline-none focus:border-gray-200`}
          />
          <button
            type="submit"
            className="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700"
          >
            Update Password
          </button>
        </form>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md max-w-xs w-full">
              <h3 className="text-lg font-semibold mb-4">Password Updated</h3>
              <p className="mb-4">
                Your password has been successfully changed.
              </p>
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
    </div>
  );
};

export default ChangePassword;
