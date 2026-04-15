"use client";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ConditionalTooltipWrapper from "../../lib/ConditionalTooltipWrapper";

const MainContainerTitle = ({
   title,
   subtitle = null,
   onCollapse,
   isOpen,
   isSubHeader = false,
   tooltip = null,
   customSettings = null,
}: any) => {
   return (
      <div
         className={`relative flex flex-col items-start gap-[4px] text-primary  ${
            onCollapse ? "cursor-pointer" : ""
         } ${isSubHeader ? "text-lg  px-4 pt-4 shadow" : "text-xl md:text-xl"} justify-between`}
      >
         <div
            className={`relative flex ${
               isSubHeader ? "justify-between" : "justify-between"
            } items-center gap-4 w-full ${title && "pb-[12px]"}`}
         >
            <div className={`flex items-center gap-2 max-w-[calc(100%-30px)] ${isSubHeader && ""}`}>
               <ConditionalTooltipWrapper tooltip={tooltip}>{title}</ConditionalTooltipWrapper>
            </div>
            <div className="flex items-center gap-2">
               {customSettings && customSettings}
               {onCollapse && (
                  <button
                     type="button"
                     onClick={onCollapse || null}
                     style={{
                        width: 30,
                        height: 30,
                        minHeight: 30,
                        maxWidth: 30,
                     }}
                     className={`${
                        isSubHeader ? "bg-primary text-white" : "bg-white"
                     } rounded-full flex items-center justify-center overflow-hidden shadow hover:shadow-2xl group`}
                     aria-label={isOpen ? "Collapse" : "Expand"}
                  >
                     {isOpen ? (
                        <ExpandLessIcon
                           style={{ fontSize: 20 }}
                           className="!duration-500 !transition-all group-hover:scale-75"
                        />
                     ) : (
                        <ExpandMoreIcon
                           style={{ fontSize: 20 }}
                           className="!duration-500 !transition-all group-hover:scale-75"
                        />
                     )}
                  </button>
               )}
            </div>
            {title && (
               <div
                  style={{ height: isSubHeader ? 0 : 2, bottom: 2 }}
                  className="absolute bg-primary w-full"
               ></div>
            )}
         </div>

         <div className="text-sm italic text-gray-600">{subtitle}</div>
      </div>
   );
};

export default MainContainerTitle;
