"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import { getPdfDocument } from "@/lib/pdfjs";

type TPDFResult = {
  pdfUrl: string;
  isViewerOpen: boolean;
  setIsViewerOpen: (value: boolean) => void;
};

export default function PDFResult({
  pdfUrl,
  isViewerOpen,
  setIsViewerOpen,
}: TPDFResult) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scale, setScale] = useState(1);
  const [pdfTitle, setPdfTitle] = useState("");
  const [styleCanvas, setStyleCanvas] = useState({
    width: "100%",
    height: "100%",
  });

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const pdfRender = async () => {
    const pdfDoc = await getPdfDocument({ url: pdfUrl, page: currentPage });
    setTotalPages(pdfDoc.numPages);
    setPdfTitle(pdfDoc.info.Title);

    const canvas = document.getElementById("pdf-canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    const viewport = pdfDoc.page.getViewport({ scale });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    setStyleCanvas({
      width: `${viewport.width}px`,
      height: `${viewport.height}px`,
    });

    const renderContext = {
      canvasContext: context!,
      viewport: viewport,
    };

    pdfDoc.page.render(renderContext);
  };

  useEffect(() => {
    if (pdfUrl && isViewerOpen && currentPage && scale) {
      pdfRender();
    }

    /* eslint-disabled react-hooks/exhaustive-deps */
  }, [pdfUrl, isViewerOpen, currentPage, scale]);

  return (
    <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
      <DialogContent className="max-w-7xl h-fit">
        <DialogHeader className="flex-row justify-between items-center h-fit">
          <DialogTitle>{pdfTitle ?? "Your PDF Here"}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 relative overflow-auto border rounded-lg bg-muted/50 h-full">
          <div
            className="w-full h-full min-h-[600px] max-h-[calc(100vh-200px)] flex justify-center p-6"
            // style={{
            //   transform: `scale(${scale})`,
            //   transformOrigin: "top center",
            //   transition: "transform 0.2s ease-in-out",
            // }}
          >
            {/* PDF content would be rendered here */}
            <canvas
              id="pdf-canvas"
              className="tw-m-auto"
              style={{
                width: styleCanvas.width,
                height: styleCanvas.height,
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mt-4 h-fit">
          <div className="flex gap-2">
            <Button onClick={handleZoomIn} variant="outline" size="sm">
              <Search className="h-4 w-4 mr-1" />
              Zoom In
            </Button>
            <Button onClick={handleZoomOut} variant="outline" size="sm">
              <Search className="h-4 w-4 mr-1" />
              Zoom Out
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              page {currentPage} of {totalPages} total pages.
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
