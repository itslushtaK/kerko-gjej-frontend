// ItemApproved.js
import React from "react";
import { Link } from "react-router-dom";

const ItemApproved = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 bg-white rounded-lg shadow-md lg:shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Item Approved!</h2>
        <p className="text-lg text-center mb-6">
          Your item has been approved successfully.
        </p>
        <Link to="/lost-items">
          <button className="w-full py-3 bg-gray-800 text-white rounded-sm font-medium uppercase hover:bg-gray-700 focus:outline-none">
            Go to Lost Items
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ItemApproved;
