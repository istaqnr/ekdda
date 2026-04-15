import useGenParamsByKey from "@/lib/hooks/useGenParamsQuery";

const useOptions = () => {
  const modalOptions = {};
  const isOptionsLoading = Object.values(modalOptions).some(
    (option) => option?.isLoading
  );
  return { isOptionsLoading, modalOptions };
};
export default useOptions;
