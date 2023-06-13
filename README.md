# BCA Alumni Portal

An alumni portal for the Bergen County Academies. Built by Kevin Liu, Remington Kim, and Hayun Jung.

# Instructions
To install the required node packages, first run `npm install recursive-install` which can also be found at https://www.npmjs.com/package/recursive-install.

Then, run `npm-recursive-install` to install the rest of the node packages in the main directory, the client directory, and the backend directory.

To start, run `npm start` in the main directory, which will use `concurrently` to run the client and server at the same time. See the main directory's package.json for more details.

# Auth0 Setup
Create an Auth0 tenant at https://manage.auth0.com. Navigate to the Applications tabs, select the application you wish to use, and navigate to its Settings tab.

Fill out the following credentials, which can be found on the Settings tabs, in `.example_env`.
- AUTH0_SECRET=[Client secret]
- AUTH0_CLIENT_ID=[Client ID]
- AUTH0_DOMAIN=[Tenant domain]

Then, generate two secret keys for the cookie and JWT authentication functionalities. 
- COOKIE_SECRET=[Random cookie secret]
- JWT_SECRET_KEY=[Random JWT secret]

# MySQL Setup
Provided under the `mysql_dump` folder are files which contain the statements required for recreating the MySQL database.

We used MySQL Workbench to export the structure, and it may be easier to import the structure using Workbench as well.

After the structure has been imported, fill out the SQL credentials in `.example_env`.


# Google Sheets API Setup
The Google Sheets API is required in order to sync data between the MySQL database and the source and export Google Sheets.

In the `.example_env` file, there are a series of environmental variables that must be filled out to ensure proper functionality.

First, a Google Cloud project must be created, which can be accessed at https://console.cloud.google.com.

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

Make sure to share the source and export Google Sheets with your service account's email, so that it can edit those sheets.

For the source sheet, use a copy of https://docs.google.com/spreadsheets/d/1OjG6CG9yg9-o6RyRgzI7j3h9rNkWkhg7BZ38Ke92VK4/edit?usp=sharing.


# Starting it up
Once you have filled out all the information in the `.example_env`, change the file name to `.env`.

Run `npm start` in the main directory to start the application.
