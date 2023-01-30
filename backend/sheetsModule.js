const { GoogleAuth } = require('google-auth-library');
const { google, ValueInputOption, MajorDimension } = require('googleapis');

// const sheetID = "1oOohmDEw3R2AU8aHwt9-KWGpFCQSYz08HsGgcXQEDLQ";

// Get the authenticated Google Sheets object
async function getSheets() {
    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
        keyFile: './credentials/google_service_credentials.json'
    });

    const client = await auth.getClient();

    return google.sheets({ version: 'v4', auth });
}

// Return the values within <range>
async function readSheets({ range, sheetID }) {
    const sheets = await getSheets();

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetID,
            range: range,
        });
        return response;
    } catch (err) {
        // TODO (Developer) - Handle exception
        throw err;
    }
}

// Replace the values within <range> with <values>
async function updateSheets({ values, range, sheetID }) {
    const sheets = await getSheets(sheetID);

    console.log(sheetID);

    // let values = [
    //     [
    //         "Test1", "Test2", "Test3"
    //     ],
    //     [
    //         "Test4", "Test5", "Test6"
    //     ],
    // ];
    const resource = {
        values,
    };

    try {
        const result = await sheets.spreadsheets.values.update({
            spreadsheetId: sheetID,
            range: range,
            resource: resource,
            valueInputOption: "RAW"
        });
        // console.log('%d cells updated.', result.data.updatedCells);
        return result;
    } catch (err) {
        // TODO (Developer) - Handle exception
        throw err;
    }
}

module.exports = { readSheets, updateSheets }