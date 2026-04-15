import React from "react";

export const JobIcon = (props: React.SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
   >
      <path d="M12 2a6 6 0 0 1 6 6c0 4.5-6 12-6 12S6 12.5 6 8a6 6 0 0 1 6-6z" />
      <circle cx="12" cy="8" r="2.5" />
   </svg>
);
