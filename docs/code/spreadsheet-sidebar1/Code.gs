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
}

/**
 * User-defined function that gets called when
 * the sidebar needs to be displayed in the UI.
 * It doesn't have to be named 'sidebar.html'.
 * But doing so makes it easier to share code.
 */
function showSidebar() {
  // Create a javascript object of type HtmlOutput from the
  // named 'html' file, which in this case is sidebar.html.
  // Give the title bar the lable "Time tracker"
  var ui = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('Time tracker');
  // Display the sidebar. This can take a couple of seconds.
  SpreadsheetApp.getUi().showSidebar(ui);
}

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
