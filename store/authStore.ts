import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { signOut } from "next-auth/react";
import { useTableStore } from "./tableStore";

export interface AuthState {
  auth: any;
  authHydrated: boolean;
  setAuth: (auth: any) => void;
  logout: (params?: { locale?: any }) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      auth: true,
      authHydrated: false,

      setAuth: (auth) => set({ auth, authHydrated: true }),
      logout: async () => {
        sessionStorage.removeItem("adminAuth"); // Clear admin user
        useTableStore.getState().clearTableRows();
        await signOut({
          redirect: false,
        });
        set({ auth: null, authHydrated: false });
      },
    }),
    // Needed for persisting while refresh
    {
      name: "adminAuth",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        // Mark as hydrated after loading from storage
        if (state) {
          state.authHydrated = true;
        }
      },
    }
  )
);
