import { create } from "zustand";

interface Organization {
   id: number;
   permissions: any | null;
   version: number;
   uuid: string | null;
   createdBy: string;
   createdOn: string;
   modifiedBy: string | null;
   modifiedOn: string | null;
   cd: string;
   dscrTxt: string;
}

interface Apsc {
   id: number;
   permissions: any | null;
   version: number;
   createdBy: string;
   createdOn: string;
   modifiedBy: string | null;
   modifiedOn: string | null;
   cd: string;
   dscrTxt: string;
}

export interface SLOT {
   id: number;
   permissions: any | null;
   org: Organization;
   apsc: Apsc;
   bookingDate: string; // YYYY-MM-DD
   bookingStart: string; // ISO String
   startHour: string; // HH:mm
   bookingEnd: string; // ISO String
   endHour: string; // HH:mm
   cnt: number;
}

export type GlobalStore = {
   loading: boolean;
   setLoading: (loading: boolean) => void;

   // Public env shared state
   publicEnv: Record<string, string> | null;
   setPublicEnv: (env: Record<string, string>) => void;

   modalOpen: boolean;
   modalType: string;
   modalProps: Record<string, any> | null;

   openModal: (modalType: string, modalProps?: Record<string, any>) => void;
   closeModal: () => void;

   sidebarOpen: boolean;
   setSidebarOpen: (sidebarOpen: boolean) => void;

   mobileMenuOpen: boolean;
   setMobileMenuOpen: (isOpen: boolean) => void;

   windowWidth: null | number;
   setWindowWidth: (windowWidth: number) => void;
};

export const useGlobalStore = create<GlobalStore>((set) => ({
   loading: false,
   setLoading: (loading: boolean) => set({ loading }),

   // Public env defaults
   publicEnv: null,
   setPublicEnv: (publicEnv) => set({ publicEnv }),

   modalOpen: false,
   modalType: "NONE",
   modalProps: null,

   openModal: (modalType, modalProps) => set({ modalOpen: true, modalType, modalProps }),
   closeModal: () => set({ modalOpen: false, modalType: "NONE", modalProps: null }),

   sidebarOpen: true,
   setSidebarOpen: (sidebarOpen: boolean) => set({ sidebarOpen }),

   mobileMenuOpen: false,
   setMobileMenuOpen: (isOpen: boolean) => set({ mobileMenuOpen: isOpen }),

   windowWidth: null,
   setWindowWidth: (windowWidth: number) => set({ windowWidth }),
}));
