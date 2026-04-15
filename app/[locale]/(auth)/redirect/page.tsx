"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

// ⬅️ assuming that's where setLoading lives

const RedirectPage = () => {
  const auth = useAuthStore((state) => state.auth);
  const { locale } = useParams();
  const router = useRouter();

  useEffect(() => {
    router.push(`/${locale}/`);
  }, [auth, locale, router]);
};

export default RedirectPage;
