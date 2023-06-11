# AcademiesAlumni









# Google Sheets API
The Google Sheets API is required in order to sync data between the MySQL database and the source and export Google Sheets.

In the .example_env file, there are a series of environmental variables that must be filled out to ensure proper functionality.

First, a Google Cloud project must be created, which can be accessed at https://console.cloud.google.com

Then:
- Go to APIs & Services 
- Go to Credentials on the left side of the screen, or at https://console.cloud.google.com/apis/credentials
- Click on CREATE CREDENTIALS. We will have to create a [Service account], which will automatically download a JSON file with the necessary information.

Once that has been created, fill out the information below in the .example_env file from the downloaded JSON file.

- GS_PROJECT_ID=[The id of the project]

- GS_PRIVATE_KEY_ID=[Your service account's key ID]

- GS_PRIVATE_KEY=[Your service account's private key]

- GS_CLIENT_EMAIL=[The service account's email]

- GS_CLIENT_ID=[The service account's unique ID]

- GS_CLIENT_X509_CERT_URL=[The certification URL]

Note:

These two variables are not included in the JSON file, and must be taken from the Google Sheets that you want to use for syncing and exporting data.

- GS_SOURCE_SHEET=[The ID of the source google sheets, which will be used for syncing data]

- GS_EXPORT_SHEET=[The ID of the export google sheets, which will be used for exporting data]