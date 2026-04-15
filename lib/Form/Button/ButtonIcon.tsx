import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Button from ".";
// import { getButtonTestId, mergeProps } from '@/qnrLib/utils/helpers';
// import { TButtonTypes, TColors, TSizes } from '../../interfaces';
// import { buttonIconComponentProps } from '../../defaultProps';

interface IButtonIcon {
   type?: any | undefined;
   onClick?(args: any): any;
   color?: any;
   size?: any | undefined;
   className?: any;
   title?: string;
   showTooltip?: boolean;
   icon?: any;
   visible?: boolean;
   disabled?: boolean;
   children?: any;
   sx?: any;
   ["data-testid"]?: string;
   ["data-testid-suffix"]?: string;
   [buttonPropsIndexes: string]: any;
}

const ButtonIcon: React.FC<IButtonIcon> = ({
   type = "button",
   onClick,
   color,
   size,
   className,
   icon,
   title,
   showTooltip = true,
   disabled = false,
   visible = true,
   children,
   "data-testid": dataTestId,
   "data-testid-suffix": dataTestIdSuffix,
   sx,
   ...buttonProps
}) => {
   // const dataTestID = getButtonTestId({ dataTestId, dataTestIdSuffix, type });

   // const mergedPropsRoot = mergeProps(buttonIconComponentProps.root, {
   //   color,
   //   size,
   //   className,
   //   ...buttonProps,
   // });

   const IconButtonComponent = () => (
      <IconButton
         onClick={onClick}
         disabled={disabled}
         style={disabled ? { cursor: "not-allowed", pointerEvents: "initial" } : {}}
         size={size || "small"}
         color={color}
         className={className}
         disableRipple
         sx={sx}
         // sx={disabled ? { cursor: 'not-allowed', pointerEvents: 'initial' } : {}}
         // data-testid={dataTestID}
         aria-label={title}
         // {...mergedPropsRoot}
         {...buttonProps}
      >
         {children || icon}
      </IconButton>
   );

   // span is mandatory for tooltip
   return visible ? (
      showTooltip ? (
         <>
            <div className="hidden md:block">
               <Tooltip title={title} style={disabled ? { cursor: "not-allowed" } : {}}>
                  <span>
                     <IconButtonComponent />
                  </span>
               </Tooltip>
            </div>
            <div className="block md:hidden">
               <Button variant="primary" size="small" spanClassName="gap-2" onClick={onClick}>
                  {children}

                  {title}
               </Button>
            </div>
         </>
      ) : (
         <IconButtonComponent />
      )
   ) : null;
};

export default ButtonIcon;
