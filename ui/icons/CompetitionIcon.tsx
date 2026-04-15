import React from "react";

export const CompetitionIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      <circle cx="12" cy="8" r="5" />
      <path d="M9 14v7l3-2 3 2v-7" />
   </svg>
);
