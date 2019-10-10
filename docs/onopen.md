# The Google Apps Script onOpen() event

You'll normally want your custom form to appear when the user opens a spreadsheet.
That action triggers the built-in 'onOpen()' function. Normally that's the place to build
a sidebar in the form of a custom dialog but let's do the simplest possible thing. Everyone's first
program is always the same: `hello, world.`

## Create a spreadsheet to show how the onOpen() event is triggered
 
* Click [Sheets](https://docs.google.com/spreadsheets/u/0/) link, and choose **Start a new spreadsheet**.

* Choose `Untitled spreadshee` and give it a new name, for example, the ever-creative `test`.

### Open the script editor

* From the spreadsheet's **Tools** menu, choose **Script Editor**.
The editor appears and you're already in a file named `Code.gs` with some sample code.
* Delete the existing code.

### Write a script to execute as soon as a user opens the spreadsheet

* Add to the `Code.gs` file an `onOpen()` function.
```js
/**
 * @OnlyCurrentDoc
 */
function onOpen() {
  SpreadsheetApp.getUi().alert('hello, world.')
}
```
The SpreadsheetApp object has scores of methods and properties, and `getUi()` obtains an `Ui` object representing the user interface for the spreadsheet that contains the script. This script is dependent upon that object. (There's a way to write scripts that live outside the spreadsheet, but that's not what's happening here.) `alert()` is a method of the `Ui` object that displays a message box.

* To save the file, press Ctrl+S (Command+S on Macintosh) or choose the **File** menu, then **Save**.

You're asked for a project name.

* When asked to edit the project name, enter anything for now, say `foo`.

To make sure the page reloads, it's best to close the spreadsheet document altogether, then reopen it

* Close the main spreadsheet tab, and the code editor will be dismissed.

* Return to the [Sheets page](https://docs.google.com/spreadsheets/u/0/) and choose the spreadsheet you just created.

Opening the sheet eventually results in the `onOpen()` function being triggered. After a few seconds, you'll see 
your masterpiece come to live. The message you created appears in a modal dialog that you can dismiss with the **OK** button it provides.

![Image of the Google Apps Script ui.alert](./assets/img/google-apps-script-ui-alert.png)
