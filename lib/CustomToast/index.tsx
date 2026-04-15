import React from "react";
import toast, { Toast, ToastPosition } from "react-hot-toast";
import { useTranslations } from "next-intl";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";

export const SimpleMessage = ({ dismiss, message }: { dismiss: any; message: string }) => {
   const t = useTranslations();

   return (
      <button type="button" onClick={dismiss}>
         {message}
      </button>
   );
};

const InfoMessage = ({ dismiss, message }: { dismiss: any; message: string }) => (
   <button type="button" onClick={dismiss} className="text-left">
      <GppMaybeIcon className="text-blue-400" /> {message}
   </button>
);

export const ErrorMessage = ({ dismiss, message }: { dismiss: any; message: string }) => {
   const finalMessage = message?.split("•").filter((str) => str !== "");
   return (
      <div className="flex flex-col gap-3 pt-2 w-full">
         {finalMessage?.map((msg, index) => {
            // Check if this is the title (first message that contains "Παρακαλώ")
            const isTitle = msg.includes("Παρακαλώ");

            return (
               <div
                  key={index}
                  className={`text-left text-gray-600 text-sm leading-relaxed  w-full ${isTitle ? "" : "flex items-start gap-2"}`}
               >
                  {!isTitle && <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2" />}
                  <span>{msg}</span>
               </div>
            );
         })}
         <button
            type="button"
            onClick={dismiss}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm self-center"
         >
            OK
         </button>
      </div>
   );
};

export const customToast = ({
   type,
   duration,
   position,
   payload,

   extraToasterProps,
}: {
   type: "success" | "info" | "error" | "custom" | "customDismissable" | "dismissAll";
   duration?: number;
   position?: ToastPosition;
   payload: any;
   translated?: boolean;
   extraToasterProps?: any;
}) => {
   const options = {
      duration,
      position,
      ...extraToasterProps,
   };
   const simpleMessageComponent = (t: Toast) => (
      <SimpleMessage dismiss={() => toast.dismiss(t.id)} message={payload} />
   );
   const infoMessageComponent = (t: Toast) => (
      <InfoMessage dismiss={() => toast.dismiss(t.id)} message={payload} />
   );
   const errorMessageComponent = (t: Toast) => (
      <ErrorMessage dismiss={() => toast.dismiss(t.id)} message={payload} />
   );

   switch (type) {
      case "success":
         toast.success((t) => simpleMessageComponent(t), options);
         break;
      case "error":
         toast.error((t) => errorMessageComponent(t), {
            ...options,
            duration: Infinity,
            icon: null,
         });
         break;
      case "info":
         toast((t) => infoMessageComponent(t), options);
         break;
      case "custom":
         // TODO: @ista also works in other cases, the problem was in translation, some messages (like BE error Response) are dynamic, and there is no translations for that, also about JSX translation (solved by translated)
         toast(payload, options);
         break;
      // TODO: combine custom customDismissable
      case "customDismissable":
         toast(
            (t) => (
               <button type="button" onClick={() => toast.dismiss(t.id)}>
                  {payload}
               </button>
            ),
            options
         );
         break;
      case "dismissAll": // temporar solution, until all TODO's are done!
         toast.dismiss();
         break;
      default:
         toast.error("No such type of custom toast");
   }
};
