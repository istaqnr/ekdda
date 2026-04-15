import { get, isNil, attempt, isError, cloneDeep } from "lodash";
// import { blob } from 'stream/consumers';

const getFilenameByContent = (content: any) => {
   if (!content) {
      throw new Error("cannot extract filename from empty content");
   }

   // cheked cases:
   // BE response: without quotes (by downloadFileToBrowser)
   // attachment; filename=name.xlsx
   // BE response: with quotes in filename, without quotes in filename* (by downloadFileFromExternalSystemToBrowser)
   // attachment; filename="<invalid name>.pdf"; filename*=UTF-8''%ce%86%ce%b4%ce%b5%ce%b9%ce%b1%....pdf"
   const filenameNormal = get(content.match(/filename="*([^";]*)?"*/i), [1]);
   const filenameAsterisk = get(content.match(/filename\*=.*''"*([^\s"]*)?/i), [1]);

   const filenameRaw = filenameAsterisk || filenameNormal;

   if (!filenameRaw) {
      throw new Error(`cannot extract filename from ${content}`);
   }

   // either is encoded (by filenameOverride) or not (by filenameBase), decote it
   const filenameNormalize = decodeURIComponent(filenameRaw);
   console.log("filenameNormalize:", filenameNormalize);
   return filenameNormalize;
};

const getFilenameByHeaders = (headers: any) => {
   const cntDisp = get(headers, "content-disposition");
   return getFilenameByContent(cntDisp);
};

const downloadFileFromExternalSystemToBrowser = (res: any) => {
   // "attachment; filename=\"dummy.pdf\"; filename*=UTF-8''dummy.pdf"

   console.log("downloadFileFromExternalSystemToBrowser...");
   const fileName = getFilenameByHeaders(get(res, "headers"));
   // const fileName = res.headers?.['content-disposition']
   //   ?.replace('attachment;', '')
   //   ?.split(`filename=\"`)?.[1]
   //   ?.split(`\";`)?.[0];

   const type = res.headers?.["content-type"];

   if (isNil(fileName) || isNil(type)) {
      throw new Error();
   }

   const blob = new Blob([res.data], {
      type,
   });

   download(blob, fileName);
};

const downloadFileToBrowser = (res: any) => {
   console.log("downloadFileToBrowser...");
   const fileName = getFilenameByHeaders(get(res, "headers"));
   // const fileName = res.headers?.['content-disposition']?.replace('attachment', '')?.split('=')?.[1];
   const type = res.headers?.["content-type"];

   if (isNil(fileName) || isNil(type)) {
      throw new Error();
   }

   const blob = new Blob([res.data], {
      type,
   });

   download(blob, fileName);
};

const download = (blob: Blob, fileName: string) => {
   const href = URL.createObjectURL(blob);
   const link = document.createElement("a");
   link.href = href;
   link.setAttribute("download", fileName || "file");
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
   URL.revokeObjectURL(href);
};

// const download = (blob: Blob, fileName: string) => {
//   try {
//     const href = URL.createObjectURL(blob);
//     window.open(href, '_blank');
//     setTimeout(() => {
//       URL.revokeObjectURL(href);
//     }, 100);
//   } catch (error) {
//     console.error('Error downloading or opening the PDF:', error);
//     // You could display an error message to the user here
//   }
// };

const downloadFileByData = (data: any, filename: string) => {
   const url = window.URL.createObjectURL(new Blob([data]));
   const link = document.createElement("a");
   link.href = url;
   link.setAttribute("download", `${filename}`);
   document.body.appendChild(link);
   link.click();
   link?.parentNode?.removeChild(link);
};

export const genericDownloadFileToBrowser = (res: any, filename?: string) => {
   const clonedRes = cloneDeep(res);
   let result = attempt(() => downloadFileFromExternalSystemToBrowser(clonedRes));

   if (!isError(result)) return;
   result = attempt(() => downloadFileToBrowser(clonedRes));

   if (!isError(result)) return;

   if (!filename) {
      const headerResult = attempt(() => getFilenameByHeaders(res.headers));
      filename = isError(headerResult) ? "sample" : headerResult;
   }
   downloadFileByData(clonedRes.data, filename);
};

export const checkIfFileExists = async (res: any) => {
   const blob = res.data;

   const text = await blob.text();
   const json = attempt(JSON.parse.bind(null, text));

   // JSON parse failed, contents are not json
   if (isError(json)) return true;
   // the contents are json, check statusCode
   if (json?.statusCode === 404) return false;

   // Code should never reach here
   return true;
};
