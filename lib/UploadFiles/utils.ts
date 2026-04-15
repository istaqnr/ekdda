const readFileAsBase64 = (file: any) =>
   new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
         // @ts-ignore
         const base64String = reader?.result?.replace(/^data:.+;base64,/, "");

         resolve({
            base64: base64String,
            name: file?.name,
            type: file?.type,
         });
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
   });

const readAndConvertFiles = async (files: any) => {
   const promises = files?.map((file: any) => readFileAsBase64(file));

   return await Promise.all(promises);
};

export { readAndConvertFiles };
