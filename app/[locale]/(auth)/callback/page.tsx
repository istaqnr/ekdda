"use client";

import { getSession, signIn } from "next-auth/react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
// import LoadingPage from "@/ui/loading-page";

export default function ApplicationReturnPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { locale } = useParams();
  const router = useRouter();
  const hasRun = useRef(false);
  const DEV = process.env.NEXT_PUBLIC_ENV === "DEV";

  const { setAuth } = useAuthStore();
  const redirectUrl = encodeURIComponent(
    `${process.env.NEXT_PUBLIC_PROXY_BASE_URL}/${locale}/redirect`
  );

  const loginCitizenTaxis = async () => {
    try {
      const response = await signIn("CitizenTaxis", {
        code,
        redirect: false,
      });
      if (response) {
        const session: Session | null = await getSession();
        if (session) {
          setAuth(session);
          const url = DEV
            ? `${process.env.NEXT_PUBLIC_PROXY_BASE_URL}/${locale}/redirect`
            : `${process.env.NEXT_PUBLIC_CITIZEN_LOGOUT_URL}/${process.env.NEXT_PUBLIC_CITIZEN_CLIENT_ID}/?url=${redirectUrl}`;
          router.push(url);
        }
      }
    } catch (error) {
      // setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (code && !hasRun.current) {
      hasRun.current = true;
      loginCitizenTaxis();
    }
  }, [code]);
  //   if (isLoading) return <LoadingPage />;
}
