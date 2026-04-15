"use client";

import { useRouter } from "next/navigation";

import { UnifiedButton } from "@/lib/Form/Button";
import KeyIcon from "./KeyIcon";
import LockIcon from "./LockIcon";

const LoginPage = () => {
  const router = useRouter();

  //! @TODO jas
  const clientId = process.env.NEXT_PUBLIC_CITIZEN_CLIENT_ID ?? "TMM5GU31410";
  const redirectUri =
    process.env.NEXT_PUBLIC_CITIZEN_REDIRECT_URL ??
    `${
      process.env.NEXT_PUBLIC_PROXY_BASE_URL ?? "http://localhost:3000"
    }/el/callback`;

  const authUrlTaxis = `http://asep.secdev.qnr.com.gr/backend/api/acms/auth/taxis/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=read`;

  return (
    <div className="h-full w-full flex-col align-center justify-center bg-slate-100 ">
      {/* Login Card */}
      <div className="relative h-full w-full max-w-md py-20  mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 backdrop-blur-sm bg-opacity-95">
          {/* Logo/Icon Section */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-primary via-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
              <LockIcon />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Καλώς ήρθατε
            </h1>
            <p className="text-gray-600 text-sm">
              Συνδεθείτε για να συνεχίσετε στην πλατφόρμα
            </p>
          </div>

          {/* Login Method Section */}

          <div className="flex flex-col justify-center items-stretch border-t border-gray-200 pt-6">
            <p className="text-center text-sm text-gray-600 mb-6">
              Επιλέξτε τον τρόπο σύνδεσης
            </p>

            <UnifiedButton
              title="Σύνδεση με TAXISnet"
              onClick={() => router.push(authUrlTaxis)}
              icon={<KeyIcon />}
              variant="primary"
              fullWidth
            />
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500">
              Ασφαλής σύνδεση μέσω TAXISnet OAuth
            </p>
          </div>
        </div>

        {/* Additional decorative element */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-64 h-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full opacity-30 blur-sm" />
      </div>
      <div style={{ height: 5, top: 0, left: 0 }} className="bg-white w-full" />
    </div>
  );
};

export default LoginPage;
