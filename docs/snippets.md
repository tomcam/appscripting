# Killer Google Apps Script code snippets

Just a line or 3 of code that can work just about anywhere.

## Add a row to the current spreadsheet

If there's an active spreadsheet, this adds a row to it. `appendRow()` takes an array, and puts one 
element in each successive column.

```js
SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow(["cell A", "cell B"])
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
