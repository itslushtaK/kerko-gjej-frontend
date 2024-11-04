import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const response = await axios.get(
          "kerko-gjej-production.up.railway.app/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data);
      } catch (error) {
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg my-8">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Profile Details
      </h2>
      {profile ? (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-gray-700 font-semibold">Username:</p>
            <p className="text-lg">{profile.username}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-gray-700 font-semibold">Email:</p>
            <p className="text-lg">{profile.email}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No profile data available.</p>
      )}
    </div>
  );
};

export default ProfileView;
