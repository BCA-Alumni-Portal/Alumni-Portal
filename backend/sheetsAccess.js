const sheetsModule = require("./sheetsModule");

async function getDataFromSheets(sheetID, startID=0, stopID=getLastEffectiveSheetsAlumniID(sheetID)) {
    let TOP_ROWS = 3;
    let TOP_ROWS_MINUS_ONE = TOP_ROWS-1;

    stopID = await stopID;

    let range = "A" + (startID + TOP_ROWS) + ":F" + (stopID + TOP_ROWS_MINUS_ONE);
    let result = await sheetsModule.readSheets({ range: range, sheetID: sheetID });
    let values = result.data.values;
    return values;
}

async function writeDataToSheets(sql_columns, data, sheetID, startID=0, stopID=getLastEffectiveSheetsAlumniID(sheetID)) {
    let TOP_ROWS = 3;

    stopID = await stopID;
    console.log("STOP ID:");
    console.log(stopID);

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

async function getLastEffectiveSheetsAlumniID(sheetID) {
    let lastSheetsID = await getLastSheetsAlumniID(sheetID);
    // console.log("-----------SHEETS ID-----------");
    // console.log(lastSheetsID);
    // return parseInt(lastSheetsID.data.values, 10);
    return parseInt(lastSheetsID.data.values[0][0], 10);
}

// Get the last Alumni ID from the Google Sheets database
async function getLastSheetsAlumniID(sheetID) {
    let range = "A2";
    return sheetsModule.readSheets({ range: range, sheetID: sheetID });
}

module.exports = { getDataFromSheets, writeDataToSheets, getLastEffectiveSheetsAlumniID, getLastSheetsAlumniID }