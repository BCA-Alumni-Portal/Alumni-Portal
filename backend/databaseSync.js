const sheetsModule = require("./sheetsModule");
const sqlModule = require("./sqlModule");

function constructSQLWriteQuery({ sqlColumns, values }) {
    let query = "INSERT INTO Alumni (";
    let firstCol = true;
    for (let col of sqlColumns) {
        if (firstCol) {
            firstCol = false;
        } else {
            query += ", ";
        }
        query += col;
    }
    query += ") VALUES ";

    let firstRow = true;
    for (let row of values) {
        if (firstRow) {
            firstRow = false;
        } else {
            query += ", ";
        }
        query += "(";
        let firstVal = true;
        for (let val of row) {
            if (firstVal) {
                firstVal = false;
            } else {
                query += ", ";
            }
            query += '"' + val + '"';
        }
        query += ")";
    }

    return query;
}

// Pull data from the SQL database and write to the Google Sheets
async function exportSqlToSheets({ sheetID }) {
    const START_ID = 0;

    let lastSqlID = await getLastSqlAlumniID();

    // We add 1 because it starts with 0, and max() returns the largest value
    lastSqlID = parseInt(lastSqlID[0]['max(alumni_id)'], 10) + 1;

    let sql_columns = [
        "alumni_id",
        "first_name",
        "last_name",
        "graduation_year",
        "email_address",
        "academy_id"
    ]

    // Sync things from SQL to Sheets
    // Query the rows that the Sheets doesn't have
    let query = "SELECT * FROM Alumni WHERE alumni_id >= " + START_ID + " AND alumni_id <= " + lastSqlID;
    let data = await sqlModule.makeQuery({ query: query });

    // The values that will be put into Sheets
    let values = [];
    for (let rowData of data) {
        let row = [];
        for (let key of sql_columns) {
            row.push(rowData[key]);
        }
        values.push(row);
    }

    let range = "A" + (START_ID + 3) + ":F" + (lastSqlID + 3);
    sheetsModule.updateSheets({ values: values, range: range, sheetID: sheetID });
}

// Pull new data from the Google Sheets and write to the SQL Database
async function writeNewEntriesToSQL({ sheetID }) {
    const START_ID = 0;

    let lastSqlID = await getLastSqlAlumniID();
    let lastSheetsID = await getLastSheetsAlumniID({ sheetID: sheetID });

    // We add 1 because it starts with 0, and max() returns the largest value
    lastSqlID = parseInt(lastSqlID[0]['max(alumni_id)'], 10) + 1;
    lastSheetsID = parseInt(lastSheetsID.data.values[0][0], 10);

    let sql_columns = [
        "alumni_id",
        "first_name",
        "last_name",
        "graduation_year",
        "email_address",
        "academy_id"
    ]

    // Sync things from Sheets to SQL
    // Read the rows that the SQL database doesn't have
    let range = "A" + (lastSqlID + 3) + ":F" + (lastSheetsID + 2);
    let result = await sheetsModule.readSheets({ range: range, sheetID: sheetID });
    let values = result.data.values;

    // [ Query Structure ]
    // INSERT INTO table_name (column_list)
    // VALUES
    //     (value_list_1),
    //     (value_list_2),
    //     ...
    //     (value_list_n);

    let query = "INSERT INTO Alumni (";
    let firstCol = true;
    for (let col of sql_columns) {
        if (firstCol) {
            firstCol = false;
        } else {
            query += ", ";
        }
        query += col;
    }
    query += ") VALUES ";

    let firstRow = true;
    for (let row of values) {
        if (firstRow) {
            firstRow = false;
        } else {
            query += ", ";
        }
        query += "(";
        let firstVal = true;
        for (let val of row) {
            if (firstVal) {
                firstVal = false;
            } else {
                query += ", ";
            }
            query += '"' + val + '"';
        }
        query += ")";
    }

    let queryResult = await sqlModule.makeQuery({ query: query });
}

async function sync({ sheetID }) {
    let lastSqlID = await getLastSqlAlumniID();
    let lastSheetsID = await getLastSheetsAlumniID({ sheetID: sheetID });

    // We add 1 because it starts with 0, and max() returns the largest value
    lastSqlID = parseInt(lastSqlID[0]['max(alumni_id)'], 10) + 1;
    lastSheetsID = parseInt(lastSheetsID.data.values[0][0], 10);

    // - Upon loading the application, get:
    //     - Last alumni_id from SQL
    //     - Last Alumni ID from Sheets
    // - Compare the two ids
    //     - If they're equal, we're all good
    //     - If they aren't equal: {

    // - If alumni_id (SQL) is lower, get all new rows from Sheets and upload them to SQL
    // - If Alumni ID (Sheets) is lower, get all new rows from SQL and upload them to Sheets (strip info if needed)

    // }

    let sql_columns = [
        "alumni_id",
        "first_name",
        "last_name",
        "graduation_year",
        "email_address",
        "academy_id"
    ]

    if (lastSqlID == lastSheetsID) {
        // All good! (for now)
        // console.log("No need for a sync - all good!");
        return;
    } else if (lastSqlID < lastSheetsID) { // Sync things from Sheets to SQL
        // Read the rows that the SQL database doesn't have
        let range = "A" + (lastSqlID + 3) + ":F" + (lastSheetsID + 2);
        let result = await sheetsModule.readSheets({ range: range, sheetID: sheetID });
        let values = result.data.values;

        // [ Query Structure ]
        // INSERT INTO table_name (column_list)
        // VALUES
        //     (value_list_1),
        //     (value_list_2),
        //     ...
        //     (value_list_n);

        let query = "INSERT INTO Alumni (";
        let firstCol = true;
        for (let col of sql_columns) {
            if (firstCol) {
                firstCol = false;
            } else {
                query += ", ";
            }
            query += col;
        }
        query += ") VALUES ";

        let firstRow = true;
        for (let row of values) {
            if (firstRow) {
                firstRow = false;
            } else {
                query += ", ";
            }
            query += "(";
            let firstVal = true;
            for (let val of row) {
                if (firstVal) {
                    firstVal = false;
                } else {
                    query += ", ";
                }
                query += '"' + val + '"';
            }
            query += ")";
        }

        let queryResult = await sqlModule.makeQuery({ query: query });

    } else if (lastSheetsID < lastSqlID) { // Sync things from SQL to Sheets
        // Query the rows that the Sheets doesn't have
        let query = "SELECT * FROM Alumni WHERE alumni_id >= " + lastSheetsID + " AND alumni_id <= " + lastSqlID;
        let data = await sqlModule.makeQuery({ query: query });

        // The values that will be put into Sheets
        let values = [];
        for (let rowData of data) {
            let row = [];
            for (let key of sql_columns) {
                row.push(rowData[key]);
            }
            values.push(row);
        }

        let range = "A" + (lastSheetsID + 3) + ":F" + (lastSqlID + 3);
        sheetsModule.updateSheets({ values: values, range: range, sheetID: sheetID });

    }
}

// Get the last alumni_id from the SQL database
async function getLastSqlAlumniID() {
    let query = "SELECT max(alumni_id) FROM Alumni";
    return await sqlModule.makeQuery({ query: query });
}

// Get the last Alumni ID from the Google Sheets database
async function getLastSheetsAlumniID({ sheetID }) {
    let range = "A2";
    return await sheetsModule.readSheets({ range: range, sheetID: sheetID });
}

module.exports = { sync, exportSqlToSheets, writeNewEntriesToSQL }