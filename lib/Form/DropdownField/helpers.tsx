import React from "react";
import { set, get } from "lodash";
import Box from "@mui/material/Box";
// import MuiIcon from '@/qnrLib/components/Icon';
// import InputAdornment from '@mui/material/InputAdornment';

// TODO: make in future depthLevel, Icon, ml, dscrTxt: customizable
const DropdownDepthItemUI = ({ option }: any): any => {
   const depthLevel = get(option, "depthLevel", 0);
   return (
      <Box component="li" key={option} sx={{ ml: 0 }}>
         <>
            {Array.from(Array(depthLevel).keys()).map((index) => {
               // return <MuiIcon iconName="Remove" key={index} />;
            })}
            <span className="text-xs ml-4">{get(option, "dscrTxt", "")}</span>
         </>
      </Box>
   );
};

// TODO: make in future depthLevel, Icon, ml, dscrTxt: customizable
const dropdownDepthItemLabel = (option: any): any => {
   const depthLevel = get(option, "depthLevel", 0);
   const dashes = Array.from(Array(depthLevel).keys())
      .map(() => "-")
      .join("");
   const dashesPad = dashes?.length ? `${dashes} ` : dashes;

   const label = get(option, "dscrTxt", "");
   return `${dashesPad}${label}`;
};

function findRootItemIds(items: any[], parentNameAttr = "parentId") {
   const ids = [];
   for (const item of items) {
      const itemId = get(item, "id");
      const hasParent = items.some(
         (it) => get(item, parentNameAttr) === get(it, "id") && itemId !== get(it, "id")
      );
      if (!hasParent) {
         ids.push(itemId);
      }
   }
   return ids;
}

function setItemDepths(
   data: any[],
   parentIds: number[] | null = null,
   parentNameAttr = "parentId",
   idNameAttr = "id",
   depthLevelNameAttr = "depthLevel"
): any[] {
   // Function to recursively assign the levelDepth to each item
   function buildLevel(item: any, depth: number): void {
      set(item, depthLevelNameAttr, depth);
      const children = data.filter((child) => get(child, parentNameAttr) === get(item, idNameAttr));
      children.forEach((child) => buildLevel(child, depth + 1));
   }

   const topLevelItems = data.filter((item) => parentIds?.includes(get(item, idNameAttr)));
   topLevelItems.forEach((item) => buildLevel(item, 0));

   return data;
}

export { DropdownDepthItemUI, dropdownDepthItemLabel, findRootItemIds, setItemDepths };
