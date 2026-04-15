"use client";

import React from "react";

import { Column } from "@/lib/interfaces";
import { UnifiedButton } from "./Form/Button";

const Transform = ({ columns }: { columns: Column[] }) => {
  const { openModal } = useGlobalStore();
  return (
    <UnifiedButton
      title="Transform to custom"
      size="medium"
      variant="primary"
      spanClassName="my-auto"
      className="bg-primary my-2"
      onClick={() => {
        const modalProps = {
          columns,
        };
        openModal("TRANSFORM", modalProps);
      }}
    />
  );
};

export default Transform;
