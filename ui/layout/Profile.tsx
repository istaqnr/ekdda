"use client";

import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/authStore";
import { Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import CrossAppLink from "@/lib/CrossAppLink";

import { useGlobalStore } from "@/store/globalStore";
import { UnifiedButton } from "@/lib/Form/Button";
import mainApi, { getData } from "../mainApi";
import useCustomQuery from "@/lib/hooks/useCustomQuery";

const validityOptions = [
  { dscrTxt: "ΑΠΛΗ ΔΗΛΩΣΗ ΣΤΟΙΧΕΙΩΝ" },
  { dscrTxt: "ΤΑΥΤΟΠΟΙΗΣΗ ΣΤΟΙΧΕΙΩΝ" },
  { dscrTxt: "ΠΛΗΡΗΣ ΕΛΕΓΧΟΣ ΕΓΚΥΡΟΤΗΤΑΣ" },
];

const getProsopikaStoixeia = async () => {
  const res = await mainApi.get("/backend/api/v1/s-mhtrwo/me");
  return getData(res);
};

const UserProfileInfo = () => {
  const t = useTranslations();
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLButtonElement | null>(
    null
  );
  const queryClient = useQueryClient();
  const closePopover = () => setPopoverAnchor(null);
  const { auth, logout } = useAuthStore();

  const { setSidebarOpen } = useGlobalStore();

  const handleLogout = async () => {
    try {
      await logout();
      queryClient.invalidateQueries();
      setSidebarOpen(false);
      // Only window open here because of the proxy server
      window.open(
        `${process.env.NEXT_PUBLIC_PROXY_BASE_URL}/el/login`,
        "_self"
      );
    } catch (err) {
      console.error("logout error", err);
    }
  };

  const { data } = useCustomQuery({
    queryKey: "profile",
    queryFn: () => getProsopikaStoixeia(),
    staleTime: Infinity,
    enabled: !!auth,
  });

  const fullName = `${data?.firstName} ${data?.lastName}`.toUpperCase();

  if (!auth) {
    return (
      <CrossAppLink
        href={`${process.env.NEXT_PUBLIC_PROXY_BASE_URL || ""}/el/login`}
      >
        <UnifiedButton
          title={t("INDEX.LOGIN")}
          variant="none"
          size="small"
          showTooltip={false}
          className="bg-white hover:bg-white text-primary"
        />
      </CrossAppLink>
    );
  }

  // const isFullNameAvailable = auth?.user?.firstname && auth?.user?.lastname;

  return (
    <div>
      <div
        className="cursor-pointer my-auto p-0"
        role="button"
        onClick={(event: any) => setPopoverAnchor(event.currentTarget)}
        tabIndex={0}
      >
        <Tooltip title={t("INDEX.USER_PROFILE")}>
          <AccountCircleRoundedIcon
            fontSize="large"
            className="text-gray-700"
          />
        </Tooltip>
      </div>
      <Popover
        id={popoverAnchor ? "user-menu-popover" : undefined}
        open={!!popoverAnchor}
        anchorEl={popoverAnchor}
        onClose={closePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              width: "auto",
              minWidth: "300px",
              maxWidth: "400px",
            },
          },
        }}
      >
        <div className="flex flex-col items-center text-center p-4 min-w-[300px]">
          <div className="flex flex-col gap-3">
            <div className="w-[50px] h-[50px] flex justify-center rounded-full mx-auto p-[6px] my-1">
              <AccountCircleRoundedIcon
                className=" text-slate-200"
                sx={{ fontSize: 55 }}
              />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <div className="text-primary">
                <b>{fullName}</b>
              </div>

              <span className="flex flex-col">
                <b>Αριθμός Μητρώου</b> {data?.cdMhtrwo}
              </span>

              <span className="flex flex-col">
                <b>Ημερομηνία Εγγραφής </b>
                {dayjs(data?.createdOn).format("DD/MM/YYYY")}
              </span>
              <span className="flex flex-col">
                <b>Βαθμός Εγκυρότητας</b>
                {validityOptions[data?.validity?.id]?.dscrTxt}
              </span>

              <UnifiedButton
                title={t("INDEX.LOGOUT")}
                variant="primary"
                onClick={handleLogout}
                className="w-[200px] mt-3 mb-2"
                size="small"
              />
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default UserProfileInfo;
