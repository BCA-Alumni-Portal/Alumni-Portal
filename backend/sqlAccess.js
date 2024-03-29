var mysql = require('mysql');
const sqlModule = require("./sqlModule");

const readAccountsColumns = [
    "account_id",
    "first_name",
    "last_name",
    "graduation_year",
    "email_address",
    "academy_id",
    "is_visible",
    "is_admin"
];
// When adding accounts, <account_id> is autoincremented
const writeAccountsColumns = readAccountsColumns.slice(1);
const writeSheetsAccountsColumns = readAccountsColumns;
const readPublicAccountsColumns = [
    "account_id",
    "first_name",
    "last_name",
    "graduation_year",
    "academy_id"
];

const readMessageColumns = [
    "id",
    "conversation_id",
    "sender_id",
    "body",
    "sent_datetime"
];
const writeMessageColumns = readMessageColumns;

const profileInfoColumns = [
    "company",
    "graduation_year",
    "pronouns",
    "academy_id",
    "first_name",
    "last_name"
];

const readSocialColumns = [
    "social_id",
    "account_id",
    "linkedin"
];
const updateSocialColumns = readSocialColumns.slice(2);
const writeSocialColumns = readSocialColumns.slice(1);

const allDescriptionColumns = [
    "description_id",
    "account_id",
    "description"
];
const readDescriptionColumns = allDescriptionColumns[1];
const updateDescriptionColumns = allDescriptionColumns.slice(2);
const writeDescriptionColumns = allDescriptionColumns.slice(1);

const allAcademyColumns = [
    "academy_id",
    "academy_name"
]
const readAcademyColumns = allAcademyColumns.slice(1);
const updateAcademyColumns = allAcademyColumns.slice(1);
const writeAcademyColumns = allAcademyColumns;
const writeSheetsAcademyColumns = allAcademyColumns;

const TABLES = {
    "ACCOUNTS": "Accounts",
    "MESSAGES": "Messages",
    "SOCIAL": "Social",
    "DESCRIPTION": "ProfileDescription",
    "CONVERSATION": "Conversation",
    "ACADEMY": "Academy"
}

// Construct a query which writes <values> to <sqlColumns> in the same order
function constructSQLWriteQuery(sqlColumns, values, tableName = TABLES.ACCOUNTS) {
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
            query += mysql.escape(val);
        }
        query += ")";
    }

    return query;
}

// Construct a query which updates <values> to <sqlColumns> in the same order
function constructSQLUpdateQuery(pkName, pkVal, sqlColumns, values, tableName = TABLES.ACCOUNTS) {
    // console.log(sqlColumns);
    // console.log(values);

    let query = "UPDATE " + tableName + " SET ";
    for (let i = 0; i < sqlColumns.length; i++) {
        if (i == 0) {
            firstRow = false;
        } else {
            query += ", ";
        }
        query += sqlColumns[i] + " = " + mysql.escape(values[i]);
    }
    query += " WHERE " + pkName + " = " + mysql.escape(pkVal);

    return query;
}

function constructSQLOrSequence(variable, possibleValues) {
    let query = "(";
    for (let i = 0; i < possibleValues.length; i++) {
        if (i != 0) {
            query += " OR ";
        }
        query += variable + "=" + mysql.escape(possibleValues[i]);
    }
    query += ")";
    return query;
}

function constructSQLWhereSequence(whereColumns, whereValues) {
    if (whereColumns.length != whereValues.length) {
        print("Error constructing read query: <whereColumns> and <whereValues> must be of equal length");
        return -1;
    }
    let query = " WHERE ";
    for (let i = 0; i < whereColumns.length; i++) {
        if (i != 0) {
            query += "AND ";
        }
        query += whereColumns[i] + "=" + mysql.escape(whereValues[i]);
    }
    return query;
}

// Construct a query which reads the values of <readColumns> from <tableName>, where <whereColumns> == <whereValues>
function constructSQLReadQuery(readColumns, tableName = TABLES.ACCOUNTS) {
    let query = "SELECT DISTINCT ";
    for (let i = 0; i < readColumns.length; i++) {
        if (i != 0) {
            query += ", ";
        }
        query += tableName + "." + readColumns[i];
    }
    query += " FROM " + tableName;

    return query;
}

// Pull data from the SQL database and write to the Google Sheets
async function readAccountsDataFromSQL(startID = 0, endID = readLastEffectiveSqlAccountsID(), columns = readAccountsColumns) {
    endID = await endID;
    startID = mysql.escape(startID);
    endID = mysql.escape(endID);
    // Sync things from SQL to Sheets
    // Query the rows that the Sheets doesn't have
    let query = "SELECT * FROM " + TABLES.ACCOUNTS + " WHERE account_id >= " + startID + " AND account_id <= " + endID;

    let data = await sqlModule.makeQuery({ query: query });

    return data;
}

async function readMessageFromSqlByConversation(conversationID) {
    conversationID = mysql.escape(conversationID)
    let query = `SELECT * FROM Messages WHERE conversation_id=` + conversationID;
    let data = await sqlModule.makeQuery({ query: query });
    return data;
}

async function writeMessageToSQL(senderID, conversationID, body) {
    // Check that the IDs are valid
    let lastID = readLastEffectiveSqlAccountsID();
    if ((senderID > lastID)) {
        console.log("Invalid senderID (sqlAccess:writeMessageToSQL");
        return -1;
    }

    // Check that the body exists
    if (body.length == 0) {
        console.log("Invalid body (sqlAccess:writeMessageToSQL)");
        return -1;
    }

    let values = [
        [
            null,
            conversationID,
            senderID,
            body,
            new Date().toISOString().slice(0, 19).replace('T', ' ') // Have the database log the current date
        ]
    ]
    let result = writeDataToSQL(writeMessageColumns, values, TABLES.MESSAGES);
    return result;
}

async function readLastEffectiveSqlAccountsID() {
    let lastSqlID = await readLastSqlAccountsID();
    // We add 1 because it starts with 0, and max() returns the largest value
    return parseInt(lastSqlID[0]['max(account_id)'], 10) + 1;
}

// Get the last account_id from the SQL database
async function readLastSqlAccountsID() {
    let query = "SELECT max(account_id) FROM " + TABLES.ACCOUNTS;
    return await sqlModule.makeQuery({ query: query });
}

async function readClientID(email) {
    email = mysql.escape(email);

    let query = "SELECT account_id FROM " + TABLES.ACCOUNTS + " WHERE " +
        "(email_address = " + email + ")"
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    // console.log(query);
    // console.log(data);
    if (data[0] == undefined) {
        console.log("Attempted to read client ID, email: <" + email + ">");
        return undefined;
    }
    return data[0].account_id;
}

async function writeProfilePictureToSQL(account_id, picture) {
    // let query = "INSERT INTO " + TABLES.ACCOUNTS + " "
    let columns = ["profile_picture"];
    let values = [
        picture
    ];
    let query = constructSQLUpdateQuery("account_id", account_id, columns, values, TABLES.ACCOUNTS);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function readProfilePictureFromSQL(account_id) {
    let query = "SELECT profile_picture FROM " + TABLES.ACCOUNTS + " WHERE account_id=" + mysql.escape(account_id);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function getAcademyIDFromString(academy_name) {
    let query = "SELECT academy_id FROM Academy WHERE " +
        "(academy_name = " + mysql.escape(academy_name) + ")"
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    if ((data == undefined) || (data[0] == undefined)) {
        return undefined;
    }
    return data[0].academy_id;
}

async function getAcademyStringFromID(academy_id) {
    let query = "SELECT academy_name FROM Academy WHERE " +
        "(academy_id = " + mysql.escape(academy_id) + ")"
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    if (data == undefined) {
        return undefined;
    }
    return data[0].academy_name;
}

async function updateProfileInfoToSQL(accountsID, company = "", graduationYear, pronouns = "", academy, first_name, last_name) {
    let academyID = await getAcademyIDFromString(academy);

    let columns = profileInfoColumns;
    let values = [
        company,
        graduationYear,
        pronouns,
        academyID,
        first_name,
        last_name
    ];
    let query = constructSQLUpdateQuery("account_id", accountsID, columns, values, TABLES.ACCOUNTS);
    // console.log("query: \n" + query);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function readProfileInfoFromSQL(accountsID) {
    let query = "SELECT * FROM " + TABLES.ACCOUNTS + " WHERE " +
        "(account_id = " + mysql.escape(accountsID) + ")"
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    return data;
}

async function readSocialsFromSQL(accountsID) {
    // console.log("readSocialsFromSQL");
    // console.log("AID: " + accountsID);
    // console.log("EAID: " + mysql.escape(accountsID));
    let query = "SELECT * FROM " + TABLES.SOCIALS + " WHERE " +
        "(account_id = " + mysql.escape(accountsID) + ")"
    // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    if (data == undefined) {
        return undefined;
    }
    return data[0];
}

async function updateSocialsToSQL(accountsID, socials) {
    let columns = updateSocialColumns;
    let query = constructSQLUpdateQuery("account_id", accountsID, columns, socials, TABLES.SOCIAL);
    // console.log("query: \n" + query);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function writeSocialsToSQL(accountsID, socials) {
    let columns = writeSocialColumns;
    socials.account_id = accountsID;

    let result = writeDataToSQL(columns, socials, TABLES.SOCIAL);
    // console.log("query: \n" + query);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function readSocialsFromSQL(accountsID) {
    // console.log("almID:");
    // console.log(mysql.escape(accountsID));
    // console.log(parseInt(mysql.escape(accountsID)));
    let query = "SELECT * FROM " + TABLES.SOCIAL + " WHERE " +
        "(account_id = " + accountsID + ")"
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    if (data == undefined) {
        return undefined;
    }
    return data;
}

async function updateSocialsToSQL(accountsID, socials) {
    let columns = updateSocialColumns;
    let query = constructSQLUpdateQuery("account_id", accountsID, columns, socials, TABLES.SOCIAL);
    // console.log("query: \n" + query);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function writeSocialsToSQL(accountsID, socials) {
    let columns = writeSocialColumns;
    let values = [
        [
            accountsID,
            socials[0]
        ]
    ]
    // console.log(columns);
    // console.log(values);
    let result = await writeDataToSQL(columns, values, TABLES.SOCIAL);
    // console.log("result: \n" + result);
    // let queryResult = await sqlModule.makeQuery({ query: query });
    return result;
}

async function readDescriptionFromSQL(accountsID) {
    let query = "SELECT * FROM " + TABLES.DESCRIPTION + " WHERE " +
        "(account_id = " + mysql.escape(accountsID) + ")"
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    // console.log(data);
    if (data == undefined) {
        return undefined;
    }
    return data[0];
}

async function updateDescriptionToSQL(accountsID, description) {
    let columns = updateDescriptionColumns;
    let values = [
        description
    ];
    let query = constructSQLUpdateQuery("account_id", accountsID, columns, values, TABLES.DESCRIPTION);
    // console.log("query: \n" + query);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function writeDescriptionToSQL(accountsID, description) {
    let columns = allDescriptionColumns;
    let values = [
        [
            null,
            accountsID,
            description
        ]
    ]
    // console.log(columns);
    // console.log(values);
    let result = await writeDataToSQL(columns, values, TABLES.DESCRIPTION);
    // console.log("result: \n" + result);
    // let queryResult = await sqlModule.makeQuery({ query: query });
    return result;
}

async function updateVisibilityToSQL(accountsID, is_visible) {
    let columns = ["is_visible"]
    let values = [
        is_visible
    ];
    let query = constructSQLUpdateQuery("account_id", accountsID, columns, values, TABLES.ACCOUNTS);
    // console.log("query: \n" + query);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function readVisibilityFromSQL(accountsID) {
    let query = "SELECT is_visible FROM " + TABLES.ACCOUNTS + " WHERE account_id=" + mysql.escape(accountsID);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function updateAdminToSQL(accountsID, is_admin) {
    let columns = ["is_admin"]
    let values = [
        is_admin
    ];
    let query = constructSQLUpdateQuery("account_id", accountsID, columns, values, TABLES.ACCOUNTS);
    // console.log("query: \n" + query);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}




async function readAccountsDataWithFilter(accountsID, nameFilter, yearFilters, academyFilters) {
    let query = constructSQLReadQuery(readPublicAccountsColumns);
    // console.log("query: " + query);
    // console.log("year or: " + yearOr);
    // console.log("academy or: " + academyOr);

    query += " INNER JOIN Academy WHERE (Accounts.is_admin=0 AND (Accounts.is_visible=1"

    let isAdmin = await readIsAdminFromSQL(accountsID);
    console.log(isAdmin[0]);
    if (isAdmin[0].is_admin == 1) {
        query += " OR Accounts.is_visible=0";
    }
    query += ")) ";

    if ((yearFilters.length + academyFilters.length + nameFilter.length) > 0) {
        query += " AND ";
    }
    if (nameFilter.length > 0) {
        nameFilter = mysql.escape(nameFilter + "%");
        query += ` (Accounts.first_name LIKE ${nameFilter}` + ` OR ` + TABLES.ACCOUNTS + `.last_name LIKE ${nameFilter}` + `)`;
    }
    if (yearFilters.length > 0) {
        if (nameFilter.length > 0) {
            query += " AND ";
        }
        query += `(graduation_year >= ${yearFilters[0]} AND graduation_year <= ${yearFilters[1]}) `;
        // let yearOr = constructSQLOrSequence(TABLES.ACCOUNTS + ".graduation_year", yearFilters);
        // query += yearOr;
    }
    if (academyFilters.length > 0) {
        if ((yearFilters.length > 0) || (nameFilter.length > 0)) {
            query += " AND ";
        }
        let academyOr = constructSQLOrSequence("Academy.academy_name", academyFilters);
        query += "(Accounts.academy_id=Academy.academy_id AND " + academyOr + ")"
    }
    // "WHERE " + yearOr + " AND " + "(Accounts.academy_id=Academy.academy_id AND " + academyOr + ")";
    // console.log("final query: " + query);
    let result = await sqlModule.makeQuery({ query: query });
    return result;
}

async function writeConversation(accountsID, targetID) {
    accountsID = mysql.escape(accountsID);
    targetID = mysql.escape(targetID);
    let checkQuery = "SELECT * FROM " + TABLES.CONVERSATION +
        " WHERE ((first_id=" + accountsID + " AND second_id=" + targetID + ") OR (first_id=" + targetID + " AND second_id=" + accountsID + "))";

    // console.log(checkQuery);
    let checkResult = await sqlModule.makeQuery({ query: checkQuery });
    if (checkResult.length != 0) {
        return;
    }

    let query = "INSERT INTO " + TABLES.CONVERSATION + "(conversation_id, first_id, second_id) VALUES (null, " + accountsID + ", " + targetID + ")";
    // console.log(query);
    let result = await sqlModule.makeQuery({ query: query });
    return result;
}

async function readAvailableConversations(accountsID) {
    accountsID = mysql.escape(accountsID);
    let query = `SELECT Conversation.conversation_id, Accounts.first_name, Accounts.last_name, Conversation.first_id, Conversation.second_id
    FROM Conversation
    INNER JOIN Accounts ON (
    (Conversation.first_id=Accounts.account_id AND Conversation.first_id!=${accountsID})
    OR 
    (Conversation.second_id=Accounts.account_id AND Conversation.second_id!=${accountsID})
    )
    WHERE (Conversation.first_id=${accountsID} OR Conversation.second_id=${accountsID})`

    // console.log(query);
    let result = await sqlModule.makeQuery({ query: query });
    // console.log(result);
    return result;
}

async function readSpecificConversation(accountsID, targetID) {
    accountsID = mysql.escape(accountsID);
    targetID = mysql.escape(targetID);
    let query = "SELECT * FROM " + TABLES.CONVERSATION + " WHERE " +
        "(first_id=" + accountsID + " AND second_id=" + targetID + ") OR (second_id=" + targetID + " AND first_id=" + accountsID + ")";
    // console.log(query);
    let result = await sqlModule.makeQuery({ query: query });
    // console.log(result);
    return result;
}

// Write <values> to SQL in the order of <columns>
async function writeDataToSQL(columns, values, tableName) {
    let query = constructSQLWriteQuery(columns, values, tableName);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function verifyAlumEmail(accountsEmail) {
    let query = "SELECT email_address FROM " + TABLES.ACCOUNTS;
    let data = await sqlModule.makeQuery({ query: query });
    let set = new Set(data.map(element => element.email_address));
    console.log(set);
    console.log(set.has(accountsEmail));

    return set.has(accountsEmail);
}

async function readIsAdminFromSQL(accountID) {
    let query = "SELECT is_admin FROM " + TABLES.ACCOUNTS + " WHERE account_id=" + mysql.escape(accountID);
    let data = await sqlModule.makeQuery({ query: query });
    return data;
}

async function archiveUserInSQL(targetID) {
    let query = "UPDATE " + TABLES.ACCOUNTS + " SET is_visible=0 WHERE account_id=" + mysql.escape(targetID);
    
    let data = await sqlModule.makeQuery({ query: query });
    return data;
}

async function readAcademiesDataFromSQL(startID, endID) {
    startID = mysql.escape(startID + 1);
    endID = mysql.escape(endID);
    let query = "SELECT * FROM " + TABLES.ACADEMY + " WHERE academy_id >= " + startID + " AND academy_id <= " + endID;

    let data = await sqlModule.makeQuery({ query: query });
    return data;
}

async function readLastEffectiveSqlAcademiesID() {
    let lastSqlID = await readLastSqlAcademiesID();
    // We add 1 because it starts with 0, and max() returns the largest value
    return parseInt(lastSqlID[0]['max(academy_id)'], 10);
}

// Get the last academy_id from the SQL database
async function readLastSqlAcademiesID() {
    let query = "SELECT max(academy_id) FROM " + TABLES.ACADEMY;
    return await sqlModule.makeQuery({ query: query });
}

module.exports = {
    TABLES,

    readAccountsDataFromSQL,
    writeDataToSQL,
    writeMessageToSQL,
    readLastEffectiveSqlAccountsID,
    readLastSqlAccountsID,
    writeAccountsColumns,
    writeSheetsAccountsColumns,
    readPublicAccountsColumns,
    readClientID,

    writeProfilePictureToSQL,
    readProfilePictureFromSQL,

    updateProfileInfoToSQL,
    readProfileInfoFromSQL,

    getAcademyIDFromString,
    getAcademyStringFromID,

    readSocialsFromSQL,
    updateSocialsToSQL,
    writeSocialsToSQL,

    readDescriptionFromSQL,
    updateDescriptionToSQL,
    writeDescriptionToSQL,

    readAccountsDataWithFilter,
    writeConversation,
    readAvailableConversations,
    readSpecificConversation,

    readMessageFromSqlByConversation,

    verifyAlumEmail,

    readIsAdminFromSQL,

    readVisibilityFromSQL,
    updateVisibilityToSQL,
    updateAdminToSQL,

    archiveUserInSQL,

    readLastEffectiveSqlAcademiesID,
    readAcademiesDataFromSQL,

    writeAcademyColumns,
    writeSheetsAcademyColumns,
    updateAcademyColumns,
    readAcademyColumns
}