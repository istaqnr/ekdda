import React from "react";

interface ViewColumnIconProps {
   className?: string;
   size?: number;
}

export const ViewColumnIcon: React.FC<ViewColumnIconProps> = ({ className = "", size = 24 }) => (
   <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
   >
      <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 7h2v10H7V7zm4 0h2v10h-2V7zm4 0h2v10h-2V7z" />
   </svg>
);

export default ViewColumnIcon;
