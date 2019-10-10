# The Google Apps Script onOpen() event

You'll normally want your custom form to appear when the user opens a spreadsheet.
That action triggers the 'onOpen()' function. Normally that's the place to build
a custom dialog but let's just create the simplest possible program. The first
program is always the same: `hello, world.`

 
* Click [Sheets](https://docs.google.com/spreadsheets/u/0/) link, and choose **Start a new spreadsheet**.
* From the spreadsheet's **Tools** menu, choose **Script Editor**.
The editor appears and you're already in a file named `Code.gs` with some sample code.
* Delete the existing code.
* Add to the `Code.gs` file an `onOpen()` function.
```js
function onOpen() {
  SpreadsheetApp.getUi().alert('hello, world.')
}
```
* Press Ctrl+S (Command+S on Macintosh) to save the file.
* When asked to edit the project name, enter anything for now, say `foo`.

# Google Apps Script Tutorial: Creating a Spreadsheet app with sidebar

Most Apps Script programs start with some kind of user input. That normally requires a custom form.
Custom forms use HTML and are translated into Javascript objects in Google Apps. This one will appear as a sidebar
on a spreadsheet.

* You log in to Google by starting at Gmail. Log in, then choose the Google Apps icon.
* Visit the [Sheets](https://docs.google.com/spreadsheets/u/0/) link, and choose **Start a new spreadsheet**.
* From the spreadsheet's **Tools** menu, choose **Script Editor**.
The editor appears and you're already in a file named `Code.gs`.
* Delete the existing code.
* Add to the `Code.gs` file an `onOpen()` function. If you're a programmer and think you can skip the `@OnlyCurrentDoc` directive, you'll be unpleasantly surprised if you leave it out.
```js
/**
 * @OnlyCurrentDoc
 */

function onOpen() {
  SpreadsheetApp.getUi().alert('hello, world.')
}
```
* Press Ctrl+S (Command+S on Macintosh) to save the file.
* When asked to edit the project name, enter anything, for example, `foo`.



* From the **File** menu, choose **New**, then **HTML file**.
