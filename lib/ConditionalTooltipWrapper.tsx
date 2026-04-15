import { Tooltip } from "@mui/material";
import { ReactNode } from "react";

const ConditionalTooltipWrapper = ({ tooltip, children }: { tooltip?: ReactNode | string; children: any }) =>
   tooltip ? (
      <div className="cursor-help">
         <Tooltip title={tooltip}>{children}</Tooltip>
      </div>
   ) : (
      children
   );

export default ConditionalTooltipWrapper;
