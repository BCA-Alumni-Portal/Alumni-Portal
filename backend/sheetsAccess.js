const sheetsModule = require("./sheetsModule");

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

async function readDataFromSheets(spreadsheetId, sheetID, rowStart, rowEnd, columnStart, columnEnd) {
    let range = `${sheetID}!${columnStart}${rowStart}:${columnEnd}${rowEnd}`;
    let result = await sheetsModule.readSheets({ range: range, sheetID: spreadsheetId });
    let values = result.data.values;
    return values;
}

async function writeDataToSheets(spreadsheetId, sheetID, rowStart, columnStart, sql_columns, data) {
    let rowEnd = rowStart + data.length;
    let columnEnd = LETTERS[LETTERS.indexOf(columnStart) + data.length];

    let values = [];
    for (let rowData of data) {
        let row = [];
        for (let key of sql_columns) {
            row.push(rowData[key]);
        }
        values.push(row);
    }

    let range = `${sheetID}!${columnStart}${rowStart}:${columnEnd}${rowEnd}`;
    sheetsModule.updateSheets({ values: values, range: range, sheetID: spreadsheetId });
}

async function readAccountsDataFromSheets(spreadsheetId, startID=0, stopID=readLastEffectiveSheetsAccountsID(spreadsheetId)) {
    let TOP_ROWS = 3;
    let TOP_ROWS_MINUS_ONE = TOP_ROWS-1;

    stopID = await stopID;

    // let range = "Accounts!A" + (startID + TOP_ROWS) + ":H" + (stopID + TOP_ROWS_MINUS_ONE);
    // let result = await sheetsModule.readSheets({ range: range, spreadsheetId: spreadsheetId });
    // let values = result.data.values;
    // return values;

    return readDataFromSheets(
        spreadsheetId, 
        "Accounts",
        startID + TOP_ROWS,
        stopID + TOP_ROWS_MINUS_ONE,
        "A",
        "H"
    )
}

async function writeAccountsDataToSheets(sql_columns, data, spreadsheetId, startID=0) {
    let TOP_ROWS = 3;

    return writeDataToSheets(
        spreadsheetId,
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
    // sheetsModule.updateSheets({ values: values, range: range, spreadsheetId: spreadsheetId });
}

async function readAccountsDataFromSheets(spreadsheetId, startID=0, stopID=readLastEffectiveSheetsAccountsID(spreadsheetId)) {
    let TOP_ROWS = 3;
    let TOP_ROWS_MINUS_ONE = TOP_ROWS-1;

    stopID = await stopID;

    // let range = "Accounts!A" + (startID + TOP_ROWS) + ":H" + (stopID + TOP_ROWS_MINUS_ONE);
    // let result = await sheetsModule.readSheets({ range: range, spreadsheetId: spreadsheetId });
    // let values = result.data.values;
    // return values;
    console.log("86: " + spreadsheetId);
    return readDataFromSheets(
        spreadsheetId, 
        "Accounts",
        startID + TOP_ROWS,
        stopID + TOP_ROWS_MINUS_ONE,
        "A",
        "H"
    )
}

async function writeAcademiesDataToSheets(sql_columns, data, spreadsheetId, startID) {
    let TOP_ROWS = 3;

    return writeDataToSheets(
        spreadsheetId,
        "Academies",
        startID + TOP_ROWS,
        "A",
        sql_columns,
        data
    )
}

async function readAcademiesDataFromSheets(spreadsheetId, startID=0, stopID=readLastEffectiveSheetsAcademyID(spreadsheetId)) {
    let TOP_ROWS = 3;
    let TOP_ROWS_MINUS_ONE = TOP_ROWS-1;

    stopID = await stopID;

    // let range = "Accounts!A" + (startID + TOP_ROWS) + ":H" + (stopID + TOP_ROWS_MINUS_ONE);
    // let result = await sheetsModule.readSheets({ range: range, spreadsheetId: spreadsheetId });
    // let values = result.data.values;
    // return values;

    return readDataFromSheets(
        spreadsheetId, 
        "Academies",
        startID + TOP_ROWS,
        stopID + TOP_ROWS_MINUS_ONE,
        "A",
        "B"
    )
}

async function readLastEffectiveSheetsAccountsID(spreadsheetId) {
    let range = "Accounts!A2";
    let lastSheetsID = await sheetsModule.readSheets({ range: range, sheetID: spreadsheetId });
    return parseInt(lastSheetsID.data.values[0][0], 10);
}

async function readLastEffectiveSheetsAcademiesID(spreadsheetId) {
    let range = "Academies!A2";
    let lastSheetsID = await sheetsModule.readSheets({ range: range, sheetID: spreadsheetId });
    return parseInt(lastSheetsID.data.values[0][0], 10);
}

module.exports = { 
    readDataFromSheets,
    writeDataToSheets,

    readAccountsDataFromSheets, 
    writeAccountsDataToSheets, 
    readLastEffectiveSheetsAccountsID,

    readAcademiesDataFromSheets,
    writeAcademiesDataToSheets,
    readLastEffectiveSheetsAcademiesID
}