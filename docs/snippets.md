# Killer Google Apps Script code snippets

Just a line or 3 of code that can work just about anywhere.

## Add a row to the current spreadsheet

If there's an active spreadsheet, this adds a row to it. `appendRow()` takes an array, and puts one 
element in each successive column.

```js
SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow(["cell A", "cell B"])
```

## Display a message to a debug log

```js
**
 * Simple log written to a new tab called 'DEBUG'
 * created in the active sheet.
 * Write the time in one column and 
 * a message in the next column to a 
 * special sheet named 'DEBUG' by 
 * default, or you can pass in a different
 * name for the sheetname parameter.
 * Create that
 * sheet if necessary. Does not change
 * the active sheet.
 * @param {string} msg - The text to write
 * @param {string} (optional) sheetName - The name of the sheet to write it to
 * @returns reference to the debug sheet
 * 
 * Side effects
 *   Alters a spreadsheet by writin log information to a sheet 
 *   optionally named 'DEBUG'.
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
}
```


## Display a popup or "toast" message from the spreadsheet

A "flash" or "toast" message appears unobtrusively without
interrupting program execution, then dismisses itself after 
a few seconds. This works with an optional `title` parameter.

```js
/**
 * Displays message for a moment using a "toaster" (titled window that
 * appears for a moment), then retracts it automatially
 * @param {string} msg - The message to display
 * @param {string} title - Title bar appearing over the message 
 */
function flashText(msg, title) {
 // If no title was has passed in, create an empty string so the
 // title doesn't say 'undefined'
 title = title || ""
 // Display message in a popup window that
 // dismisses itself within a few seconds
 SpreadsheetApp.getActiveSpreadsheet().toast(msg, title);
}
```

### Reference

* [toast(msg), toast(msg, title), toast(msg, title timeoutSeconds)](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#toastmsg)


## Display a message to the user from the spreadsheet

This replaces the now-deprecated `Browser.MsgBox()`

```js
SpreadsheetApp.getUi().alert('hello, world.')
```
