const sheetsAccess = require("./sheetsAccess");
const sqlAccess = require("./sqlAccess");

const writeAccountsColumns = sqlAccess.writeSheetsAccountsColumns;
const writeAcademyColumns = sqlAccess.writeSheetsAcademyColumns;

// Pull data from the SQL database and write to the Google Sheets
async function exportSqlToSheets(sheetID) {
    let data = await sqlAccess.readAccountsDataFromSQL();
    let result = await sheetsAccess.writeAccountsDataToSheets(writeAccountsColumns, data, sheetID, 0, await sqlAccess.readLastEffectiveSqlAccountsID());
    return result;
}

// Pull new data from the Google Sheets and write to the SQL Database
async function writeNewEntriesToSQL(sheetID) {
    let lastSqlID = await sqlAccess.readLastEffectiveSqlAccountsID();
    let lastSheetsID = await sheetsAccess.readLastEffectiveSheetsAccountsID(sheetID);

    // Sync things from Sheets to SQL
    // Read the rows that the SQL database doesn't have
    let values = await sheetsAccess.readAccountsDataFromSheets(sheetID, lastSqlID, lastSheetsID);
    let result = await sqlAccess.writeDataToSQL(writeAccountsColumns, values);
    return result;
}

async function syncAccountsData(sheetID) {
    let lastSqlID = (await sqlAccess.readLastEffectiveSqlAccountsID()) || 0;
    let lastSheetsID = (await sheetsAccess.readLastEffectiveSheetsAccountsID(sheetID)) || 0;

    // console.log(lastSqlID);
    // console.log(lastSheetsID);

    // - Upon loading the application, read:
    //     - Last account_id from SQL
    //     - Last Accounts ID from Sheets
    // - Compare the two ids
    //     - If they're equal, we're all good
    //     - If they aren't equal: {

    // - If account_id (SQL) is lower, read all new rows from Sheets and upload them to SQL
    // - If Accounts ID (Sheets) is lower, read all new rows from SQL and upload them to Sheets (strip info if needed)

    // }

    // Force it to write from sheets to SQL
    // let values = await sheetsAccess.readAccountsDataFromSheets(sheetID, 0, lastSheetsID);
    // let result = await sqlAccess.writeDataToSQL(writeAccountsColumns, values);
    // console.log(result);
    // if (true) {
    //     return;
    // }

    if (lastSqlID == lastSheetsID) {
        // All good! (for now)
        // console.log("No need for a sync - all good!");
        return null;
    } else if (lastSqlID < lastSheetsID) { // Sync things from Sheets to SQL
        // // Read the rows that the SQL database doesn't have
        let values = await sheetsAccess.readAccountsDataFromSheets(sheetID, lastSqlID, lastSheetsID);

        // [ Query Structure ]
        // INSERT INTO table_name (column_list)
        // VALUES
        //     (value_list_1),
        //     (value_list_2),
        //     ...
        //     (value_list_n);

        let result = await sqlAccess.writeDataToSQL(writeAccountsColumns, values, sqlAccess.TABLES.ACCOUNTS);
        // console.log(values);
        // console.log(result);
        return result;
    } else if (lastSheetsID < lastSqlID) { // Sync things from SQL to Sheets
        // // Query the rows that the Sheets doesn't have
        let data = await sqlAccess.readAccountsDataFromSQL(lastSheetsID, lastSqlID);
        let result = await sheetsAccess.writeAccountsDataToSheets(writeAccountsColumns, data, sheetID, lastSheetsID, lastSqlID);
        return result;
    }
}

async function syncAcademiesData(sheetID) {
    let lastSqlID = (await sqlAccess.readLastEffectiveSqlAcademiesID()) || 0;
    let lastSheetsID = (await sheetsAccess.readLastEffectiveSheetsAcademiesID(sheetID)) || 0;
    console.log(lastSqlID);
    console.log(lastSheetsID);

    if (lastSqlID == lastSheetsID) {
        return;
    } else if (lastSqlID < lastSheetsID) { // Sync things from Sheets to SQL
        // // Read the rows that the SQL database doesn't have
        let values = await sheetsAccess.readAcademiesDataFromSheets(sheetID, lastSqlID, lastSheetsID);

        // [ Query Structure ]
        // INSERT INTO table_name (column_list)
        // VALUES
        //     (value_list_1),
        //     (value_list_2),
        //     ...
        //     (value_list_n);

        let result = await sqlAccess.writeDataToSQL(writeAcademyColumns, values, sqlAccess.TABLES.ACADEMY);
        // console.log(values);
        // console.log(result);
        return result;
    } else if (lastSheetsID < lastSqlID) { // Sync things from SQL to Sheets
        // // Query the rows that the Sheets doesn't have
        let data = await sqlAccess.readAcademiesDataFromSQL(lastSheetsID, lastSqlID);
        let result = await sheetsAccess.writeAcademiesDataToSheets(writeAcademyColumns, data, sheetID, lastSheetsID, lastSqlID);
        return result;
    }
}

async function sync(sheetID) {
    syncAccountsData(sheetID);
    syncAcademiesData(sheetID);
}

module.exports = { sync, exportSqlToSheets, writeNewEntriesToSQL }