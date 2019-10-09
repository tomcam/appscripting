# Running code when the spreadsheet opens

The built-in `onOpen()` function runs automatically when 
a spreadsheet is loaded. This demo appends to rows
and writes to a few of the cells.

```js
function onOpen() {
  // Obtain a reference to the active spreadsheet.
  var ss =  SpreadsheetApp.getActiveSpreadsheet()
  // The spreadsheet contains 0 or more sheets in an array.
  // Obtain a reference to the first one.
  var sheet = ss.getSheets()[0];
  // Add a new row! Just pass an arrayy
  // to it, one per cell.
  sheet.appendRow(["hello, world."])
  
  // There's another way to do this:
  // Chaining functions
  SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow(["But wait...", "there's more"])
}
```
