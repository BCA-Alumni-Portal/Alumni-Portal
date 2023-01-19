const sheetsModule = require("./sheetsModule");
const sqlModule = require("./sqlModule");

async function sync() {
    let lastSqlID = await getLastSqlAlumniID();
    let lastSheetsID = await getLastSheetsAlumniID();
    // console.log("lastSqlID: ");
    // We add 1 because it starts with 0, and max() returns the largest value
    lastSqlID = parseInt(lastSqlID[0]['max(alumni_id)'], 10) + 1;
    // console.log(lastSqlID);

    // console.log("lastSheetsID: ");
    lastSheetsID = parseInt(lastSheetsID.data.values[0][0], 10);
    // console.log(lastSheetsID);

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
    } else if (lastSqlID < lastSheetsID) {
        // Read the rows that the SQL database doesn't have
        let range = "A" + (lastSqlID+3) + ":F" + (lastSheetsID+2);
        let result = await sheetsModule.readSheets({range: range});
        let values = result.data.values;

        // console.log("Sheets Data:");
        // console.log(values);
        // console.log(result);

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

        let queryResult = await sqlModule.makeQuery({query: query});
        // console.log(queryResult);

    } else if (lastSheetsID < lastSqlID) {
        // Query the rows that the Sheets doesn't have
        let query = "SELECT * FROM Alumni WHERE alumni_id >= " + lastSheetsID + " AND alumni_id <= " + lastSqlID;
        let data = await sqlModule.makeQuery({query: query});

        // console.log("SQL Data:");
        // console.log(data);

        // The values that will be put into Sheets
        let values = [];
        for (let rowData of data) {
            let row = [];
            for (let key of sql_columns) {
                // console.log("Key: " + key);
                // console.log(rowData);
                row.push(rowData[key]);
            }
            values.push(row);
        }
        // console.log(values);

        let range = "A" + (lastSheetsID+3) + ":F" + (lastSqlID+3);
        // console.log(range);
        sheetsModule.updateSheets({values: values, range: range});

    }
}

// Get the last alumni_id from the SQL database
async function getLastSqlAlumniID() {
    let query = "SELECT max(alumni_id) FROM Alumni";
    return await sqlModule.makeQuery({query: query});
}

// Get the last Alumni ID from the Google Sheets database
async function getLastSheetsAlumniID() {
    let range = "A2";
    return await sheetsModule.readSheets({range: range});
}

module.exports = { sync }