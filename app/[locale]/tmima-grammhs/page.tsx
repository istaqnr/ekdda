"use client";

import { useTranslations } from "next-intl";
import { LinearProgress } from "@mui/material";

import { _columns } from "./columns";
import useOptions from "./useOptions";
import { useGlobalStore } from "@/store/globalStore";
import useLoadNotify from "@/lib/hooks/useApi/useLoadNotify";
import AdvancedDataTable, { useTableData } from "@/lib/CustomTable";
import { encodeURIByParams } from "@/lib/utils";
import { DefaultAddProps, DefaultEditProps } from "@/lib/interfaces";

import { SectionHeader } from "@/lib/SectionHeader";
import mainApi from "@/ui/mainApi";

const queryKey = "tmima-grammhs";

interface QueryParams {
  page: number;
  pageSize: number;
  filters?: Record<string, unknown>;
  sortString?: string;
}

function TmimaGrammhs() {
  const { openModal, closeModal } = useGlobalStore();
  const t = useTranslations();
  const { callRequest } = useLoadNotify();
  const { modalOptions, isOptionsLoading } = useOptions();
  const columns = _columns(t);

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
      const response = await mainApi.post(
        `/api/tmima-grammhs?pageNo=0&pageSize=10`
      );
      console.log("🌊 : TmimaGrammhs : response:", response);

      return response.data;
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
    <div className="px-4">
      <SectionHeader pageTitle={"Τμήμα Γραμμής"} />

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
      />
    </div>
  );
}

export default TmimaGrammhs;
