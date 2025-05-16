const fs = require('fs');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

/**
 * A class to generate PDFs from simple HTML-like templates in Node.js without using a browser.
 */
export class PdfGenerator {
  /**
   * Creates an instance of HtmlToPdfGenerator.
   */
  constructor() {
    this.margin = 50;
    this.lineHeight = 20;
  }

  /**
   * Replaces placeholders inside the HTML template with corresponding values from the provided data object.
   * Supported placeholder format: `<%= key %>`
   *
   * @param {string} template - The HTML template string containing placeholders.
   * @param {Object} data - A key-value object to replace placeholders.
   * @returns {string} The rendered HTML string.
   */
  renderTemplate(template, data) {
    return template.replace(/<%=\s*(\w+)\s*%>/g, (_, key) => data[key] !== undefined ? data[key] : '');
  }

  /**
   * Parses a simplified HTML-like string and extracts a list of elements.
   *
   * @param {string} html - The raw HTML-like string to parse.
   * @returns {Array<{type: string, text: string}>} A list of parsed elements with type and text content.
   */
  parseHtml(html) {
    const tokens = [];
    const cleaned = html
      .replace(/\n/g, '')
      .replace(/\s+</g, '<')
      .replace(/>\s+/g, '>');

    const regex = /<(\/?)(\w+)(?:\s[^>]*)?>([^<]*)/g;
    const stack = [];
    let match;

    while ((match = regex.exec(cleaned)) !== null) {
      const [, closing, tag, text] = match;
      if (!closing) {
        if (text.trim() !== '') {
          tokens.push({ type: tag.toLowerCase(), text: text.trim() });
        } else {
          stack.push(tag.toLowerCase());
        }
      } else {
        const last = stack.pop();
        if (last !== tag.toLowerCase()) {
          logger.info(`Unclosed tag mismatch: ${last} / ${tag}`);
        }
      }
    }
    return tokens;
  }

  /**
   * Generates a PDF from a list of parsed HTML elements and saves it to a file.
   *
   * @param {Array<{type: string, text: string}>} parsedElements - The parsed elements from HTML.
   * @param {string} outputPath - The file path where the PDF will be saved.
   */
  async generatePdf(parsedElements, outputPath) {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    let y = height - this.margin;

    const drawText = (text, options = {}) => {
      const { size = 12, bold = false, italic = false, indent = 0 } = options;
      let currentFont = font;
      if (bold) {currentFont = fontBold;}
      if (italic) {currentFont = fontItalic;}

      const maxWidth = width - this.margin * 2;
      const words = text.split(' ');
      let line = '';

      for (const word of words) {
        const testLine = line + word + ' ';
        const testWidth = currentFont.widthOfTextAtSize(testLine, size);
        if (testWidth > maxWidth) {
          page.drawText(line.trim(), {
            x: this.margin + indent,
            y,
            size,
            font: currentFont,
            color: rgb(0, 0, 0),
          });
          line = word + ' ';
          y -= this.lineHeight;
        } else {
          line = testLine;
        }
      }
      if (line !== '') {
        page.drawText(line.trim(), {
          x: this.margin + indent,
          y,
          size,
          font: currentFont,
          color: rgb(0, 0, 0),
        });
        y -= this.lineHeight;
      }
    };

    for (const elem of parsedElements) {
      switch (elem.type) {
        case 'h1':
          drawText(elem.text, { size: 24, bold: true });
          y -= 10;
          break;
        case 'h2':
          drawText(elem.text, { size: 20, bold: true });
          y -= 8;
          break;
        case 'h3':
          drawText(elem.text, { size: 18, bold: true });
          y -= 6;
          break;
        case 'p':
          drawText(elem.text, { size: 12 });
          break;
        case 'b':
          drawText(elem.text, { size: 12, bold: true });
          break;
        case 'i':
          drawText(elem.text, { size: 12, italic: true });
          break;
        case 'u':
          drawText(elem.text, { size: 12 }); // Underline is not directly supported
          break;
        case 'li':
          drawText('• ' + elem.text, { size: 12, indent: 10 });
          break;
        case 'ul':
          // Skip container tags
          break;
        default:
          logger.info('Unhandled tag:', elem.type);
          drawText(elem.text, { size: 12 });
          break;
      }
      if (y < 50) {
        page = pdfDoc.addPage();
        y = height - this.margin;
      }
    }

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
    logger.info(`PDF generated: ${outputPath}`);
  }

  /**
   * Full pipeline: renders the template with data, parses it, and generates a PDF file.
   *
   * @param {string} template - The HTML-like template with placeholders.
   * @param {Object} data - The data object to inject into the template.
   * @param {string} outputPath - The destination file path for the generated PDF.
   */
  async generateFromTemplate(template, data, outputPath) {
    const renderedHtml = this.renderTemplate(template, data);
    const parsedElements = this.parseHtml(renderedHtml);
    await this.generatePdf(parsedElements, outputPath);
  }
}
