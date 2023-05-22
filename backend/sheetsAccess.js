const sheetsModule = require("./sheetsModule");

async function readDataFromSheets(sheetID, startID=0, stopID=readLastEffectiveSheetsAccountsID(sheetID)) {
    let TOP_ROWS = 3;
    let TOP_ROWS_MINUS_ONE = TOP_ROWS-1;

    stopID = await stopID;

    let range = "A" + (startID + TOP_ROWS) + ":H" + (stopID + TOP_ROWS_MINUS_ONE);
    let result = await sheetsModule.readSheets({ range: range, sheetID: sheetID });
    let values = result.data.values;
    return values;
}

async function writeDataToSheets(sql_columns, data, sheetID, startID=0, stopID=readLastEffectiveSheetsAccountsID(sheetID)) {
    let TOP_ROWS = 3;

    stopID = await stopID;

    // The values that will be put into Sheets
    let values = [];
    for (let rowData of data) {
        let row = [];
        for (let key of sql_columns) {
            row.push(rowData[key]);
        }
        values.push(row);
    }

    let range = "A" + (startID + TOP_ROWS) + ":H" + (stopID + TOP_ROWS);
    sheetsModule.updateSheets({ values: values, range: range, sheetID: sheetID });
}

async function readLastEffectiveSheetsAccountsID(sheetID) {
    let lastSheetsID = await readLastSheetsAccountsID(sheetID);
    return parseInt(lastSheetsID.data.values[0][0], 10);
}

// Get the last Accounts ID from the Google Sheets database
async function readLastSheetsAccountsID(sheetID) {
    let range = "A2";
    return sheetsModule.readSheets({ range: range, sheetID: sheetID });
}

module.exports = { readDataFromSheets, writeDataToSheets, readLastEffectiveSheetsAccountsID, readLastSheetsAccountsID }