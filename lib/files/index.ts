import { get } from "lodash";

type Base64File = {
  base64: string;
  name: string;
  type?: string;
};

export const convertFileToBase64 = (file: File): Promise<Base64File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      const base64String = result.replace(/^data:.+;base64,/, "");

      resolve({
        base64: base64String,
        name: file.name,
        type: file.type,
      });
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const convertFilesToBase64 = async (files: File[]) => {
  return Promise.all(files.map((file) => convertFileToBase64(file)));
};

const downloadFileByBinaryData = (data: BlobPart, filename: string) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
};

export const downloadFileByDataset = (fileData: unknown) => {
  const data64 = get(fileData, "base64");
  const filename = get(fileData, "name");

  if (typeof data64 !== "string" || typeof filename !== "string") {
    console.warn("File download error: invalid file payload");
    return;
  }

  const binary = Buffer.from(data64, "base64");
  downloadFileByBinaryData(binary, filename);
};
