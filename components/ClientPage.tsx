"use client";

import { useLocalStore } from "@/store/localStore";
import { useAuthStore } from "@/store/authStore";

export default function ClientPage({ locale }: any) {
  const { application } = useLocalStore();
  const { auth } = useAuthStore();

  // useEffect(() => {
  //    if (application && !isLoading && auth) {
  //       const href = services.find((service) => service.to === application)?.href;
  //       if (href) window.open(href, "_self");
  //    }
  // }, [application, isLoading, locale, auth]);

  // if (isLoading) return <LoadingPage />;
  return (
    <main className="px-3 py-5 h-full bg-slate-100">
      {/* Bottom CTA
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-gray-200 text-gray-600">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-sm">All services are running</span>
          </div>
        </div> */}
    </main>
  );
}
