const sqlModule = require("./sqlModule");

let sql_columns = [
    "alumni_id",
    "first_name",
    "last_name",
    "graduation_year",
    "email_address",
    "academy_id"
]

// Construct a query which writes <values> to <sqlColumns> in the same order
function constructSQLWriteQuery(sqlColumns, values) {
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
async function getDataFromSQL(startID=0, endID=getLastEffectiveSqlAlumniID(), columns=sql_columns) {
    endID = await endID;
    // Sync things from SQL to Sheets
    // Query the rows that the Sheets doesn't have
    let query = "SELECT * FROM Alumni WHERE alumni_id >= " + startID + " AND alumni_id <= " + endID;

    let data = await sqlModule.makeQuery({ query: query });

    return data;
}

async function writeDataToSQL(columns, values) {
    let query = constructSQLWriteQuery(columns, values);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function getLastEffectiveSqlAlumniID() {
    let lastSqlID = await getLastSqlAlumniID();
    // We add 1 because it starts with 0, and max() returns the largest value
    return parseInt(lastSqlID[0]['max(alumni_id)'], 10) + 1;
}

// Get the last alumni_id from the SQL database
async function getLastSqlAlumniID() {
    let query = "SELECT max(alumni_id) FROM Alumni";
    return await sqlModule.makeQuery({ query: query });
}

module.exports = { getDataFromSQL, writeDataToSQL, getLastEffectiveSqlAlumniID, getLastSqlAlumniID, sql_columns }