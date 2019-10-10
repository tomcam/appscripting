# Google Apps Script Tutorial: Creating Time Tracker, a Spreadsheet sidebar app

Most Apps Script programs start with some kind of user input. That normally requires a custom form.
Custom forms use HTML and are translated into Javascript objects in Google Apps. This one will appear as a sidebar
on a spreadsheet. It gets built automatically by the built-in 'onOpen()' function, whch is 
triggered when the spreadsheet is first loaded.

# TODO: 
## Add accessibility features
## Exlain diff from Google forms

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

## Create an HTML file for the form

```html
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
       <!-- Make it look Googly -->
    <link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons1.css">
    <!-- Give the UI a little breathing room -->
    <style>form { margin-left: 1em; } button { margin-top: .5em; } </style>
    </head>
   <body>
    <form>
     <h3>Activity log</h3>
     <input type="text" id="description" tabindex="0">
     <div>
      <button class="blue" id="ok-button" tabindex="1">OK</button>
     </div>
    <form/>
   <body/>
<html/>

<!-- Use jquery to clarify and abridge Javascript code. --> 
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

<script>

/**
 * This function runs when the page is finished loading.
 */
$(function() {
  // Attach a click handler to the button
  // whose `id` element is `ok-button`. 
  // There should be no other elements
  // with that ID.
  $('#ok-button').click(getActivityNote);
});


/**
 * Called when the user clicks the OK button.
 */
 function getActivityNote() {
  // Obtain the value of the text box whose
  // `id` element was set to `description`.
  // Send it to the server. If a function named
  // activityLog() can be found in Code.gs or
  // any other .gs files, it can use the
  // description to add a new row to the spreadsheet
  google.script.run.activityLog($("#description").val())
}
</script>        
```

* Press Ctrl+S (Command+S on Macintosh) to save the file.

* When asked to edit the project name, enter anything, for example, `Time Tracker`.



* From the **File** menu, choose **New**, then **HTML file**.


## Attach an action to a button with Google Apps Script

