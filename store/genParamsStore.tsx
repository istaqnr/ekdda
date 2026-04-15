import { create } from "zustand";

type GenParamsStore = {
   genParams: any;
   setGenParams: (key: string, value: any) => void;
};

export const useGenParamsStore = create<GenParamsStore>((set) => ({
   genParams: {},
   setGenParams: (key, value): any =>
      set((state): any => {
         return { genParams: { ...state.genParams, [key]: value } };
      }),
}));
