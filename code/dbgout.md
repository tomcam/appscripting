# dbgOut

## Logs to spreadsheet tab called 'DEBUG'. Creates sheet if necessary.

```js
/**
 * Simple log written to a new tab called 'DEBUG'.
 * Write the time in one column and 
 * a message in the next column to a 
 * special sheet named 'DEBUG'. Create that
 * sheet if necessary. Does not change
 * the active sheet.
 * @param {string} msg - The text to write
 * @param {string} (optional) sheetName - The name of the sheet to write it to
 * @returns reference to the debug sheet
 */
function dbgOut(msg,sheetName) {
  // Also write to standard log
  Logger.log(msg)
  
  // Preserve current sheet in case writing to the debug
  // pane forces the sheet to be switched.
  var currentSheet = SpreadsheetApp.getActiveSheet()
  
  // If user doesn't specify the name of a debug tab,
  // give it this value:
  if(sheetName == null) {
    sheetName = 'DEBUG';
  }
  var sheet =  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  // Try to get a reference to a tab named sheetName
  if (sheet == null) {
  // Does the debug tab already exist?
    // No. Create it.
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName)
  }
  // Write the date in column A, the message in column B.
  sheet.appendRow([new Date().toLocaleTimeString(),msg]);
  
  // Restore the previously active spreadsheet
  SpreadsheetApp.setActiveSheet(currentSheet)
  return sheet;

```
