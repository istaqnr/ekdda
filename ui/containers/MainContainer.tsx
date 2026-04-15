"use client";

import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
  JSX,
} from "react";

import { useInView } from "framer-motion";
import MainContainerTitle from "./MainContainerTitle";

interface MainContainerProps {
  children: JSX.Element;
  title?: string;
  subtitle?: string;
  isCollapsible?: boolean;
  isSubContainer?: boolean;
  bgColor?: string;
  tooltip?: any;
  customSettings?: JSX.Element;
}

const MainContainer = ({
  children,
  title = "",
  subtitle = "",
  isSubContainer = false,
  isCollapsible = true,
  bgColor = "rgb(0, 52, 118, 0.1)",
  tooltip = null,
  customSettings,
}: MainContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(isCollapsible);
  const isInView = useInView(ref, { once: true, amount: 0.01 });

  const updateContentHeight = useCallback(() => {
    if (ref.current && isCollapsible) {
      setContentHeight(ref.current.scrollHeight);
    }
  }, [isCollapsible]);

  useLayoutEffect(() => {
    if (isCollapsible) updateContentHeight();
  }, [children, updateContentHeight, isCollapsible]);

  useEffect(() => {
    const observer = new ResizeObserver(updateContentHeight);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [updateContentHeight]);

  useEffect(() => {
    window.addEventListener("resize", updateContentHeight);
    return () => window.removeEventListener("resize", updateContentHeight);
  }, [updateContentHeight]);

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`${
        isSubContainer ? "p-0" : " p-6"
      } flex flex-col w-full duration-1000 transition-all  hover:drop-shadow-md rounded ${
        isInView ? "translate-x-0 opacity-100" : "translate-x-[10px] opacity-0"
      } `}
    >
      <MainContainerTitle
        title={title}
        subtitle={subtitle}
        onCollapse={
          isCollapsible ? () => setIsOpen((prev) => !prev) : undefined
        }
        isOpen={isOpen}
        isCollapsible={isCollapsible}
        isSubHeader={isSubContainer}
        tooltip={tooltip}
        customSettings={customSettings}
      />

      <div
        style={{
          maxHeight: isCollapsible
            ? isOpen
              ? contentHeight ?? "auto"
              : 0
            : "auto",
          transition: "max-height 0.3s ease-in-out",
        }}
        className="overflow-hidden"
      >
        <div
          ref={ref}
          className={`${title ? "pt-4" : ""} ${
            isSubContainer ? "p-4" : " p-0"
          } w-full`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
