import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Import user icon from react-icons
import logo from "../assets/images/logo.png"; // Import the logo image

const Navbar = ({ isLoggedIn }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation(); // Get current location

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getLinkClass = (path) => {
    const baseClasses =
      "block px-4 py-2 rounded transition-colors duration-200";
    const activeClasses = "bg-gray-600"; // Background for active link
    const hoverClasses = "hover:bg-gray-500";

    return `${baseClasses} ${
      location.pathname === path ? activeClasses : ""
    } ${hoverClasses}`;
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-lg">
          <img src={logo} alt="Logo" className="h-8" /> {/* Logo Image */}
        </Link>

        {/* Desktop and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-white flex items-center focus:outline-none"
                >
                  <FaUser className="text-xl" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 bg-gray-700 text-white mt-1 rounded shadow-lg">
                    <Link
                      to="/profile"
                      className={getLinkClass("/profile")}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/change-password"
                      className={getLinkClass("/change-password")}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Change Password
                    </Link>
                    <Link
                      to="/logout"
                      className={getLinkClass("/logout")}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-white md:inline-block ${getLinkClass(
                  "/login"
                )}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`text-white md:inline-block ${getLinkClass(
                  "/register"
                )}`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Uncomment if you want to use the mobile menu
      <div className="md:hidden flex flex-col items-center mt-4 space-y-2">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className={getLinkClass("/profile")}>
              Profile
            </Link>
            <Link to="/change-password" className={getLinkClass("/change-password")}>
              Change Password
            </Link>
            <Link to="/logout" className={getLinkClass("/logout")}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className={getLinkClass("/login")}>
              Login
            </Link>
            <Link to="/register" className={getLinkClass("/register")}>
              Register
            </Link>
          </>
        )}
      </div>
      */}
    </nav>
  );
};

export default Navbar;
