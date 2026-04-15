"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const ExpiredTokenPage = () => {
   const queryClient = useQueryClient();

   const { locale } = useParams();
   const t = useTranslations("INDEX");

   const logout = async () => {
      if (typeof window !== "undefined") {
         window?.sessionStorage?.clear();
      }
      await signOut({ callbackUrl: `/${locale}/login`, redirect: true });
   };

   useEffect(() => {
      const to = setTimeout(() => {
         queryClient.clear();
         logout();
      }, 2000);
      return () => {
         clearTimeout(to);
      };
   }, []);

   return (
      <div
         style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         {t("LOGIN_EXPIRED")}
         <Box sx={{ width: "40%" }} className="bg-primary mt-5">
            <LinearProgress color="primary" />
         </Box>
      </div>
   );
};

export default ExpiredTokenPage;
