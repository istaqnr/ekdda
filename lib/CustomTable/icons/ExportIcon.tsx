import React from "react";

interface ExportIconProps {
   className?: string;
   size?: number;
}

export const ExportIcon: React.FC<ExportIconProps> = ({ className = "", size = 24 }) => (
   <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
   >
      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
      <path d="M12,11L8,15H11V19H13V15H16L12,11Z" />
   </svg>
);

export default ExportIcon;
