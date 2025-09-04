import { useResizeObserver } from "@wojtekmaj/react-hooks";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useLocation } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
  wasmUrl: "/wasm/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

const Pdf = () => {
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const { state } = useLocation();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <>
      <Breadcrumbs mainTitle="PDF" parent="Lecture" />
      <Container>
        <Row>
          <Col sm="12">
            <Card className="shadow border-0">
              <CardBody>
                <div className="Example__container__document" ref={setContainerRef}>
                  <Document file={state} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                    {Array.from(new Array(numPages), (_el, index) => (
                      <Page key={`page_${index + 1}`} pageNumber={index + 1} width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth} />
                    ))}
                  </Document>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Pdf;
