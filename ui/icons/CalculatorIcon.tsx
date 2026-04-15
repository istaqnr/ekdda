import React from "react";

export const CalculatorIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <rect x="8" y="6" width="8" height="4" />
      <path d="M8 12h0M12 12h0M16 12h0M8 16h0M12 16h0M16 16h0M8 20h0M12 20h0M16 20h0" />
   </svg>
);
