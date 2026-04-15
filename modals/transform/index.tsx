import { useGlobalStore } from "@/store/globalStore";
import CustomModal from "@/lib/CustomModal";
import { Column } from "@/lib/interfaces";

export interface IRecordModal {
  open?: boolean;
  title?: any;
  disabled?: boolean;
  onClose?: () => void;
  columns?: { field: string; valueGetter?: string; headerName: string }[];
  onCommitRow?: (theRow: any) => Promise<boolean>;
  row?: any;
  footerProps?: any;
}

const returnFieldComponent = (type: string) => {
  switch (type) {
    case "string":
    case "textArea":
    case "number":
      return "<TextField";

    case "select":
      return "<DropdownField";

    case "boolean":
      return "<CheckboxField";

    case "date":
      return "<DateField";

    default:
      return "UNSUPPORTED_TYPE";
  }
};

const returnItem = (column: Column) => {
  const { field, type, headerName } = column;
  return `{/* ${headerName} */}
<AcmsFieldWrapper show={columnsObj?.${field}}>
  ${returnFieldComponent(type)}
    id="${field}"
    name="${field}"
    label={columnsObj?.${field}?.headerName}
    disabled={disabled || columnsObj?.${field}?.disabled}
    ${type === "number" ? `type="number"` : ""}
    control={control}
    errors={errors}
    required={requiredFields?.${field}}
    ${type === "select" ? `options={modalProps?.${field}}` : ""}
  />
</AcmsFieldWrapper>`;
};

const Transform: React.FC<IRecordModal> = () => {
  const { modalOpen, closeModal, modalProps } = useGlobalStore();
  // const copyArray = modalProps?.columns.map((col: any, index: number) => returnItem(col));
  // const copyOut = copyArray.join(`"`);
  // console.log('🚀 ~ copyOut:', copyOut);
  return (
    <CustomModal
      open={modalOpen}
      title="TRANSFORM"
      onCancel={closeModal}
      onConfirm={() => {}}
    >
      <pre>{`<div className="grid grid-cols-12 gap-x-4">\n\n`}</pre>
      {modalProps?.columns.map((col: any, index: number) => (
        <div key={index}>
          <pre>{returnItem(col)}</pre>
          <pre> </pre>
        </div>
      ))}
      {`</div>`}
    </CustomModal>
  );
};

export default Transform;
