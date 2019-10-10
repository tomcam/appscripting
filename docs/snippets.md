# Killer Google Apps Script code snippets

Just a line or 3 of code that can work just about anywhere.

## Add a row to the current spreadsheet

If there's an active spreadsheet, this adds a row to it. `appendRow()` takes an array, and puts one 
element in each successive column.

```js
SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow(["cell A", "cell B"])
```
