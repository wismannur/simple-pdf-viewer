"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { useState } from "react";
import PDFResult from "./pdf-result";
import ToggleTheme from "@/components/toggle-theme";

export default function PDFViewer() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsViewerOpen(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Simple PDF Viewer
          </CardTitle>
          <ToggleTheme />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pdfUrl">
                Input Link PDF
                <span className="text-destructive ml-1" aria-hidden="true">
                  *
                </span>
                <span className="sr-only">(required)</span>
              </Label>
              <Input
                id="pdfUrl"
                type="url"
                placeholder="https://example.com/document.pdf"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                required
                pattern="^https?:\/\/.+\.pdf$"
                className="font-mono text-sm"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
              disabled={!pdfUrl}
            >
              Show PDF
            </Button>
          </form>
        </CardContent>
      </Card>

      <PDFResult
        pdfUrl={pdfUrl}
        isViewerOpen={isViewerOpen}
        setIsViewerOpen={setIsViewerOpen}
      />
    </div>
  );
}
