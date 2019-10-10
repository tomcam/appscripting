# Google Apps Script Glossary

## @OnlyCurrentDoc

A directive in the form of a [JsDoc annotation](https://jsdoc.app/) that allows you to restrict authorization 
for a script. Instead of warning the user it will be globally applied to all documents, it's needed
only for the spreadsheet, document, slide, or form in which it's contained.
It decreases the amount of permissions you're asked for when you run a script. It's handy during development.

See [Manual authorization scopes for Sheets, Docs, Slides, and Forms](https://developers.google.com/apps-script/guides/services/authorization#manual_authorization_scopes_for_sheets_docs_slides_and_forms)
for more details.
