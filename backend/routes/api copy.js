const sheetsModule = require('../sheetsModule');
const sqlModule = require('../sqlModule');
const databaseSync = require('../databaseSync');

// Remove this after testing messages
const sqlAccess = require('../sqlAccess');

const express = require('express');
const router = express.Router();

const sourceSheetsID = "1oOohmDEw3R2AU8aHwt9-KWGpFCQSYz08HsGgcXQEDLQ";
const exportSheetsID = "1nCnY_3uG0xUZSx9uSaS9ROFUF9hur70jBrUxFSEnZMY";


// for MySQL
router.get('/getSQLData', async (req, res) => {
    // console.log("getSQLData");

    let additionalSpecifiers = {
        account_id: req.accountsID,
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

router.get('/createSQLData', async (req, res) => {
    // console.log(req)
    // console.log("createSQLData");
    let additionalSpecifiers = {
        account_id: req.query.accountsID,
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

router.get('/updateSQLData', async (req, res) => {
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

    query += " WHERE account_id=" + req.query.accountsID;

    let result = await sqlModule.makeQuery({ query: query });
    res.send(result);
})

// for Google Sheets
router.get('/getGSData', (req, res) => {
    // console.log("getGSData");
    let range = "A1:C5";
    sheetsModule.readSheets({ range: range, sheetID: sourceSheetsID });
    return res.send("Finished reading");
});

router.get('/writeGSData', (req, res) => {
    // console.log("writeGSData");
    sheetsModule.updateSheets({ query: "dummy", sheetID: sourceSheetsID });
    return res.send("Finished writing");
})



router.get('/syncData', (req, res) => {
    // console.log("syncData");
    databaseSync.sync(sourceSheetsID);
    return res.send("Finished syncing");
})

router.get('/sendMessageRequest', async (req, res) => {
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

router.get('/getMessageRequest', async (req, res) => {
    // console.log("getMessage");
    // let senderID = req.query.senderID;
    let conversationID = req.query.conversationID;
    // let result = await sqlAccess.readMessageFromSQLByBothIDs(senderID, receiverID);
    let result = await sqlAccess.readMessageFromSqlByConversation(conversationID);

    // console.log(result);
    return res.send(result);
})

router.get('/getClientID', async (req, res) => {
    console.log("getClientID Session:");
    console.log(req.session);
    // console.log("getClientID");
    // console.log(req.query.email);
    let result = await sqlAccess.readClientID(req.query.email);
    // console.log("Client ID: " + result);
    return res.send({ clientID: result });
})

router.get('/updateProfileDataRequest', async (req, res) => {
    // console.log("updateProfileDataRequest");
    // console.log(req);
    let query = req.query;

    // let email = query.email_address;
    // let clientID = await sqlAccess.readClientID(email);
    let clientID = query.account_id;
    let company = query.company;
    let graduationYear = query.graduationYear;
    let pronouns = query.pronouns;
    let academy = query.academy;
    let first_name = query.first_name;
    let last_name = query.last_name;

    let result = await sqlAccess.updateProfileInfoToSQL(clientID, company, graduationYear, pronouns, academy, first_name, last_name);

    return res.send("Finished sending");
})

router.get('/readProfileDataRequest', async (req, res) => {
    // console.log("readProfileDataRequest");
    // console.log(req);
    let query = req.query;

    // let email = query.email_address;
    // let clientID = await sqlAccess.readClientID(email);
    let clientID = query.account_id;
    let result = await sqlAccess.readProfileInfoFromSQL(clientID);

    result[0].academy = await sqlAccess.getAcademyStringFromID(result[0].academy_id);

    return res.send(result[0]);
})

router.get('/readProfileDataRequestByID', async (req, res) => {
    // console.log("readProfileDataRequestByID");
    // console.log(req);
    let query = req.query;

    let clientID = query.account_id
    let result = await sqlAccess.readProfileInfoFromSQL(clientID);

    result[0].academy = await sqlAccess.getAcademyStringFromID(result[0].academy_id);

    return res.send(result[0]);
})



router.get('/readSocialsRequest', async (req, res) => {
    // console.log("readSocialsRequest");

    let query = req.query;

    // let email = query.email_address;
    // let clientID = await sqlAccess.readClientID(email);
    let clientID = query.account_id;
    if (clientID == undefined) {
        console.log("Undefined client ID for email <" + email + ">");
    }
    let result = await sqlAccess.readSocialsFromSQL(clientID);
    if (result == undefined) {
        return res.send(undefined);
    }
    // console.log(result);
    return res.send(result[0]);
})

router.get('/readSocialsRequestByID', async (req, res) => {
    // console.log("readSocialsRequest");

    let query = req.query;

    let clientID = query.account_id || 0;
    let result = await sqlAccess.readSocialsFromSQL(clientID);
    // console.log("rSRBID_1");
    // console.log(req);
    // console.log(query);
    // console.log(clientID);
    // console.log(result);
    if (result == undefined) {
        return res.send(undefined);
    }
    return res.send(result[0]);
})

router.get('/updateSocialsRequest', async (req, res) => {
    // console.log("updateSocialsRequest");

    let query = req.query;

    // let email = query.email_address;
    // let clientID = await sqlAccess.readClientID(email);

    let clientID = query.account_id;
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

router.get('/readDescriptionRequest', async (req, res) => {
    // console.log("readDescriptionRequest");

    let query = req.query;

    // let email = query.email_address;
    // let clientID = await sqlAccess.readClientID(email);
    let clientID = query.account_id;
    let result = await sqlAccess.readDescriptionFromSQL(clientID);
    return res.send(result);
})


router.get('/readDescriptionRequestByID', async (req, res) => {
    // console.log("readDescriptionRequest");

    let query = req.query;

    let clientID = query.account_id;
    let result = await sqlAccess.readDescriptionFromSQL(clientID);
    return res.send(result);
})

router.get('/updateDescriptionRequest', async (req, res) => {
    // console.log("updateDescriptionRequest");

    let query = req.query;

    // let email = query.email_address;
    // let clientID = await sqlAccess.readClientID(email);
    let clientID = query.account_id;

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

router.get('/syncMissingData', async (req, res) => {
    // console.log("syncMissingData");
    let result = await databaseSync.sync(sourceSheetsID);
    return res.send(result);
})

router.get('/exportData', async (req, res) => {
    // console.log("exportData");
    let result = await databaseSync.exportSqlToSheets(exportSheetsID);
    return res.send(result);
})

router.get('/getConversationsRequest', async (req, res) => {
    // console.log("getConversationsRequest");

    let query = req.query;

    // let email = query.email;
    // // console.log(email);
    // let clientID = await sqlAccess.readClientID(email);
    let clientID = query.account_id;
    // console.log(clientID);
    let result = await sqlAccess.readAvailableConversations(clientID);
    // console.log(result);
    return res.send(result);
})

router.get('/getPeopleList', async (req, res) => {
    let query = req.query;
    let nameFilter = query.name_filter || "";
    let yearFilters = query.year_filter || [];
    let academyFilters = query.academy_filter || [];
    // console.log("getPeopleList");
    // console.log(req);
    console.log(query);
    console.log(nameFilter);
    console.log(yearFilters);
    console.log(academyFilters);

    let result = await sqlAccess.readAlumniDataWithFilter(nameFilter, yearFilters, academyFilters);

    // console.log(result)
    return res.send(result);
})

router.get('/createConversation', async (req, res) => {
    let query = req.query;
    let clientID = query.clientID;
    let targetID = query.targetID;

    let result = await sqlAccess.writeConversation(clientID, targetID);
    return res.send(result);
})

router.get('/getProfilePicture', async (req, res) => {
    let query = req.query;
    let accountsID = query.account_id;

    let result = await sqlAccess.readProfilePictureFromSQL(accountsID);
    return res.send(result);
})

router.get('/writeProfilePicture', async (req, res) => {
    let query = req.query;
    let accountsID = query.account_id;
    let image = query.image;

    let result = await sqlAccess.writeProfilePictureFromSQL(accountsID, image);
    return res.send(result);
})

// var Tokens = require('csrf');
// let tokens = new Tokens();

// router.get('/getCSRF', async (req, res) => {
//     var secret = tokens.secretSync();
//     var token = tokens.create(secret);
//     let result = {
//         csrf_token: token
//     };
//     console.log("Token:");
//     console.log(token);
//     console.log(res.locals);
//     res.cookie('XSRF-TOKEN', token);
//     res.locals.csrf = token;
//     console.log(res.locals);
//     console.log(result);
//     return res.send(result);
// })

router.get('/getCSRFToken', (req, res) => {
    console.log(req.csrfToken());
    console.log(req.csrfToken());
    return res.json({ CSRFToken: req.csrfToken() });
});

module.exports = router;