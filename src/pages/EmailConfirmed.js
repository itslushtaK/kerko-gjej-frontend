import React from "react";

const EmailConfirmed = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-2xl font-bold text-green-600">Email Confirmed!</h1>
        <p className="mt-4 text-gray-700">
          Thank you for confirming your email. You can now log in to your
          account.
        </p>
        <a
          href="/login"
          className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
};

export default EmailConfirmed;
