export const getCurrentApp = () => {
   if (typeof window !== "undefined") {
      const fullPath = window.location.pathname;
      if (fullPath.includes("/mitroo")) return "mitroo";
      if (fullPath.includes("/aitisi")) return "aitisi";
      if (fullPath.includes("/enstasi")) return "enstasi";
      if (fullPath.includes("/apotelesmata")) return "apotelesmata";
   }
   return "global"; // default to global app
};

// Extract the app name from target href
export const getTargetApp = ({ href }: { href: string }) => {
   if (href?.includes("/mitroo")) return "mitroo";
   if (href?.includes("/aitisi")) return "aitisi";
   if (href?.includes("/enstasi")) return "enstasi";
   if (href?.includes("/apotelesmata")) return "apotelesmata";
   return "global";
};
