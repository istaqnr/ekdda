import Box from "@mui/material/Box";
import get from "lodash/fp/get";
import { useTranslations } from "next-intl";
import { getInitialFieldValues } from "@/lib/utils";
import FormField from "../FormField";

interface ColumnRendererProps {
  column: any;
  options?: any;
  data?: any;
  translationSource?: string;
  disabledOnView?: boolean;
  control?: any;
  errors?: any;
  watch?: any;
  setValue?: any;
  linkTo?: (field: string) => void;
  required?: boolean;
}

const ColumnRenderer = ({
  column,
  options,
  data,
  translationSource,
  disabledOnView,
  control,
  errors,
  watch,
  setValue,
  linkTo,
  required = false,
}: ColumnRendererProps) => {
  const t = useTranslations();
  const { field, type, headerName, disabled: disabledByColumn } = column || {};

  const label: string = translationSource
    ? t(`${translationSource}.${headerName}`)
    : headerName;

  const overrideStyle: any = get("overrideStyle", column);

  const { initialValue, renderOption, minDate, indeterminate, multiple } =
    getInitialFieldValues({
      column,
      data,
      watch,
    });

  const disableCdOnEdit = data?.id && field === "cd";

  const modalSpan = get("modalSpan", column) ?? 12; // global or specific column!

  let fieldOptions = [];

  // TODO jas fix logic here.
  if (Array.isArray(options)) {
    // options is a direct array
    fieldOptions = options;
  } else if (typeof options === "object" && options !== null) {
    if (Array.isArray(options.data)) {
      //  options is like { data: [...], isLoading, error }
      fieldOptions = options.data;
    } else if (options[field]?.data && Array.isArray(options[field].data)) {
      //  options is like { matCateg: { data: [...] } }
      fieldOptions = options[field].data;
    }
  }
  // TODO jas
  return (
    <Box
      sx={{
        paddingTop: "0.5em",
        gridColumn: `span ${modalSpan} / span 12`,
        gridRow: column?.type === "textArea" ? "span 2 / span 2" : "",
        ...overrideStyle,
      }}
    >
      <FormField
        column={column}
        type={type}
        id={field}
        name={field}
        label={label}
        control={control}
        errors={errors}
        disabled={disableCdOnEdit || disabledOnView || disabledByColumn}
        initialValue={initialValue}
        options={fieldOptions}
        minDate={minDate}
        indeterminate={indeterminate}
        multiple={multiple}
        renderOption={renderOption}
        linkTo={linkTo}
        required={required}
      />
    </Box>
  );
};

export default ColumnRenderer;
