"use client";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

import { useSession } from "next-auth/react";
import CustomModal from "@/modals/custom-modal";
import AppLayout from "@/ui/layout/AppLayout";

const ClientLayout = ({ children }: any) => {
  const { authHydrated, setAuth } = useAuthStore();
  const { data: session, status } = useSession();

  // Sync NextAuth session with Zustand authStore
  useEffect(() => {
    if (status === "authenticated" && session && authHydrated) {
      setAuth(session);
    }
  }, [session, status, authHydrated, setAuth]);

  return (
    <>
      {authHydrated && (
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              maxWidth: "340px",
              width: "auto",
              borderRadius: "8px",
              background: "#333",
              color: "#fff",
            },
            error: {
              style: {
                maxWidth: "600px",
                minWidth: "500px",
                width: "auto",
              },
            },
          }}
        />
      )}
      <CustomModal />
      <AppLayout>{children}</AppLayout>
    </>
  );
};

export default ClientLayout;
