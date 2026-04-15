import React from "react";

export const IconContainerToolbar = ({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) => (
   <div
      className=" text-white rounded-fullborder-white items-center justify-center flex group cursor-pointer group-hover:drop-shadow-white relative"
      style={{ width: 35, height: 55 }}
   >
      {children}
   </div>
);
