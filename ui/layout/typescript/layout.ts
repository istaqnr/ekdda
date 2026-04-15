import { ComponentType } from "react";

export interface MenuOptionInterface {
   id: string;
   type: "folder" | "link";
   label: string;
   children?: MenuOptionInterface[];
   href?: string;
   icon?: ComponentType<{ className?: string }>;
}
