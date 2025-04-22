import ExcelJS from 'exceljs';
/**
 * @typedef {Object} BorderOptions
 * @property {number} [weight] - Border thickness
 * @property {string} [lineStyle='thin'] - Line style (solid, dashed, dotted, etc.)
 * @property {string} [color='000000'] - Border color in ARGB format
 */

/**
 * @typedef {Object} FreezeOptions
 * @property {number} row - Number of rows to freeze
 * @property {number} column - Number of columns to freeze
 */

/**
 * @typedef {Object} FontOptions
 * @property {boolean} [bold] - Whether text is bold
 * @property {number} [size] - Font size
 * @property {string} [color] - Font color
 * @property {string} [name] - Font name
 * @property {boolean} [italic] - Whether text is italic
 * @property {boolean} [underline] - Whether text is underlined
 */

/**
 * @typedef {Object} CellOptions
 * @property {string} [range] - Cell range (e.g. "A1:B5")
 * @property {string} [formula] - Excel formula
 * @property {string} [numberFormat] - Number format (e.g. "0.00", "$#,##0.00")
 * @property {BorderOptions} [border] - Border options
 * @property {boolean} [autoFit=false] - Automatically adjust column width
 * @property {string} [fill] - Cell fill color
 * @property {FontOptions} [font] - Font options
 * @property {string} [alignment] - Text alignment (left, center, right)
 */

/**
 * @typedef {Object} ColumnDefinition
 * @property {string} header - Column header
 * @property {string} key - Unique key for the column
 * @property {number} [width] - Column width
 * @property {CellOptions} [options] - Additional options for the column
 */

/**
 * @typedef {Object} WorkbookProperties
 * @property {string} [title] - Document title
 * @property {string} [creator='Excel Generator'] - Document creator
 * @property {string} [lastModifiedBy='Excel Generator'] - Last modifier
 * @property {Date} [created] - Creation date
 * @property {Date} [modified] - Last modified date
 * @property {string} [subject] - Document subject
 * @property {string} [keywords] - Document keywords
 */

/**
 * @typedef {Object} ExcelOptions
 * @property {string} [sheetName='Sheet1'] - Worksheet name
 * @property {FreezeOptions} [froze] - Options for freezing rows/columns
 * @property {WorkbookProperties} [properties] - Document properties
 */

/**
 * Class for creating Excel files with ExcelJS
 */
class Excel {
  /**
   * Creates an Excel file with the provided data
   *
   * @param {string} name - Name of the Excel file to create (with .xlsx extension)
   * @param {ColumnDefinition[]} columns - Column definitions
   * @param {Object[]} [data=[]] - Data to insert into the sheet
   * @param {ExcelOptions} [options={}] - Additional options for the sheet
   * @returns {Promise<void>} Promise that resolves when file has been created
   * @throws {Error} If name is invalid or columns definition is missing
   *
   * @example
   * const columns = [
   *   {
   *     header: 'Product',
   *     key: 'product',
   *     width: 20,
   *     options: {
   *       autoFit: true,
   *       font: { bold: true }
   *     }
   *   },
   *   {
   *     header: 'Quantity',
   *     key: 'quantity',
   *     width: 10
   *   },
   *   {
   *     header: 'Price',
   *     key: 'price',
   *     width: 15,
   *     options: {
   *       numberFormat: '$#,##0.00'
   *     }
   *   },
   *   {
   *     header: 'Total',
   *     key: 'total',
   *     width: 15,
   *     options: {
   *       numberFormat: '$#,##0.00'
   *     }
   *   }
   * ];
   *
   * const data = [
   *   {
   *     product: '24" Monitor',
   *     quantity: 5,
   *     price: 120,
   *     total: { formula: 'B2*C2' }
   *   }
   * ];
   *
   * const options = {
   *   sheetName: 'Inventory',
   *   froze: { row: 1, column: 0 },
   *   properties: {
   *     title: 'Inventory Report',
   *     creator: 'Management System',
   *     subject: 'Product Inventory',
   *     keywords: 'inventory, products, report'
   *   }
   * };
   *
   * try {
   *   await Excel.createExcel('inventory.xlsx', columns, data, options);
   *   console.log('Excel file created successfully!');
   * } catch (error) {
   *   console.error('Error:', error);
   * }
   */
  async createExcel(name, columns, data = [], options = {}) {
    if (!name || typeof name !== 'string') {
      throw new Error('File name not valid');
    }

    if (!Array.isArray(columns) || columns.length === 0) {
      throw new Error('Columns definition not valid');
    }

    const sheetName = options.sheetName || 'Sheet1';
    const workbook = new ExcelJS.Workbook();

    if (options.properties) {
      workbook.creator = options.properties.creator || 'Excel Generator';
      workbook.lastModifiedBy = options.properties.lastModifiedBy || 'Excel Generator';
      workbook.created = options.properties.created || new Date();
      workbook.modified = options.properties.modified || new Date();

      if (options.properties.title) workbook.title = options.properties.title;
      if (options.properties.subject) workbook.subject = options.properties.subject;
      if (options.properties.keywords) workbook.keywords = options.properties.keywords;
    }

    workbook.calcProperties.fullCalcOnLoad = true;

    let sheet;
    if (options.froze && !_.isNil(options.froze.row) && !_.isNil(options.froze.column)) {
      sheet = workbook.addWorksheet(sheetName, {
        views: [
          {
            state: 'frozen',
            xSplit: options.froze.column,
            ySplit: options.froze.row
          }
        ]
      });
    } else {
      sheet = workbook.addWorksheet(sheetName);
    }

    sheet.columns = columns;

    if (Array.isArray(data) && data.length > 0) {
      sheet.addRows(data);
    }

    columns.forEach((column, index) => {
      if (column.options) {

        if (column.options.autoFit === true) {
          sheet.getColumn(index + 1).width = undefined;
          sheet.getColumn(index + 1).autoWidth = true;
        }

        if (column.options.range && column.options.formula) {
          const range = sheet.getCell(column.options.range);
          range.formula = column.options.formula;
        }

        if (column.options.numberFormat) {
          sheet.getColumn(index + 1).numFmt = column.options.numberFormat;
        }

        if (column.options.border) {
          const borderStyle = {
            style: column.options.border.lineStyle || 'thin',
            color: { argb: column.options.border.color || '000000' }
          };

          sheet.getColumn(index + 1).border = {
            top: borderStyle,
            left: borderStyle,
            bottom: borderStyle,
            right: borderStyle
          };
        }
      }
    });

    try {
      await workbook.xlsx.writeFile(name);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error(`Error during excel creation: ${error.message}`));
    }
  }
}

export default new Excel();