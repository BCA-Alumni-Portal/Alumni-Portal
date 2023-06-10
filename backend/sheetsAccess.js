const sheetsModule = require("./sheetsModule");

async function readDataFromSheets(spreadsheetID, sheetID, rowStart, rowEnd, columnStart, columnEnd) {
    let range = `${sheetID}!${columnStart}${rowStart}:${columnEnd}${rowEnd}`;
    let result = await sheetsModule.readSheets({ range: range, spreadsheetID: spreadsheetID });
    let values = result.data.values;
    return values;
}

async function writeDataToSheets(spreadsheetID, sheetID, rowStart, columnStart, sql_columns, data) {
    let rowEnd = rowStart + data.length;
    let columnEnd = columnStart + sql_columns.length;

    let values = [];
    for (let rowData of data) {
        let row = [];
        for (let key of sql_columns) {
            row.push(rowData[key]);
        }
        values.push(row);
    }

    let range = `${sheetID}!${columnStart}${rowStart}:${columnEnd}${rowEnd}`;
    sheetsModule.updateSheets({ values: values, range: range, spreadsheetID: spreadsheetID });
}

async function readAccountsDataFromSheets(spreadsheetID, startID=0, stopID=readLastEffectiveSheetsAccountsID(spreadsheetID)) {
    let TOP_ROWS = 3;
    let TOP_ROWS_MINUS_ONE = TOP_ROWS-1;

    stopID = await stopID;

    // let range = "Accounts!A" + (startID + TOP_ROWS) + ":H" + (stopID + TOP_ROWS_MINUS_ONE);
    // let result = await sheetsModule.readSheets({ range: range, spreadsheetID: spreadsheetID });
    // let values = result.data.values;
    // return values;

    return readDataFromSheets(
        spreadsheetID, 
        "Accounts",
        startID + TOP_ROWS,
        stopID + TOP_ROWS_MINUS_ONE,
        "A",
        "H"
    )
}

async function writeAccountsDataToSheets(sql_columns, data, spreadsheetID, startID=0, stopID=readLastEffectiveSheetsAccountsID(spreadsheetID)) {
    let TOP_ROWS = 3;

    stopID = await stopID;

    return writeDataToSheets(
        spreadsheetID,
        "Accounts",
        startID + TOP_ROWS,
        "A",
        sql_columns,
        data
    )

    // // The values that will be put into Sheets
    // let values = [];
    // for (let rowData of data) {
    //     let row = [];
    //     for (let key of sql_columns) {
    //         row.push(rowData[key]);
    //     }
    //     values.push(row);
    // }

    // let range = "Accounts!A" + (startID + TOP_ROWS) + ":H" + (stopID + TOP_ROWS);
    // sheetsModule.updateSheets({ values: values, range: range, spreadsheetID: spreadsheetID });
}

async function readLastEffectiveSheetsAccountsID(spreadsheetID) {
    let lastSheetsID = await readLastSheetsAccountsID(spreadsheetID);
    return parseInt(lastSheetsID.data.values[0][0], 10);
}

// Get the last Accounts ID from the Google Sheets database
async function readLastSheetsAccountsID(spreadsheetID) {
    let range = "A2";
    return sheetsModule.readSheets({ range: range, spreadsheetID: spreadsheetID });
}

module.exports = { 
    readDataFromSheets,
    writeDataToSheets,

    readAccountsDataFromSheets, 
    writeAccountsDataToSheets, 
    readLastEffectiveSheetsAccountsID, 
    readLastSheetsAccountsID 
}