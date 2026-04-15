import React, { useState, FC, Children } from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

interface TabProps {
  label?: React.ReactNode;
  disabled?: boolean;
  sx?: any;
}

interface TabsPanelProps {
  orientation?: "horizontal" | "vertical";
  textColor?: "inherit" | "primary" | "secondary";
  indicatorColor?: "primary" | "secondary";
  tabIndex?: number;
  onTabChange?: (index: number) => void;
  labels?: React.ReactNode[];
  tabProps?: (TabProps | null)[];
  variant?: "scrollable" | "standard" | "fullWidth";
  scrollButtons?: boolean | "auto";
  allowScrollButtonsMobile?: boolean;
  children: React.ReactNode;
  className?: string;
  errors?: Record<number, boolean>;
  panelSx?: any; // Optional global panel styling
}

const CustomTabs: FC<TabsPanelProps> = ({
  orientation = "horizontal",
  textColor = "primary",
  indicatorColor = "primary",
  tabIndex = 0,
  onTabChange,
  labels,
  tabProps,
  variant = "scrollable",
  scrollButtons = "auto",
  allowScrollButtonsMobile = true,
  children,
  className,
  errors,
  panelSx,
}) => {
  const childrenArray = Children.toArray(children);
  const [value, setValue] = useState<number>(tabIndex);

  /**
   * Handles tab changes by:
   * 1. Converting the string value from MUI TabList to a number
   * 2. Updating the internal state to control which tab is selected
   * 3. Notifying parent components through the onTabChange callback
   */
  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    const numericValue = Number(newValue);
    setValue(numericValue);
    onTabChange?.(numericValue);
  };

  return (
    <Box
      sx={{
        typography: "body1",
        display: orientation === "vertical" ? "flex" : undefined,
      }}
      className={className}
    >
      <TabContext value={String(value)}>
        <Box
          sx={{
            borderBottom: orientation === "horizontal" ? 1 : 0,
            borderRight: orientation === "vertical" ? 1 : 0,
            borderColor: "divider",
          }}
        >
          <TabList
            onChange={handleTabChange}
            orientation={orientation}
            textColor={textColor}
            indicatorColor={indicatorColor}
            variant={variant}
            scrollButtons={scrollButtons}
            allowScrollButtonsMobile={allowScrollButtonsMobile}
            aria-label="tabs"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                borderTop: "2px solid",
                borderLeft: "2px solid",
                borderRight: "2px solid",
                borderColor: "primary.main",
                borderRadius: "8px 8px 0 0",
                marginRight: 1,
              },
              "& .MuiTab-root.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderRadius: "8px 8px 0 0",
              },
            }}
          >
            {childrenArray.map((_, index) => {
              const tabPropsItem = tabProps?.[index];
              return (
                <Tab
                  key={index}
                  label={
                    <Box
                      sx={{ color: errors?.[index] ? "error.main" : undefined }}
                    >
                      {labels?.[index]}
                    </Box>
                  }
                  value={String(index)}
                  disabled={tabPropsItem?.disabled}
                  sx={{
                    "& .MuiTab-root": {
                      textTransform: "none",
                    },
                    ...tabPropsItem?.sx,
                  }}
                />
              );
            })}
          </TabList>
        </Box>
        <Box sx={{ width: "100%", minHeight: "300px" }}>
          {childrenArray.map((child, index) => (
            <TabPanel
              key={index}
              value={String(index)}
              sx={{ p: 0, ...panelSx }}
            >
              {child}
            </TabPanel>
          ))}
        </Box>
      </TabContext>
    </Box>
  );
};

export default CustomTabs;
