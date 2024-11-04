<nav className="bg-gray-800 p-4 z-50">
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
</nav>
