import React, { useState } from "react";
import { registerUser } from "../services/api";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    // Validate username
    if (username.trim() === "") {
      setMessage("Username is required.");
      setIsSuccess(false);
      setUsernameError(true);
      return;
    } else {
      setUsernameError(false);
    }

    // Validate email
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      setIsSuccess(false);
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    // Validate password requirements
    if (!validatePassword(password)) {
      setMessage(
        "Password must be at least 8 characters long, contain at least one uppercase letter and one number."
      );
      setIsSuccess(false);
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsSuccess(false);
      setConfirmPasswordError(true);
      return;
    } else {
      setConfirmPasswordError(false);
    }

    try {
      await registerUser(formData);
      setMessage(
        "Registration successful! Check your email to confirm your account"
      );
      setIsSuccess(true);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Error occurred.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 bg-white rounded-lg shadow-md lg:shadow-lg">
        <h1 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
          Register
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
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Username"
            required
            className={`block w-full py-3 px-1 text-gray-800 border-b-2 ${
              usernameError ? "border-red-500" : "border-gray-100"
            } focus:outline-none focus:border-gray-200`}
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
            className={`block w-full py-3 px-1 text-gray-800 border-b-2 ${
              emailError ? "border-red-500" : "border-gray-100"
            } focus:outline-none focus:border-gray-200`}
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
            className={`block w-full py-3 px-1 text-gray-800 border-b-2 ${
              passwordError ? "border-red-500" : "border-gray-100"
            } focus:outline-none focus:border-gray-200`}
          />
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className={`block w-full py-3 px-1 text-gray-800 border-b-2 ${
              confirmPasswordError ? "border-red-500" : "border-gray-100"
            } focus:outline-none focus:border-gray-200`}
          />
          <button
            type="submit"
            className="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700"
          >
            Register
          </button>
        </form>
        <p className="mt-8 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
