import React from "react";

interface FilterListIconProps {
   className?: string;
   size?: number;
}

export const FilterListIcon: React.FC<FilterListIconProps> = ({ className = "", size = 24 }) => (
   <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
   >
      <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
   </svg>
);

export default FilterListIcon;
