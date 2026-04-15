import { TooltipProps, Zoom } from "@mui/material";
import { ReactNode } from "react";
import { HtmlTooltip } from "./HtmlTooltip ";

const ConditionalHtmlTooltipWrapper = ({
   tooltip,
   children,
   placement,
}: {
   tooltip?: ReactNode | string;
   children: any;
   placement?: TooltipProps["placement"];
}) =>
   tooltip ? (
      <HtmlTooltip slots={{ transition: Zoom }} placement={placement} title={tooltip}>
         {children}
      </HtmlTooltip>
   ) : (
      children
   );

export default ConditionalHtmlTooltipWrapper;
