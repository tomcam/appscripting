# Google Apps Script Tutorial: Creating Time Tracker, a Spreadsheet sidebar app

Most Apps Script programs start with some kind of user input. That normally requires a custom form.
Custom forms use HTML and are translated into Javascript objects in Google Apps. This one will appear as a sidebar
on a spreadsheet. It gets built automatically by the built-in 'onOpen()' function, whch is 
triggered when the spreadsheet is first loaded.


## Write a function to build the sidebar when a user opens the spreadsheet

* Create a spreadsheet and open the script editor as shown in [The Google Apps Script onOpen() event](onopen.md),
but replace the `onOpen` function in `Code.gs` with this:

##### file: Code.gs
```js
/**
 * @OnlyCurrentDoc
 */

/**
 * Built-in function that runs when a spreadsheet is loaded.
 */
function onOpen() {
    // Create a high-level menu named 'Sidebar'
    SpreadsheetApp.getUi()
        .createMenu('Time tracker') // **** OR DocumentApp.getUi().createAddonMenu() ????
        // Add a menu item called 'Show Sidebar'
        // that runs the function showSidebar.
        .addItem('Show time tracker', 'showSidebar')
        // Attach it to the main menu bar.
        .addToUi();

```

## Write a function that executes when the menu item is chosen

According to the `onOpen()` code, when the user chooses **Show time tracker**
the function 'showSidebar()' runs. Let's add this to the file `Code.gs`:

##### file: Code.gs
```js
/**
 * User-defined function that gets called when
 * the sidebar needs to be displayed in the UI.
 * It doesn't have to be named 'sidebar.html'.
 * But doing so makes it easier to share code.
 */
function showSidebar() {
  // Create a javascript object of type HtmlOutput from the
  // named 'html' file, which in this case is sidebar.html,
  // but omit the '.html' extension.
  // Give the title bar the lable "Time tracker"
  var ui = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('Time tracker');
  // Display the sidebar. This can take a couple of seconds.
  SpreadsheetApp.getUi().showSidebar(ui);
}
```

## Write a server-side function to be called from the HTML

We're getting a little premature here, but the
remaining code below gets called from the
HTML. In this case, it will be run
when the user clicks the **OK** button.


Add this to the file `Code.gs`:

##### file: Code.gs
```js
/**
 * Obtain information from the sidebaar
 * and make it available to the server.
 * Server-side, user-defined functions 
 * like this one become part of the
 * globally visible google.script.run object.
 * That means that they're visible to the
 * "client" HTML code and can be called
 * from them like this:
 * google.escript.run.activityLog("hello, world.")
 * @param {string} activity - Description of event to add to log
 */
 function activityLog(activity) {
  // For obtaining the current time
  var d = new Date();
  // This is a single call that obtains
  // the spreadsheet being used at the moment.
  // You pass an array of any size to appendRow(),
  // and it adds a row to the end of the spreadsheet
  // with each element of the array in an adjacent cell.
  SpreadsheetApp.getActiveSpreadsheet()
    .getSheets()[0]
    .appendRow([d.toLocaleTimeString(), activity])
 }

```

* Press Ctrl+S (Command+S on Macintosh) to save the file.


## Create an HTML file for the form

The sidebar is a custom FORM using HTML syntax.Start an HTML file:

* From the **File** menu, choose **New**, then **HTML file**.

A dialog appears asking you to give the file a name.

Remember that the name of an HTML file gets passed to
`HtmlService.createHtmlOutputFromFile()`? The name we
established for it was `sidebar.html`, but remember
there's no need for the file extension, so the
code above is `HtmlService.createHtmlOutputFromFile('sidebar')`

* Enter the filename without `.html`, so just the word `sidebar` in this case.

A new tab with the code appears. Enter this code, which describes a very
simple user interfact:

* A header to remind the user what the sidebar does
* An unlabeled textbox used for activities to track
* An OK button that causes the activity to be added
to the spreadsheet

It includes Google's `add-ons1.cs` to help give your
app a GSuite-compatible look and feel, and an early but
very capable version of [jQuery](https://jquery.com) that 
streamlines the HTML you need to write and can be
used for the script's event loop.

##### file: sidebar.html
```html
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
       <!-- Make it look Googly -->
    <link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons1.css">
    <!-- Give the UI a little breathing room -->
    <style>form { margin-left: 1em; } button { margin-top: .5em; } .help { visibility: hidden; }</style>
    </head>
   <body>
    <form>
     <h3>Activity log</h3>
     <!-- Single text box with OK button.
     Enter text to be logged, and it will be passed 
     pack to the server to be written to the spreadsheet
     along with the current time. -->
     <input type="text" 
       id="activity-note"
       tabindex="0"
       aria-describedby="activity-note-description">
     <div>
      <!-- class=blue is supplied by ad-ons1.css -->
      <button class="blue" 
        id="ok-button" 
        tabindex="1"
        aria-describedby="ok-button-description"
        >OK</button>
     </div>
    <form/>
    <p id="activity-note-description" 
        class="help">
        Type in an activity to track</p>
    <p id="ok-button-description" 
        class="help">
        Adds this note to the spreadsheet</p>
   <body/>
<html/>


<!-- Use jquery to clarify and abridge Javascript code. --> 
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

<script>

/**
 * This jQuery() function runs when the page is finished loading.
 * It is unsafe to start executing code before that moment.
 * Think of it as the main event loop.
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
 * This function could be called anything.
 * Just make sure it matches the click() event
 * code, which in this case only exists for
 * the element named '#ok-button'.
 * User-defined functions in your HTML 
 * be named activityLog(). It becomes part of the 
 * globally visible google.script.run object.
 */
 function getActivityNote() {
  // Obtain the value of the text box whose
  // `id` element was set to `description`.
  // Send it to the server. If a function named
  // activityLog() can be found in Code.gs or
  // any other .gs files, it can use the
  // description to add a new row to the spreadsheet.
  // The function name activityLog() is user-defined
  // and could be named anything you want.
  google.script.run.activityLog($("#activity-note").val())
}
</script>```

Whew! What's going on here?

Google Apps Script doesn't host HTML and render it the way you'd think. 
For security reasons HTML isn't run directly. It's stripped of dangerous
script tags and other potentially dangers features. So 
it actually converts the HTML and CSS into Javascript objects. That's what's
happening when `HtmlService.createHtmlOutputFromFile()` takes the `sidebar.html`
file (which we'll create in a moment) as input and returns a Javascript object
of type `HtmlOutputFile`.

### Forms like this don't work like traditional HTML forms

Standard HTML forms have some kind of form submission action that results
in form values being sent to the server, which then results in a page
reload. 

You don't want a page reload to happen. That would disrupt the spreadsheet
and just plain look bad. Instead, a click handler is attached
to the **OK** button. It calls `getActivityNote()` which obtains the note
of the text written in the text box. It then calls 
a server-side function (without an actual form submit) named `activityLog()`. 
Both functions could be called anything. It's the programmer's choice.

* Press Ctrl+S (Command+S on Macintosh) to save the file.

* When asked to edit the project name, enter anything, for example, `sidebar1`.



