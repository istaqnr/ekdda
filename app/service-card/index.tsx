"use client";

import GoToPageIcon from "@/ui/icons/GoToPageIcon";
import CrossAppLink from "@/lib/CrossAppLink";
import React from "react";

const ServiceCard = ({
  service: { href, title, description, icon, disabled },
}: {
  service: {
    href: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    disabled: boolean;
  };
}) => {
  const cardContent = (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-200 p-8 h-64 transition-all duration-300 ${
        disabled
          ? "cursor-not-allowed opacity-60"
          : "hover:scale-[1.02] hover:shadow-xl hover:border-primary"
      }`}
    >
      {/* Content */}
      <div className="relative flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <div
            className={`p-3 rounded-2xl ${
              disabled ? "text-gray-500 bg-gray-300" : "text-white bg-primary"
            }  transition-colors duration-300`}
          >
            {icon}
          </div>
          <div
            className={`transform transition-all duration-300 ${
              disabled
                ? ""
                : "group-hover:translate-x-1 group-hover:-translate-y-1"
            }`}
          >
            <GoToPageIcon
              className={`text-gray-300 transition-colors ${
                disabled ? "" : "group-hover:text-primary"
              }`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3
            className={`text-2xl font-bold text- transition-colors duration-300 ${
              disabled ? "" : "group-hover:text-gray-800"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-gray-600 transition-colors duration-300 text-sm leading-relaxed ${
              disabled ? "" : "group-hover:text-gray-800"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-xs min-w-xs mx-auto">
      <CrossAppLink href={href} disabled={disabled} hasApplication>
        {cardContent}
      </CrossAppLink>
    </div>
  );
};
export default ServiceCard;
