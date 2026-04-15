import React from "react";

const PaginationButton = ({ id, onClick, currentPage, icon, disabled }: any) => (
   <button
      id={id}
      aria-label={id}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
         disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
      }`}
   >
      {icon}
   </button>
);

export default PaginationButton;
