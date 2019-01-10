# readspreadsheet.md

Google Apps Script code to read the contents of a normal spreadsheet (active/only sheet, beginning at A1) efficiently.

/**
 * @param {sheet} sheet - Google Sheet with data or header beginning at A1
 * @pre sheet should contain the contents of the active sheet, e.g. getActiveSpreadsheet().getActiveSheet()
 */
function processSheet(sheet) {
  var numRows = sheet.getLastRow()
  var numCols = sheet.getLastColumn()
  // Read the spreadsheet contents into this variable and
  // traverse it instead of fetching values using the API
  var range = sheet.getDataRange().getValues()
  // This assumes a the first row is a header. Set eachRow = 0 if there is no header.
  for (eachRow = 1; eachRow < numRows; eachRow++ ) {
    for (eachCell = 0; eachCell < numCols; eachCell++) {
         // Process the cell; 
         // Logger.log(range[eachRow][eachCell])
    }
  }         
}

