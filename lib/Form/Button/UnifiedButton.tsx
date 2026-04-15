import React from "react";
import { CircularProgress, Tooltip } from "@mui/material";
import { ButtonVariant, ButtonSize, baseClasses, sizeMap, variantMap } from "./buttonStyles";

interface IUnifiedButton {
   // Core button props
   type?: "button" | "submit" | "reset";
   onClick?(args: any): any;
   disabled?: boolean;
   children?: React.ReactNode;
   className?: string;
   title?: string;
   ariaLabel?: string;
   // Size and variant props
   size?: ButtonSize | "small" | "medium" | "large";
   variant?: ButtonVariant;
   color?: "default" | "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";

   // Icon props
   icon?: React.ReactNode; // For icon-only buttons
   onlyIcon?: boolean; // Whether this is an icon-only button
   reverse?: boolean;

   // State props
   loading?: boolean;
   visible?: boolean;

   // Layout props
   fullWidth?: boolean;
   spanClassName?: string;

   // Tooltip props
   showTooltip?: boolean;
   tooltipTitle?: string;

   // Responsive behavior (from ButtonIcon)
   responsive?: boolean; // Shows icon on desktop, button with text on mobile

   // Link props
   href?: string;
   target?: string;

   // Event handlers
   onFocus?: React.FocusEventHandler<HTMLButtonElement>;
   onBlur?: React.FocusEventHandler<HTMLButtonElement>;
   onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
   onKeyUp?: React.KeyboardEventHandler<HTMLButtonElement>;
   onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
   onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
   onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
   onMouseUp?: React.MouseEventHandler<HTMLButtonElement>;

   // MUI-specific props
   sx?: any;

   // Testing props
   "data-testid"?: string;
   "data-testid-suffix"?: string;

   // Additional props
   [key: string]: any;
}

const UnifiedButton = React.forwardRef<HTMLButtonElement, IUnifiedButton>(
   (
      {
         // Core props
         type = "button",
         onClick,
         disabled = false,
         children,
         className,
         spanClassName,
         title,
         ariaLabel,
         // Size and variant
         size,
         variant,
         color,

         // icon
         icon,
         reverse = false,

         // State
         loading = false,
         visible = true,

         // Layout
         fullWidth = false,

         // Tooltip
         showTooltip = false,
         tooltipTitle,
         onlyIcon = false,
         // Responsive
         responsive = false,

         // Link
         href,
         target,

         // Event handlers
         onFocus,
         onBlur,
         onKeyDown,
         onKeyUp,
         onMouseEnter,
         onMouseLeave,
         onMouseDown,
         onMouseUp,

         // MUI
         sx,

         // Testing
         "data-testid": dataTestId,
         "data-testid-suffix": dataTestIdSuffix,

         // Additional props
         ...buttonProps
      },
      ref
   ) => {
      // Don't render if not visible
      if (!visible) return null;

      /**
       * Render standard HTML button with full icon support
       */
      const renderButton = ({ isMobile = false }: { isMobile?: boolean }) => {
         const sizeClass: ButtonSize = (isMobile ? "small" : size || "medium") as ButtonSize;
         const variantClass = variant ?? (isMobile && "secondary");

         const buttonClassName = [
            baseClasses,
            loading ? "cursor-wait" : "",
            sizeMap[sizeClass],
            fullWidth ? "w-full" : "",
            // !variant && color && colorMap[color],
            variantClass && variantMap[variantClass as ButtonVariant],
            className,
         ]
            .filter(Boolean)
            .join(" ");

         return (
            <button
               // eslint-disable-next-line react/button-has-type
               type={type}
               ref={ref}
               onClick={onClick}
               disabled={disabled || loading}
               aria-label={ariaLabel || title || "Icon button"}
               aria-busy={loading}
               aria-disabled={disabled || loading}
               className={buttonClassName}
               data-testid={dataTestId}
               onFocus={onFocus}
               onBlur={onBlur}
               onKeyDown={onKeyDown}
               onKeyUp={onKeyUp}
               onMouseEnter={onMouseEnter}
               onMouseLeave={onMouseLeave}
               onMouseDown={onMouseDown}
               onMouseUp={onMouseUp}
               style={{
                  ...(disabled && { cursor: "not-allowed", opacity: 0.4, pointerEvents: "initial" as const }),
                  ...(typeof sx === "object" ? sx : {}),
               }}
               {...buttonProps}
            >
               {loading ? (
                  <CircularProgress size={{ small: 18, medium: 20, large: 22 }[sizeClass] || 20} />
               ) : (
                  <div
                     className={`flex items-center justify-center gap-1
                     ${reverse ? "flex-row-reverse gap-1" : ""}
                     ${isMobile && (title || tooltipTitle) ? "px-2 py-1" : ""}
                     ${onlyIcon ? "p-1" : "px-2 py-1"} `}
                  >
                     {icon && icon}
                     {isMobile && !onlyIcon && (title || tooltipTitle)}
                     {!isMobile && title}
                     {children}
                  </div>
               )}
            </button>
         );
      };

      return (
         <>
            {/* Desktop: Icon Button with Tooltip */}
            <div className="hidden md:block">
               {showTooltip ? (
                  <Tooltip title={tooltipTitle || title} style={disabled ? { cursor: "not-allowed" } : {}}>
                     <span>{renderButton({})}</span>
                  </Tooltip>
               ) : (
                  renderButton({})
               )}
            </div>

            {/* Mobile: Full Button */}
            <div className="block md:hidden">{renderButton({ isMobile: true })}</div>
         </>
      );
   }
);

UnifiedButton.displayName = "UnifiedButton";

export default UnifiedButton;
