// src/pages/Logout.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout(); // Call the logout function passed as a prop
    navigate("/"); // Redirect to home or any other desired page
  }, [onLogout, navigate]);

  return null; // Optionally return null since this component doesn't need to render anything
};

export default Logout;
