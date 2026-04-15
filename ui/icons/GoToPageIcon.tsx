import React from "react";

interface GoToPageProps {
   className?: string;
   strokeColor?: string;
}

const GoToPageIcon = ({ className = "", strokeColor }: GoToPageProps) => {
   return (
      <svg width="24" height="24" viewBox="0 0 24 24" className={`stroke-current ${className}`}>
         <path
            d="M7 17L17 7M17 7H7M17 7V17"
            stroke={strokeColor || "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>
   );
};

export default GoToPageIcon;
