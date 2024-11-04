import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      setMessage("Login successful! Redirecting...");
      setIsSuccess(true);
      onLogin();

      setTimeout(() => {
        setIsLoading(false); // Stop loading
        navigate("/"); // Redirect after delay
      }, 1500);
    } catch (error) {
      setMessage("Invalid email or password.");
      setIsSuccess(false);
      setIsLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 bg-white rounded-lg shadow-md lg:shadow-lg">
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
        <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
          Login
        </h2>

        <form className="mt-10" onSubmit={handleLogin}>
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-gray-600 uppercase"
          >
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            placeholder="e-mail address"
            className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
            required
          />

          <label
            htmlFor="password"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            placeholder="password"
            className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
            required
          />

          <button
            type="submit"
            className="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
            <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
              or
            </p>
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
