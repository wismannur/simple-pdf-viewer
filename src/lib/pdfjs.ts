import { TAny } from "@/types/global";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { Metadata } from "pdfjs-dist/types/src/display/metadata";

export const getPdfDocument = async ({
  url,
  page,
}: {
  url: string;
  page: number;
}) => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  const loadingTask = pdfjsLib.getDocument(url);
  const pdf = await loadingTask.promise;
  const pdfMeta = await pdf
    .getMetadata()
    .then((metadata: { info: TAny; metadata: Metadata }) => metadata);
  const pdfPage = await pdf.getPage(page);

  return {
    info: pdfMeta.info,
    metadata: pdfMeta.metadata,
    numPages: pdf.numPages,
    page: pdfPage,
  };
};
