import { TAny } from "@/types/global";

export const downloadFileFromFetch = (fileUrl: string) => {
  const fileUrlSplitted = fileUrl.split("/");
  const fileName = fileUrlSplitted[fileUrlSplitted.length - 1];

  fetch(fileUrl).then((t: TAny) => {
    return t.blob().then((b: TAny) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.setAttribute("download", fileName);
      a.click();
    });
  });
};
