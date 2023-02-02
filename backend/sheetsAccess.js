const sheetsModule = require("./sheetsModule");

async function readDataFromSheets(sheetID, startID=0, stopID=readLastEffectiveSheetsAlumniID(sheetID)) {
    let TOP_ROWS = 3;
    let TOP_ROWS_MINUS_ONE = TOP_ROWS-1;

    stopID = await stopID;

    let range = "A" + (startID + TOP_ROWS) + ":F" + (stopID + TOP_ROWS_MINUS_ONE);
    let result = await sheetsModule.readSheets({ range: range, sheetID: sheetID });
    let values = result.data.values;
    return values;
}

async function writeDataToSheets(sql_columns, data, sheetID, startID=0, stopID=readLastEffectiveSheetsAlumniID(sheetID)) {
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

    let range = "A" + (startID + TOP_ROWS) + ":F" + (stopID + TOP_ROWS);
    sheetsModule.updateSheets({ values: values, range: range, sheetID: sheetID });
}

async function readLastEffectiveSheetsAlumniID(sheetID) {
    let lastSheetsID = await readLastSheetsAlumniID(sheetID);
    return parseInt(lastSheetsID.data.values[0][0], 10);
}

// Get the last Alumni ID from the Google Sheets database
async function readLastSheetsAlumniID(sheetID) {
    let range = "A2";
    return sheetsModule.readSheets({ range: range, sheetID: sheetID });
}

module.exports = { readDataFromSheets, writeDataToSheets, readLastEffectiveSheetsAlumniID, readLastSheetsAlumniID }