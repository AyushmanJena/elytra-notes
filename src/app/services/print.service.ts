// print.service.ts
import { Injectable } from '@angular/core';
import { marked } from 'marked';

@Injectable({ providedIn: 'root' })
export class PrintService {

  async downloadMarkdownAsPdf(markdownContent: string, title: string = 'document'): Promise<void> {
    const htmlContent = await marked(markdownContent);

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>

          @media print {
            @page {
                margin: 20px;
            }
            body {
                margin: 40px;
                pre { white-space: pre-wrap; }
            }
        }

            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              max-width: 800px;
              margin: 40px auto;
              padding: 0 20px;
              line-height: 1.6;
              color: #1a1a1a;
            }
            h1, h2, h3, h4 { margin-top: 1.5em; margin-bottom: 0.5em; }
            h1 { font-size: 2em; border-bottom: 2px solid #eee; padding-bottom: 0.3em; }
            h2 { font-size: 1.5em; border-bottom: 1px solid #eee; padding-bottom: 0.2em; }
            code {
              background: #f4f4f4;
              padding: 2px 6px;
              border-radius: 3px;
              font-family: 'Courier New', monospace;
              font-size: 0.9em;
            }
            pre {
              background: #f4f4f4;
              padding: 16px;
              border-radius: 6px;
              overflow-x: auto;
              page-break-inside: avoid;
            }
            pre code { background: none; padding: 0; }
            blockquote {
              border-left: 4px solid #3b82f6;
              margin: 0;
              padding: 8px 16px;
              color: #555;
              background: #f8f9ff;
            }
            table { border-collapse: collapse; width: 100%; margin: 1em 0; }
            th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
            th { background: #f4f4f4; font-weight: 600; }
            img { max-width: 100%; }
            a { color: #3b82f6; }

            @media print {
              body { margin: 0; }
              pre { white-space: pre-wrap; }
            }
          </style>
        </head>
        <body>${htmlContent}</body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  }
}