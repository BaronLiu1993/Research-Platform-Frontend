import { PDFPageProxy } from "pdfjs-dist";

const renderPDFToCanvas = (
  pageDocument,
  canvas
) => {
  return new Promise((resolve, reject) => {
    pageDocument
      .render({
        canvasContext: canvas.getContext("2d"),
        viewport: pageDocument.getViewport({ scale: 1 }),
      })
      .promise.then(function () {
        resolve(canvas);
      });
  });
};

export default renderPDFToCanvas;