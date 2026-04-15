import React from "react";
import Image from "next/image";

type MainLoaderProps = {
  size?: number;
};

const MainLoader: React.FC<MainLoaderProps> = ({ size = 200 }) => {
  return (
    <div className="grow flex flex-col w-full h-full items-center justify-center">
      {/* OSE Logo with subtle pulse */}
      <div
        className="relative"
        style={{
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      >
        <Image
          src="/el/OSE-Logo.svg"
          alt="OSE Logo"
          width={size}
          height={(size * 207) / 330} // Maintain aspect ratio (330:207)
          className="transition-opacity duration-700 ease-in-out"
          unoptimized
        />
      </div>
    </div>
  );
};

export default MainLoader;
