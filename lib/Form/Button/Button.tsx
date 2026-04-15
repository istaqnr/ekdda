import React from "react";
import { CircularProgress } from "@mui/material";
import { ButtonVariant, ButtonSize, baseClasses, sizeMap, variantMap } from "./buttonStyles";

interface IButton {
   type?: "button" | "submit" | "reset";
   onClick?(args: any): any;
   size?: ButtonSize;
   variant?: ButtonVariant;
   className?: string;
   startIcon?: React.ReactNode;
   endIcon?: React.ReactNode;
   title?: string;
   disabled?: boolean;
   loading?: boolean;
   fullWidth?: boolean;
   iconOnly?: boolean;
   href?: string;
   target?: string;
   showTooltip?: boolean;
   children: React.ReactNode;
   spanClassName?: string;
}

const Button: React.FC<IButton> = ({
   type = "button",
   onClick,
   size = "medium",
   variant,
   className,
   startIcon,
   endIcon,
   title,
   showTooltip = true,
   disabled = false,
   loading = false,
   fullWidth = false,
   iconOnly = false,
   href,
   target,
   children,
   spanClassName,
}) => {
   const classes = [
      baseClasses,
      sizeMap[size],
      loading ? "cursor-wait" : "",
      fullWidth ? "w-full" : "",
      iconOnly ? "p-0 h-10 w-10 justify-center" : "",
      className || (variant && variantMap[variant]),
   ]
      .filter(Boolean)
      .join(" ");

   const content = (
      <button
         type="button"
         onClick={onClick}
         disabled={disabled || loading}
         aria-label={title}
         className={classes}
      >
         {loading && <CircularProgress size={20} className="ml-2" />}
         {!loading && startIcon}
         {!iconOnly && <span>{children}</span>}
         {!loading && endIcon}
      </button>
   );

   if (showTooltip && title) {
      return (
         <span className={spanClassName || ""} title={title}>
            {content}
         </span>
      );
   }

   return content;
};

export default Button;
