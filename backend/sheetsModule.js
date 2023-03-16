const { GoogleAuth } = require('google-auth-library');
const { google, ValueInputOption, MajorDimension } = require('googleapis');

// const sheetID = "1oOohmDEw3R2AU8aHwt9-KWGpFCQSYz08HsGgcXQEDLQ";

// Get the authenticated Google Sheets object
async function getSheets() {
    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
        credentials: {
            "type": process.env.GS_TYPE,
            "project_id": process.env.GS_PROJECT_ID,
            "private_key_id": process.env.GS_PRIVATE_KEY_ID,
            "private_key": process.env.GS_PRIVATE_KEY.replace(/\\n/g, '\n'),
            "client_email": process.env.GS_CLIENT_EMAIL,
            "client_id": process.env.GS_CLIENT_ID,
            "auth_uri": process.env.GS_AUTH_URI,
            "token_uri": process.env.GS_TOKEN_URI,
            "auth_provider_x509_cert_url": process.env.GS_AUTH_PROVIDER_X509_CERT_URL,
            "client_x509_cert_url": process.env.GS_CLIENT_X509_CERT_URL
          }
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