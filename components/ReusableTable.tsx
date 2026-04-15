"use client";

import { useTranslations } from "next-intl";
import { LinearProgress } from "@mui/material";
import useOptions from "../app/[locale]/selects/useOptions";
import { useGlobalStore } from "@/store/globalStore";
import useLoadNotify from "@/lib/hooks/useApi/useLoadNotify";
import AdvancedDataTable, { useTableData } from "@/lib/CustomTable";
import { encodeURIByParams } from "@/lib/utils";
import { DefaultAddProps, DefaultEditProps } from "@/lib/interfaces";
import { generateColumns } from "../app/[locale]/selects/utils";

interface QueryParams {
  page: number;
  pageSize: number;
  filters?: Record<string, unknown>;
  sortString?: string;
}

function ReusableTable({
  id,
  variable,
}: {
  id: string;
  variable: any;
  title?: string;
}) {
  const queryKey = `selects.${id}`;

  const { openModal, closeModal } = useGlobalStore();
  const t = useTranslations();
  const { callRequest } = useLoadNotify();
  const { modalOptions, isOptionsLoading } = useOptions();
  const columns = generateColumns(t, variable);

  const {
    rows,
    pagination,
    onSelectRow,
    onPageChange,
    onPageSizeChange,
    isLoading,
    error,
    refetchData,
  } = useTableData({
    queryKey,
    pageSize: 10,
    staleTime: 0, // Disable cache for testing
    refetchOnWindowFocus: true,
    queryFn: async ({ page, pageSize, filters, sortString }: QueryParams) => {
      const URIparams = encodeURIByParams({
        pageNo: page,
        pageSize,
        sort: sortString,
      });
      const response = { data: variable };

      return response;
    },
  });

  const onAdd = () => {
    const modalProps: DefaultAddProps = {
      columns,
      ...modalOptions,

      onConfirm: () =>
        callRequest(async () => {
          // Add create logic here if needed
          // const res = await mainApi.post(`/api/tmima-grammhs/create`, payload);
          // res && refetchData();
          closeModal();
        }),
    };
    openModal("DEFAULT", modalProps);
  };

  const onView = (row: Record<string, unknown>) => {
    const modalProps: Record<string, unknown> = {
      columns,
      row,
      disabled: true,
      onConfirm: () => closeModal(),
    };

    openModal("DEFAULT", modalProps);
  };

  const onEdit = (row: Record<string, unknown>) => {
    const modalProps: DefaultEditProps = {
      columns,
      row,
      ...modalOptions,
      onConfirm: () =>
        callRequest(async () => {
          // Add update logic here if needed
          // await mainApi.put(`/api/tmima-grammhs/update`, payload);
          refetchData();
          closeModal();
        }),
    };
    openModal("DEFAULT", modalProps);
  };

  const onDelete = (row: Record<string, unknown>) => {
    const modalProps: Record<string, unknown> = {
      columns,
      row,
      onConfirm: () =>
        callRequest(async () => {
          // Add delete logic here if needed
          // await mainApi.delete(`/api/tmima-grammhs/${row.id}`);
          refetchData();
          closeModal();
        }),
    };
    openModal("DELETE_ENTRY", modalProps);
  };

  const onFilters = () => {
    const modalProps: DefaultAddProps = {
      columns,
      ...modalOptions,
      queryKey,
      onConfirm: () => closeModal(),
    };
    openModal("FILTERS", modalProps);
  };

  if (isOptionsLoading) return <LinearProgress />;
  if (columns?.length <= 0) return null;

  return (
    <AdvancedDataTable
      name={queryKey}
      columns={columns}
      rows={rows}
      pageSize={pagination.pageSize}
      rowCount={pagination.rowCount}
      page={pagination.currentPage}
      totalPages={pagination.pageCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      isLoading={isLoading}
      error={error}
      onAdd={onAdd}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      onFilters={onFilters}
      onRowAction={onSelectRow}
      mode="pagination"
      columnsToolbar
      withWrapper={false}
    />
  );
}

export default ReusableTable;
