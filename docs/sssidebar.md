# Google Apps Script Tutorial: Creating Time Tracker, a Spreadsheet sidebar app

Most Apps Script programs start with some kind of user input. That normally requires a custom form.
Custom forms use HTML and are translated into Javascript objects in Google Apps. This one will appear as a sidebar
on a spreadsheet. It gets built automatically by the built-in 'onOpen()' function, whch is 
triggered when the spreadsheet is first loaded.

# TODO: Add accessibility features
## Write a function to build the sidebar when a user opens the spreadsheet

* Create a spreadsheet and open the script editor as shown in [The Google Apps Script onOpen() event](onopen.md),
but replace the `onOpen` function in `Code.gs` with this:

```js
/**
 * @OnlyCurrentDoc
 */

function onOpen() {
    // Create a top-level menu named 'Time Tracker'
    SpreadsheetApp.getUi()
        .createMenu('Time tracker') 
        // Add a menu item called 'Show time tracker'
        // that when chosen, runs the function showSidebar().
        .addItem('Show time tracker', 'showSidebar')
        // Attach the menu to the main menu bar.
        .addToUi();
}

```

## Write a function that executes when the menu item is chosen

According to the `onOpen()` code, when the user chooses **Show time tracker**
the function 'showSidebar()' runs. Let's add this to the file `Code.gs`:

```js
function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('Time tracker');
  SpreadsheetApp.getUi().showSidebar(ui);
}
```

Whew! What's going on here?

Google Apps Script doesn't host HTML and render it the way you'd think. 
For security reasons HTML isn't run directly. It's stripped of dangerous
script tags and other potentially dangers features. So 
it actually converts the HTML and CSS into Javascript objects. That's what's
happening when `HtmlService.createHtmlOutputFromFile()` takes the `sidebar.html`
file (which we'll create in a moment) as input and returns a Javascript object
of type `HtmlOutputFile`.

* Press Ctrl+S (Command+S on Macintosh) to save the file.

* When asked to edit the project name, enter anything, for example, `Time Tracker`.



* From the **File** menu, choose **New**, then **HTML file**.


## Attach an action to a button with Google Apps Script

