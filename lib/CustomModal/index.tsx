import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Breakpoint } from "@mui/material";
import { isFunction } from "lodash/fp";
import { useTranslations } from "next-intl";
import { UnifiedButton } from "../Form/Button";

interface MODAL {
  children?: any;
  open: boolean;
  title?: any;
  subTitle?: any;
  onCancel?(t?: any, t2?: any): any;
  customFooter?: (props: any) => React.ReactNode;
  onRemove?(t?: any, t2?: any): any;
  onConfirm?: any;
  maxWidth?: false | Breakpoint | undefined;
  footerProps?: any;
  confirmation?: boolean;
  handleSubmit?: any;
}

const CustomModal: React.FC<MODAL> = ({
  children,
  open = false,
  title,
  subTitle,
  customFooter,
  onCancel,
  onRemove,
  onConfirm,
  maxWidth = "lg",
  footerProps,
  confirmation = false,
  handleSubmit,
}) => {
  const t = useTranslations("INDEX");
  const [confirm, setConfirm] = useState(false);
  const [cancel, setCancel] = useState(false);

  const matches = useMediaQuery("(max-width:500px)");

  const confirmationMessage = (
    <div className="text-center text-lg font-semibold">
      Θέλετε να αποθηκεύσετε τις αλλαγές σας;
    </div>
  );
  const cancelConfirmationMessage = (
    <div className="text-center text-lg font-semibold">
      <p>Οι αλλαγές σας δεν θα αποθηκευτούν.</p>
      <p>Είστε σίγουροι ότι θέλετε να προχωρήσετε με την ακύρωση;</p>
    </div>
  );

  const Confirm = () => (
    <>
      <div>
        <UnifiedButton
          fullWidth
          variant="primary"
          title={t("NO")}
          disabled={footerProps?.cancel?.disabled}
          onClick={() => setConfirm(false)}
        ></UnifiedButton>
      </div>
      <UnifiedButton
        fullWidth
        title={t("YES")}
        variant="primary"
        disabled={footerProps?.cancel?.disabled}
        onClick={onConfirm}
      ></UnifiedButton>
    </>
  );

  const Cancel = () => (
    <>
      <div>
        <UnifiedButton
          fullWidth
          title={t("NO")}
          disabled={footerProps?.cancel?.disabled}
          onClick={() => setCancel(false)}
        />
        <UnifiedButton
          fullWidth
          title={t("YES")}
          variant="primary"
          disabled={footerProps?.cancel?.disabled}
          onClick={() => setCancel(false)}
        />
      </div>
      <UnifiedButton
        variant="primary"
        disabled={footerProps?.cancel?.disabled}
        onClick={onCancel}
      >
        {t("YES")}
      </UnifiedButton>
    </>
  );

  const DefaultFooter = () => (
    <div className="flex gap-4 p-2 justify-end">
      {confirmation && confirm ? (
        <Confirm />
      ) : confirmation && cancel ? (
        <Cancel />
      ) : (
        <>
          {!!onCancel && (
            <UnifiedButton
              showTooltip={false}
              fullWidth
              title={footerProps?.cancel?.text || t("CANCEL")}
              variant="primary"
              disabled={footerProps?.cancel?.disabled}
              onClick={confirmation ? () => setCancel(true) : onCancel}
            />
          )}
          <div className="flex gap-2">
            {!!onRemove && (
              <UnifiedButton
                showTooltip={false}
                fullWidth
                title={footerProps?.remove?.text || t("REMOVE")}
                variant="primary"
                disabled={footerProps?.remove?.disabled}
                onClick={onRemove}
              />
            )}
            {!!onConfirm && (
              <UnifiedButton
                showTooltip={false}
                fullWidth
                title={footerProps?.confirm?.text || t("CONFIRM")}
                variant="primary"
                disabled={footerProps?.confirm?.disabled}
                onClick={
                  confirmation
                    ? () => handleSubmit(() => setConfirm(true))()
                    : onConfirm
                }
              />
            )}
          </div>
        </>
      )}
    </div>
  );

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      fullWidth={matches}
      maxWidth={matches ? false : maxWidth}
    >
      {title && (
        <DialogTitle>
          {confirmation && confirm ? "" : confirmation && cancel ? "" : title}
        </DialogTitle>
      )}
      <DialogContent>
        <DialogContentText>{subTitle}</DialogContentText>
        {confirmation && confirm
          ? confirmationMessage
          : confirmation && cancel
          ? cancelConfirmationMessage
          : children}
      </DialogContent>
      <DialogActions>
        {isFunction(customFooter) ? (
          customFooter({ onCancel, onRemove, onConfirm })
        ) : (
          <DefaultFooter />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
