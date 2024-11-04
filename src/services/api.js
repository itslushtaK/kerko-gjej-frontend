// src/services/api.js
import axios from "axios";

const API_URL = "https://kerko-gjej-production.up.railway.app/"; // Update with your API base URL

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (formData) => {
  const response = await axios.post(`${API_URL}/login`, formData);
  return response.data;
};

// Add more functions for your other endpoints
