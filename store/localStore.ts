import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LocalStore {
   selectedRow: any;
   application: any;
   notificationsChecked: boolean;
   pageApp: number | null;
   menuHref: string | null;
   setPageApp: (pageApp: number) => void;
   setSelectedRow: (selectedRow: any) => void;
   setApplication: (application: any) => void;
   setNotificationChecked: (notificationsChecked: any) => void;
   setMenuHref: (menuHref: string) => void;
}

export const useLocalStore = create(
   persist<LocalStore>(
      (set) => ({
         selectedRow: null,
         application: null,
         menuHref: null,
         notificationsChecked: false,
         pageApp: null,
         setPageApp: (pageApp: number) => set({ pageApp }),
         setApplication: (application: any) => set({ application }),
         setMenuHref: (menuHref: string) => set({ menuHref }),
         setNotificationChecked: (notificationsChecked: any) => set({ notificationsChecked }),
         setSelectedRow: (selectedRow: any) => set({ selectedRow }),
      }),
      {
         name: "localStore",
         storage: createJSONStorage(() => sessionStorage),
      }
   )
);
