import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center p-4 bg-gray-800 text-white">
      <p className="flex items-center space-x-1">
        <span>Made with</span>
        <FaHeart className="text-red-500" />
        <span>
          by{" "}
          <a
            href="https://gentuarlushtaku.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Gentuar Lushtaku
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
