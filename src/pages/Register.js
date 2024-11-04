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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (!validatePassword(password)) {
      setMessage(
        "Password must be at least 8 characters long, contain at least one uppercase letter and one number."
      );
      setIsSuccess(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsSuccess(false);
      return;
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
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 py-10 md:py-20">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mx-4 md:mx-0">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
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
