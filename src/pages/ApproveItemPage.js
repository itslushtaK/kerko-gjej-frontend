// ApproveItemPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemApproved from "./ItemApproved"; // Import your existing ItemApproved component

const ApproveItemPage = ({ match }) => {
  const { id } = match.params; // Get the item ID from the URL
  const [approved, setApproved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const approveItem = async () => {
      try {
        const response = await axios.get(`/api/lostItems/approve/${id}`);
        if (response.status === 200) {
          setApproved(true); // Set approved to true
        }
      } catch (error) {
        setError("Failed to approve item: " + error.response.data.error);
      }
    };

    approveItem();
  }, [id]);

  // If approved, show the ItemApproved component
  if (approved) {
    return <ItemApproved />;
  }

  // Optionally, show a loading state or an error message
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h2 className="text-xl font-bold">Approving Item...</h2>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ApproveItemPage;
