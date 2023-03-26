var mysql = require('mysql');
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
const writeSheetsAlumniColumns = readAlumniColumns;
const readPublicAlumniColumns = [
    "alumni_id",
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
    "alumni_id",
    "linkedin"
];
const updateSocialColumns = readSocialColumns.slice(2);
const writeSocialColumns = readSocialColumns.slice(1);

const allDescriptionColumns = [
    "description_id",
    "alumni_id",
    "description"
];
const readDescriptionColumns = allDescriptionColumns[1];
const updateDescriptionColumns = allDescriptionColumns.slice(2);
const writeDescriptionColumns = allDescriptionColumns.slice(1);

const TABLE_ALUMNI = "Alumni";
const TABLE_MESSAGES = "Messages";
const TABLE_SOCIAL = "Social";
const TABLE_DESCRIPTION = "ProfileDescription";
const TABLE_CONVERSATION = "Conversation";

// Construct a query which writes <values> to <sqlColumns> in the same order
function constructSQLWriteQuery(sqlColumns, values, tableName = TABLE_ALUMNI) {
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
function constructSQLUpdateQuery(pkName, pkVal, sqlColumns, values, tableName = TABLE_ALUMNI) {
    console.log(sqlColumns);
    console.log(values);

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
function constructSQLReadQuery(readColumns, tableName = TABLE_ALUMNI) {
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
async function readAlumniDataFromSQL(startID = 0, endID = readLastEffectiveSqlAlumniID(), columns = readAlumniColumns) {
    endID = await endID;
    startID = mysql.escape(startID);
    endID = mysql.escape(endID);
    // Sync things from SQL to Sheets
    // Query the rows that the Sheets doesn't have
    let query = "SELECT * FROM Alumni WHERE alumni_id >= " + startID + " AND alumni_id <= " + endID;

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
    let lastID = readLastEffectiveSqlAlumniID();
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
    let result = writeDataToSQL(writeMessageColumns, values, TABLE_MESSAGES);
    return result;
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

async function readClientID(email) {
    email = mysql.escape(email);

    let query = "SELECT alumni_id FROM Alumni WHERE " +
        "(email_address = " + email + ")"
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    // console.log(query);
    // console.log(data);
    if (data[0] == undefined) {
        console.log("Attempted to read client ID, email: <" + email + ">");
        return undefined;
    }
    return data[0].alumni_id;
}

async function writeProfilePictureToSQL(alumni_id, picture) {

}

async function readProfilePictureFromSQL(alumni_id) {

}

async function getAcademyIDFromString(academy_name) {
    let query = "SELECT academy_id FROM Academy WHERE " +
        "(academy_name = " + mysql.escape(academy_name) + ")"
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    if (data == undefined) {
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

async function updateProfileInfoToSQL(alumniID, company = "", graduationYear, pronouns = "", academy, first_name, last_name) {
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
    let query = constructSQLUpdateQuery("alumni_id", alumniID, columns, values, TABLE_ALUMNI);
    // console.log("query: \n" + query);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function readProfileInfoFromSQL(alumniID) {
    let query = "SELECT * FROM " + TABLE_ALUMNI + " WHERE " +
        "(alumni_id = " + mysql.escape(alumniID) + ")"
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    return data;
}

async function readSocialsFromSQL(alumniID) {
    console.log("readSocialsFromSQL");
    console.log("AID: " + alumniID);
    console.log("EAID: " + mysql.escape(alumniID));
    let query = "SELECT * FROM " + TABLE_SOCIALS + " WHERE " +
        "(alumni_id = " + mysql.escape(alumniID) + ")"
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    if (data == undefined) {
        return undefined;
    }
    return data[0];
}

async function updateSocialsToSQL(alumniID, socials) {
    let columns = updateSocialColumns;
    let query = constructSQLUpdateQuery("alumni_id", alumniID, columns, socials, TABLE_SOCIAL);
    // console.log("query: \n" + query);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function writeSocialsToSQL(alumniID, socials) {
    let columns = writeSocialColumns;
    socials.alumni_id = alumniID;

    let result = writeDataToSQL(columns, socials, TABLE_SOCIAL);
    console.log("query: \n" + query);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function readSocialsFromSQL(alumniID) {
    // console.log("almID:");
    // console.log(mysql.escape(alumniID));
    // console.log(parseInt(mysql.escape(alumniID)));
    let query = "SELECT * FROM " + TABLE_SOCIAL + " WHERE " +
        "(alumni_id = " + alumniID + ")"
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    if (data == undefined) {
        return undefined;
    }
    return data;
}

async function updateSocialsToSQL(alumniID, socials) {
    let columns = updateSocialColumns;
    let query = constructSQLUpdateQuery("alumni_id", alumniID, columns, socials, TABLE_SOCIAL);
    // console.log("query: \n" + query);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function writeSocialsToSQL(alumniID, socials) {
    let columns = writeSocialColumns;
    let values = [
        [
            alumniID,
            socials[0]
        ]
    ]
    // console.log(columns);
    // console.log(values);
    let result = await writeDataToSQL(columns, values, TABLE_SOCIAL);
    // console.log("result: \n" + result);
    // let queryResult = await sqlModule.makeQuery({ query: query });
    return result;
}

async function readDescriptionFromSQL(alumniID) {
    let query = "SELECT * FROM " + TABLE_DESCRIPTION + " WHERE " +
        "(alumni_id = " + mysql.escape(alumniID) + ")"
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    // console.log(data);
    if (data == undefined) {
        return undefined;
    }
    return data[0];
}

async function updateDescriptionToSQL(alumniID, description) {
    let columns = updateDescriptionColumns;
    let values = [
        description
    ];
    let query = constructSQLUpdateQuery("alumni_id", alumniID, columns, values, TABLE_DESCRIPTION);
    // console.log("query: \n" + query);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function writeDescriptionToSQL(alumniID, description) {
    let columns = allDescriptionColumns;
    let values = [
        [
            null,
            alumniID,
            description
        ]
    ]
    // console.log(columns);
    // console.log(values);
    let result = await writeDataToSQL(columns, values, TABLE_DESCRIPTION);
    // console.log("result: \n" + result);
    // let queryResult = await sqlModule.makeQuery({ query: query });
    return result;
}

async function readAlumniDataWithFilter(nameFilter, yearFilters, academyFilters) {
    let query = constructSQLReadQuery(readPublicAlumniColumns);
    // console.log("query: " + query);
    // console.log("year or: " + yearOr);
    // console.log("academy or: " + academyOr);
    query += " INNER JOIN Academy" 
    if ((yearFilters.length + academyFilters.length + nameFilter.length) > 0) {
        query += " WHERE ";
    } 
    if (nameFilter.length > 0) {
        nameFilter = mysql.escape(nameFilter);
        query += ` (Alumni.first_name LIKE ${nameFilter}` + `% OR Alumni.last_name LIKE ${nameFilter}` + `%)`;
    }
    if (yearFilters.length > 0) {
        if (nameFilter.length > 0) {
            query += " AND ";
        }
        let yearOr = constructSQLOrSequence("Alumni.graduation_year", yearFilters);
        query += yearOr;
    }
    if (academyFilters.length > 0) {
        if ((yearFilters.length > 0) || (nameFilter.length > 0)) {
            query += " AND ";
        }
        let academyOr = constructSQLOrSequence("Academy.academy_name", academyFilters);
        query += "(Alumni.academy_id=Academy.academy_id AND " + academyOr + ")"
    }
    // "WHERE " + yearOr + " AND " + "(Alumni.academy_id=Academy.academy_id AND " + academyOr + ")";
    // console.log("final query: " + query);
    let result = await sqlModule.makeQuery({ query: query });
    return result;
}

async function writeConversation(alumniID, targetID) {
    alumniID = mysql.escape(alumniID);
    targetID = mysql.escape(targetID);
    let checkQuery = "SELECT * FROM " + TABLE_CONVERSATION + 
        " WHERE ((first_id=" + alumniID + " AND second_id=" + targetID + ") OR (first_id=" + targetID + " AND second_id=" + alumniID + "))";

    // console.log(checkQuery);
    let checkResult = await sqlModule.makeQuery({ query: checkQuery });
    if (checkResult.length != 0) {
        return;
    }

    let query = "INSERT INTO " + TABLE_CONVERSATION + "(conversation_id, first_id, second_id) VALUES (null, " + alumniID + ", " + targetID + ")";
    // console.log(query);
    let result = await sqlModule.makeQuery({ query: query });
    return result;
}

async function readAvailableConversations(alumniID) {
    alumniID = mysql.escape(alumniID);
    let query = `SELECT Conversation.conversation_id, Alumni.first_name, Alumni.last_name
    FROM Conversation
    INNER JOIN Alumni ON (
    (Conversation.first_id=Alumni.alumni_id AND Conversation.first_id!=${alumniID})
    OR 
    (Conversation.second_id=Alumni.alumni_id AND Conversation.second_id!=${alumniID})
    )
    WHERE (Conversation.first_id=${alumniID} OR Conversation.second_id=${alumniID})`

    // console.log(query);
    let result = await sqlModule.makeQuery({ query: query });
    // console.log(result);
    return result;
}

async function readSpecificConversation(alumniID, targetID) {
    alumniID = mysql.escape(alumniID);
    targetID = mysql.escape(targetID);
    let query = "SELECT * FROM " + TABLE_CONVERSATION + " WHERE " +
        "(first_id=" + alumniID + " AND second_id=" + targetID + ") OR (second_id=" + targetID + " AND first_id=" + alumniID + ")";
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

module.exports = {
    readAlumniDataFromSQL,
    writeDataToSQL,
    writeMessageToSQL,
    readLastEffectiveSqlAlumniID,
    readLastSqlAlumniID,
    writeAlumniColumns,
    writeSheetsAlumniColumns,
    readPublicAlumniColumns,
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

    readAlumniDataWithFilter,
    writeConversation,
    readAvailableConversations,
    readSpecificConversation,

    readMessageFromSqlByConversation
}