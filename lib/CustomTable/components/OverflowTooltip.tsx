"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { Tooltip } from "@mui/material";

export const isTextPrimitive = (content: unknown) =>
  content === null ||
  content === undefined ||
  typeof content === "string" ||
  typeof content === "number" ||
  typeof content === "bigint";

type OverflowTooltipProps = {
  title: string;
  children: React.ReactNode;
  spanClassName?: string;
};

const OverflowTooltip = ({
  title,
  children,
  spanClassName,
}: OverflowTooltipProps) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkOverflow = () => {
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);
    return () => observer.disconnect();
  }, [title, children]);

  const showTooltip = title.length > 0 && isOverflowing;

  return (
    <Tooltip title={title} disableHoverListener={!showTooltip}>
      <span
        ref={ref}
        className={spanClassName}
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          display: "block",
          minWidth: 0,
        }}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default OverflowTooltip;
