const sqlModule = require("./sqlModule");

const readAlumniColumns = [
    "alumni_id",
    "first_name",
    "last_name",
    "graduation_year",
    "email_address",
    "academy_id"
];
// When adding alumni, <alumni_id> is autoincremented
const writeAlumniColumns = readAlumniColumns.slice(1);

const readMessageColumns = [
    "id",
    "sender_id",
    "receiver_id",
    "body",
    "sent_datetime"
];
// When sending messages, <id> is autoincremented
const writeMessageColumns = readMessageColumns.slice(1);

const TABLE_ALUMNI = "Alumni";
const TABLE_MESSAGES = "Messages";

// Construct a query which writes <values> to <sqlColumns> in the same order
function constructSQLWriteQuery(sqlColumns, values, tableName=TABLE_ALUMNI) {
    let query = "INSERT INTO " + tableName + " (";
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
async function readAlumniDataFromSQL(startID=0, endID=readLastEffectiveSqlAlumniID(), columns=readAlumniColumns) {
    endID = await endID;
    // Sync things from SQL to Sheets
    // Query the rows that the Sheets doesn't have
    let query = "SELECT * FROM Alumni WHERE alumni_id >= " + startID + " AND alumni_id <= " + endID;

    let data = await sqlModule.makeQuery({ query: query });

    return data;
}

async function readMessageFromSQLByBothIDs(senderID, receiverID) {
    let query = "SELECT * FROM Messages WHERE sender_id = " + senderID + ", receiver_id = " + receiverID;
    let data = await sqlModule.makeQuery({ query: query });

    console.log(data);

    return data;
}

async function writeMessageToSQL(senderID, receiverID, body) {
    let values = [
        [
            senderID, 
            receiverID, 
            body, 
            new Date().toISOString().slice(0, 19).replace('T', ' ') // Have the database log the current date
        ]
    ]
    let result = writeDataToSQL(writeMessageColumns, values, TABLE_MESSAGES);
    return result;
}

// Write <values> to SQL in the order of <columns>
async function writeDataToSQL(columns, values, tableName) {
    let query = constructSQLWriteQuery(columns, values, tableName);
    console.log(query);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function readLastEffectiveSqlAlumniID() {
    let lastSqlID = await readLastSqlAlumniID();
    // We add 1 because it starts with 0, and max() returns the largest value
    return parseInt(lastSqlID[0]['max(alumni_id)'], 10) + 1;
}

// Get the last alumni_id from the SQL database
async function readLastSqlAlumniID() {
    let query = "SELECT max(alumni_id) FROM Alumni";
    return await sqlModule.makeQuery({ query: query });
}

module.exports = { 
    readAlumniDataFromSQL, 
    readMessageFromSQLByBothIDs,
    writeDataToSQL, 
    writeMessageToSQL,
    readLastEffectiveSqlAlumniID, 
    readLastSqlAlumniID, 
    writeAlumniColumns
}