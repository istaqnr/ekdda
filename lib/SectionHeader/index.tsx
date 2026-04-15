"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";

export const SectionHeader = ({
   pageTitle,
}: Readonly<{
   pageTitle: string;
}>) => {
   const ref = useRef<HTMLDivElement>(null);
   const isInView = useInView(ref, { once: true, amount: 0.01 });

   return (
      <div
         ref={ref}
         className={`text-primary md:text-3xl text-2xl font-semibold p-5 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
         } duration-1000 `}
      >
         {pageTitle}
      </div>
   );
};
