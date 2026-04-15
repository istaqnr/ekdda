"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { LinearProgress } from "@mui/material";

import { _columns } from "./columns"; //TODO

import useOptions from "./useOptions";
import { useGlobalStore } from "@/store/globalStore";
import useLoadNotify from "@/lib/hooks/useApi/useLoadNotify";
import AdvancedDataTable, { useTableData } from "@/lib/CustomTable";
import mainApi from "@/ui/mainApi";
import { encodeURIByParams } from "@/lib/utils";
import { DefaultAddProps, DefaultEditProps } from "@/lib/interfaces";
import useExportCSV from "@/lib/hooks/useExportCSV";
import { SectionHeader } from "@/lib/SectionHeader";

const queryKey = "acms.elements.mainGrid";
const translationSource = "ACMS";

function ACMSElements() {
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
    apiFilters,
  } = useTableData({
    queryKey,
    pageSize: 5,
    queryFn: async ({ page, pageSize, filters, sortString }: any) => {
      const URIparams = encodeURIByParams({
        pageNo: page,
        pageSize,
        sort: sortString,
      });
      return await mainApi.post(
        `/dddy/backend/api/acms/sec-elements-type/dynamic?${URIparams}`,
        filters
      );
    },
    defaultSort: [
      {
        columnField: "cd",
        direction: "asc",
      },
    ],
  });

  const onAdd = () => {
    const modalProps: DefaultAddProps = {
      columns,
      ...modalOptions,
      translationSource,
      onConfirm: (payload: any) =>
        callRequest(async () => {
          const res = await mainApi.post(
            `/dddy/backend/api/acms/sec-elements-type/create`,
            payload
          );
          res && refetchData();
          closeModal();
        }),
    };
    openModal("DEFAULT", modalProps);
  };

  const onView = (row: any) => {
    const modalProps: any = {
      columns,
      row,
      disabled: true,
      translationSource,
      onConfirm: (payload: any) => closeModal(),
    };

    openModal("DEFAULT", modalProps);
  };

  const onEdit = (row: any) => {
    const modalProps: DefaultEditProps = {
      columns,
      row,
      ...modalOptions,
      translationSource,
      onConfirm: (payload: any) =>
        callRequest(async () => {
          await mainApi.put(
            `/dddy/backend/api/acms/sec-elements-type/update`,
            payload
          );
          refetchData();
          closeModal();
        }),
    };
    openModal("DEFAULT", modalProps);
  };

  const onDelete = (row: any) => {
    const modalProps: any = {
      columns,
      row,
      translationSource,
      onConfirm: () =>
        callRequest(async () => {
          await mainApi.delete(
            `/dddy/backend/api/acms/sec-elements-type/${row.id}`
          );
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
      translationSource,
      onConfirm: () => closeModal(),
    };
    openModal("FILTERS", modalProps);
  };

  const exportToExcel = useExportCSV(
    `/dddy/backend/api/acms/sec-elements-type/exportToExcel`
  );

  const onExport = async (visibleColumns: any[]) => {
    await exportToExcel(visibleColumns, apiFilters);
  };

  if (isOptionsLoading) return <LinearProgress />;

  return (
    <>
      <SectionHeader pageTitle={t("ACMS.ELEMENT_TYPES")} />
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
        onExportClicked={onExport}
        translationSource={translationSource}
      />
    </>
  );
}

export default ACMSElements;
