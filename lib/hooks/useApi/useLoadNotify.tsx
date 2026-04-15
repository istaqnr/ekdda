import get from "lodash/fp/get";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { SimpleMessage, ErrorMessage } from "@/lib/CustomToast";

interface CallRequestOptions {
  type?: "info" | "success" | "error";
  infoMessage?: string | undefined;
  successMessage?: string | undefined;
  errorMessage?: string | undefined;
}

const useLoadNotify = () => {
  const t = useTranslations("INDEX");

  const callRequest = async (
    request: any,
    options: CallRequestOptions = {}
  ) => {
    const successMessage = options?.successMessage || t("SAVE_SUCCESS");
    const errorMessage = options?.errorMessage || t("SAVE_FAILED");

    const toastId = `toast-${Date.now()}`;
    try {
      await toast.promise(
        request(),
        {
          loading: t("PROSSESING"),

          success: () => (
            <SimpleMessage
              dismiss={() => toast.dismiss(toastId)}
              message={successMessage}
            />
          ),
          error: (error) => {
            const errorResponse =
              get("response.data.message", error) ||
              get("message", error) ||
              errorMessage ||
              t("RETRIEVE_FAILED");

            return (
              <ErrorMessage
                dismiss={() => toast.dismiss(toastId)}
                message={errorResponse}
              />
            );
          },
        },
        {
          id: toastId,
          // Different durations for success and error
          success: {
            duration: 3000, // Success toasts auto-dismiss after 3 seconds
          },
          error: {
            duration: Infinity, // Error toasts stay until dismissed
            icon: null,
          },
        }
      );
    } catch (error: any) {
      // customToast({ type: 'error', payload: error?.response?.data?.message });
    }
  };
  return { callRequest };
};

export default useLoadNotify;
