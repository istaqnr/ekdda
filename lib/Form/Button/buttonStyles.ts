export type ButtonVariant = "primary" | "secondary" | "outlined" | "contained" | "none";

export type ButtonSize = "small" | "medium" | "large";

export const baseClasses =
   "items-center justify-center rounded-md font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export const sizeMap: Record<ButtonSize, string> = {
   small: "text-sm min-h-8",
   medium: "text-sm min-h-10",
   large: "text-base min-h-12",
};

export const iconSizeMap: Record<ButtonSize, string> = {
   small: "h-8 w-8 text-sm p-1",
   medium: "h-10 w-10 text-base p-2",
   large: "h-12 w-12 text-lg p-2.5",
};

export const variantMap: Record<ButtonVariant, string> = {
   primary:
      "bg-primary text-white hover:bg-primary/90 active:bg-blue-900 focus-visible:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed",
   secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed",
   outlined:
      "border border-gray-400 text-gray-800 bg-transparent hover:bg-gray-100  active:bg-gray-200 focus-visible:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed",
   contained:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed",
   none: "bg-transparent text-gray-800 hover:bg-primary/10 active:bg-primary/20 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed",
};

// Color system for when color prop is used with variant
export const colorMap: Record<string, { base: string; hover: string; active: string; ring: string }> = {
   primary: {
      base: "bg-blue-600 text-white border-blue-600",
      hover: "hover:bg-blue-700 hover:border-blue-700",
      active: "active:bg-blue-800",
      ring: "focus-visible:ring-blue-600",
   },
   secondary: {
      base: "bg-gray-600 text-white border-gray-600",
      hover: "hover:bg-gray-700 hover:border-gray-700",
      active: "active:bg-gray-800",
      ring: "focus-visible:ring-gray-600",
   },
   error: {
      base: "bg-red-600 text-white border-red-600",
      hover: "hover:bg-red-700 hover:border-red-700",
      active: "active:bg-red-800",
      ring: "focus-visible:ring-red-600",
   },
   warning: {
      base: "bg-orange-600 text-white border-orange-600",
      hover: "hover:bg-orange-700 hover:border-orange-700",
      active: "active:bg-orange-800",
      ring: "focus-visible:ring-orange-600",
   },
   info: {
      base: "bg-cyan-600 text-white border-cyan-600",
      hover: "hover:bg-cyan-700 hover:border-cyan-700",
      active: "active:bg-cyan-800",
      ring: "focus-visible:ring-cyan-600",
   },
   success: {
      base: "bg-green-600 text-white border-green-600",
      hover: "hover:bg-green-700 hover:border-green-700",
      active: "active:bg-green-800",
      ring: "focus-visible:ring-green-600",
   },
   inherit: {
      base: "bg-inherit text-inherit border-inherit",
      hover: "",
      active: "",
      ring: "focus-visible:ring-gray-400",
   },
   default: {
      base: "bg-gray-100 text-gray-900 border-gray-300",
      hover: "hover:bg-gray-200 hover:border-gray-400",
      active: "active:bg-gray-300",
      ring: "focus-visible:ring-gray-400",
   },
};

// export const colorMap: Record<string, string> = {
//    primary: "text-blue-600 hover:bg-blue-50",
//    secondary: "text-gray-600 hover:bg-gray-50",
//    error: "text-red-600 hover:bg-red-50",
//    warning: "text-orange-600 hover:bg-orange-50",
//    info: "text-cyan-600 hover:bg-cyan-50",
//    success: "text-green-600 hover:bg-green-50",
//    inherit: "text-inherit",
// };
