const sheetsModule = require('./sheetsModule');
const sqlModule = require('./sqlModule');
const databaseSync = require('./databaseSync');

// Remove this after testing messages
const sqlAccess = require('./sqlAccess');

const express = require('express');
const cors = require('cors');
const { auth, requiresAuth } = require('express-openid-connect');
const fs = require('fs');

const app = express();
const port = 5000;

const sourceSheetsID = "1oOohmDEw3R2AU8aHwt9-KWGpFCQSYz08HsGgcXQEDLQ";
const exportSheetsID = "1nCnY_3uG0xUZSx9uSaS9ROFUF9hur70jBrUxFSEnZMY";

app.use(cors());
app.use(express.json())

app.get('/hello', (req, res) => res.send("hello"));

// for MySQL
app.get('/getSQLData', async (req, res) => {
    // console.log("getSQLData");

    let additionalSpecifiers = {
        alumni_id: req.alumniID,
        first_name: req.firstName,
        last_name: req.lastName,
        graduation_year: req.graduationYear,
        email_address: req.emailAddress,
        academy_id: req.academyID
    }

    let query = "SELECT * FROM Alumni ";

    let first = true;

    for (key in additionalSpecifiers) {
        let specifier = additionalSpecifiers[key];
        if (specifier != undefined) {
            if (first) {
                first = false;
                query += "WHERE ";
            } else {
                query += "AND ";
            }
            query += key + "=" + additionalSpecifiers[key];
        }
    }

    let result = await sqlModule.makeQuery({ query: query });
    res.send(result);
});

app.get('/createSQLData', async (req, res) => {
    // console.log(req)
    // console.log("createSQLData");
    let additionalSpecifiers = {
        alumni_id: req.query.alumniID,
        first_name: req.query.firstName,
        last_name: req.query.lastName,
        graduation_year: req.query.graduationYear,
        email_address: req.query.emailAddress,
        academy_id: req.query.academyID
    }

    let query = "INSERT INTO Alumni (";

    let first = true;
    for (key in additionalSpecifiers) {
        let specifier = additionalSpecifiers[key];
        if (specifier != undefined) {
            if (first) {
                first = false;
            } else {
                query += ", ";
            }
            query += key
        }
    }
    query += ") VALUES (";

    first = true;

    for (key in additionalSpecifiers) {
        let specifier = additionalSpecifiers[key];
        if (specifier != undefined) {
            if (first) {
                first = false;
            } else {
                query += ", ";
            }
            query += '"' + additionalSpecifiers[key] + '"';
        }
    }

    query += ");";

    let result = await sqlModule.makeQuery({ query: query });
    res.send(result);
})

app.get('/updateSQLData', async (req, res) => {
    // console.log("updateSQLData");

    let additionalSpecifiers = {
        first_name: req.query.firstName,
        last_name: req.query.lastName,
        graduation_year: req.query.graduationYear,
        email_address: req.query.emailAddress,
        academy_id: req.query.academyID
    }

    // additionalSpecifiers = {
    //     first_name: "Johnny2",
    //     last_name: "Doe2",
    //     graduation_year: "19872",
    //     email_address: "jd@gmail.com2",
    //     academy_id: 4
    // }
    // console.log(additionalSpecifiers);

    let query = "UPDATE Alumni ";

    let first = true;

    for (key in additionalSpecifiers) {
        let specifier = additionalSpecifiers[key];
        if (specifier != undefined) {
            if (first) {
                first = false;
                query += "SET ";
            } else {
                query += ", ";
            }
            query += key + "=" + '"' + additionalSpecifiers[key] + '"';
        }
    }

    query += " WHERE alumni_id=" + req.query.alumniID;

    let result = await sqlModule.makeQuery({ query: query });
    res.send(result);
})

// for Google Sheets
app.get('/getGSData', (req, res) => {
    // console.log("getGSData");
    let range = "A1:C5";
    sheetsModule.readSheets({ range: range, sheetID: sourceSheetsID });
    return res.send("Finished reading");
});

app.get('/writeGSData', (req, res) => {
    // console.log("writeGSData");
    sheetsModule.updateSheets({ query: "dummy", sheetID: sourceSheetsID });
    return res.send("Finished writing");
})

app.listen(port, () => {
    console.log(`Listening to port ${port}!`)
})

app.get('/syncData', (req, res) => {
    // console.log("syncData");
    databaseSync.sync(sourceSheetsID);
    return res.send("Finished syncing");
})

app.get('/sendMessageRequest', async (req, res) => {
    // console.log("sendMessage");
    // console.log(req);
    let senderID = req.query.senderID;
    let conversationID = req.query.conversationID;
    let body = req.query.messageBody
    // return {
    //     senderID: clientID,
    //     // receiverID: targetID,
    //     messageBody: messageBody,
    //     conversationID: conversationID
    //   }
    let result = await sqlAccess.writeMessageToSQL(senderID, conversationID, body);
    // console.log(result);
    return res.send("Finished sending");
})

app.get('/getMessageRequest', async (req, res) => {
    // console.log("getMessage");
    // let senderID = req.query.senderID;
    let conversationID = req.query.conversationID;
    // let result = await sqlAccess.readMessageFromSQLByBothIDs(senderID, receiverID);
    let result = await sqlAccess.readMessageFromSqlByConversation(conversationID);

    // console.log(result);
    return res.send(result);
})

app.get('/getClientID', async (req, res) => {
    // console.log("getClientID");
    let result = await sqlAccess.readClientID(req.query.email);
    return res.send({clientID: result});
})

app.get('/updateProfileDataRequest', async (req, res) => {
    // console.log("updateProfileDataRequest");
    // console.log(req);
    let query = req.query;

    let email = query.email_address;
    let clientID = await sqlAccess.readClientID(email);
    let company = query.company;
    let graduationYear = query.graduationYear;
    let pronouns = query.pronouns;
    let academy = query.academy;
    let first_name = query.first_name;
    let last_name = query.last_name;

    let result = await sqlAccess.updateProfileInfoToSQL(clientID, company, graduationYear, pronouns, academy, first_name, last_name);

    return res.send("Finished sending");
})

app.get('/readProfileDataRequest', async (req, res) => {
    // console.log("readProfileDataRequest");
    // console.log(req);
    let query = req.query;

    let email = query.email_address;
    let clientID = await sqlAccess.readClientID(email);
    let result = await sqlAccess.readProfileInfoFromSQL(clientID);

    result[0].academy = await sqlAccess.getAcademyStringFromID(result[0].academy_id);

    return res.send(result[0]);
})

app.get('/readProfileDataRequestByID', async (req, res) => {
    console.log("readProfileDataRequestByID");
    // console.log(req);
    let query = req.query;

    let clientID = query.alumni_id
    let result = await sqlAccess.readProfileInfoFromSQL(clientID);

    result[0].academy = await sqlAccess.getAcademyStringFromID(result[0].academy_id);

    return res.send(result[0]);
})



app.get('/readSocialsRequest', async (req, res) => {
    // console.log("readSocialsRequest");

    let query = req.query;

    let email = query.email_address;
    let clientID = await sqlAccess.readClientID(email);
    let result = await sqlAccess.readSocialsFromSQL(clientID);
    if (result == undefined) {
        return res.send(undefined);
    }
    // console.log(result);
    return res.send(result[0]);
})

app.get('/updateSocialsRequest', async (req, res) => {
    // console.log("updateSocialsRequest");

    let query = req.query;

    let email = query.email_address;
    let clientID = await sqlAccess.readClientID(email);

    let socials = [
        query.linkedin
    ];
    
    let result = await sqlAccess.readSocialsFromSQL(clientID);
    // console.log("result: " + result);
    if (result == undefined) {
        // console.log("writing");
        let result = await sqlAccess.writeSocialsToSQL(clientID, socials);
    } else {
        // console.log("updating");
        let result = await sqlAccess.updateSocialsToSQL(clientID, socials);
    }
    return res.send("Finished updating");
})

app.get('/readDescriptionRequest', async (req, res) => {
    // console.log("readDescriptionRequest");

    let query = req.query;

    let email = query.email_address;
    let clientID = await sqlAccess.readClientID(email);
    let result = await sqlAccess.readDescriptionFromSQL(clientID);
    return res.send(result);
})

app.get('/updateDescriptionRequest', async (req, res) => {
    // console.log("updateDescriptionRequest");

    let query = req.query;

    let email = query.email_address;
    let clientID = await sqlAccess.readClientID(email);

    let description = [
        query.description
    ];
    
    let result = await sqlAccess.readDescriptionFromSQL(clientID);
    // console.log("result: " + result);
    if (result == undefined) {
        // console.log("writing");
        let result = await sqlAccess.writeDescriptionToSQL(clientID, description);
    } else {
        // console.log("updating");
        let result = await sqlAccess.updateDescriptionToSQL(clientID, description);
    }
    return res.send("Finished updating");
})

app.get('/syncMissingData', async (req, res) => {
    // console.log("syncMissingData");
    let result = await databaseSync.sync(sourceSheetsID);
    return res.send(result);
})

app.get('/exportData', async (req, res) => {
    // console.log("exportData");
    let result = await databaseSync.exportSqlToSheets(exportSheetsID);
    return res.send(result);
})

app.get('/getConversationsRequest', async (req, res) => {
    // console.log("getConversationsRequest");
    
    let query = req.query;

    let email = query.email;
    // console.log(email);
    let clientID = await sqlAccess.readClientID(email);
    // console.log(clientID);
    let result = await sqlAccess.readAvailableConversations(clientID);
    // console.log(result);
    return res.send(result);
})

app.get('/getPeopleList', async (req, res) => {
    let query = req.query;
    let yearFilters = query.year_filter || [];
    let academyFilters = query.academy_filter || [];
    // console.log("getPeopleList");
    // console.log(req);
    // console.log(query);
    // console.log(yearFilters);
    // console.log(academyFilters);

    let result = await sqlAccess.readAlumniDataWithFilter(yearFilters, academyFilters);
    
    // console.log(result)
    return res.send(result);
})

console.log("Automatically running here!");
// databaseSync.sync({sheetID: sourceSheetsID});
// databaseSync.exportSqlToSheets(exportSheetsID);
// databaseSync.writeNewEntriesToSQL(sourceSheetsID);

// let sender_id = 3;
// let receiver_id = 4;
// let body = "Message from index.js";
// let result = sqlAccess.writeMessageToSQL(sender_id, receiver_id, body);
// console.log(result);

// let result = sqlAccess.readMessageFromSQLByReceiverID(receiver_id);

// let yearFilters = [
//     1111, 2017, 2004, 2012, 2022
// ];
// let academyFilters = [
//     "\"AMST\"", "\"ATCS\""
// ]
// let test = sqlAccess.readAlumniDataWithFilter(yearFilters, academyFilters);
// console.log(test);

// sqlAccess.writeConversation(0, 1);
// sqlAccess.writeConversation(0, 2);
// sqlAccess.writeConversation(1, 2);
// sqlAccess.readConversation(0);