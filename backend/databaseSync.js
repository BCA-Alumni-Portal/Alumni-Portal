const sheetsAccess = require("./sheetsAccess");
const sqlAccess = require("./sqlAccess");

const sql_columns = sqlAccess.sql_columns

// Pull data from the SQL database and write to the Google Sheets
async function exportSqlToSheets(sheetID) {
    let data = await sqlAccess.getDataFromSQL();
    let result = sheetsAccess.writeDataToSheets(sql_columns, data, sheetID, 0, await sqlAccess.getLastEffectiveSqlAlumniID());
    return result;
}

// Pull new data from the Google Sheets and write to the SQL Database
async function writeNewEntriesToSQL(sheetID) {
    let lastSqlID = await sqlAccess.getLastEffectiveSqlAlumniID();
    let lastSheetsID = await sheetsAccess.getLastEffectiveSheetsAlumniID(sheetID);

    // Sync things from Sheets to SQL
    // Read the rows that the SQL database doesn't have
    let values = await sheetsAccess.getDataFromSheets(sheetID, lastSqlID, lastSheetsID);
    let result = sqlAccess.writeDataToSQL(sql_columns, values);
    return result;
}

async function sync(sheetID) {
    let lastSqlID = await sqlAccess.getLastEffectiveSqlAlumniID();
    let lastSheetsID = await sheetsAccess.getLastEffectiveSheetsAlumniID(sheetID);

    // - Upon loading the application, get:
    //     - Last alumni_id from SQL
    //     - Last Alumni ID from Sheets
    // - Compare the two ids
    //     - If they're equal, we're all good
    //     - If they aren't equal: {

    // - If alumni_id (SQL) is lower, get all new rows from Sheets and upload them to SQL
    // - If Alumni ID (Sheets) is lower, get all new rows from SQL and upload them to Sheets (strip info if needed)

    // }

    if (lastSqlID == lastSheetsID) {
        // All good! (for now)
        // console.log("No need for a sync - all good!");
        return null;
    } else if (lastSqlID < lastSheetsID) { // Sync things from Sheets to SQL
        // // Read the rows that the SQL database doesn't have
        let values = await sheetsAccess.getDataFromSheets(sheetID, lastSqlID, lastSheetsID);

        // [ Query Structure ]
        // INSERT INTO table_name (column_list)
        // VALUES
        //     (value_list_1),
        //     (value_list_2),
        //     ...
        //     (value_list_n);

        let result = sqlAccess.writeDataToSQL(sql_columns, values);
        return result;
    } else if (lastSheetsID < lastSqlID) { // Sync things from SQL to Sheets
        // // Query the rows that the Sheets doesn't have
        let data = await sqlAccess.getDataFromSQL(lastSheetsID, lastSqlID);
        let result = sheetsAccess.writeDataToSheets(sql_columns, data, sheetID, lastSheetsID, lastSqlID);
        return result;
    }
}

module.exports = { sync, exportSqlToSheets, writeNewEntriesToSQL }