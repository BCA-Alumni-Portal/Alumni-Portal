const sheetsModule = require('../sheetsModule');
const sqlModule = require('../sqlModule');
const databaseSync = require('../databaseSync');

// Remove this after testing messages
const sqlAccess = require('../sqlAccess');

const sharp = require('sharp');

const express = require('express');
const router = express.Router();
const axios = require('axios');

const sourceSheetsID = "1oOohmDEw3R2AU8aHwt9-KWGpFCQSYz08HsGgcXQEDLQ";
const exportSheetsID = "1nCnY_3uG0xUZSx9uSaS9ROFUF9hur70jBrUxFSEnZMY";


// for MySQL
router.post('/getSQLData', async (req, res) => {
    // console.log("getSQLData");

    let additionalSpecifiers = {
        account_id: req.alumniID,
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

router.post('/createSQLData', async (req, res) => {
    // console.log(req)
    // console.log("createSQLData");
    let additionalSpecifiers = {
        account_id: req.body.alumniID,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        graduation_year: req.body.graduationYear,
        email_address: req.body.emailAddress,
        academy_id: req.body.academyID
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

router.post('/updateSQLData', async (req, res) => {
    // console.log("updateSQLData");

    let additionalSpecifiers = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        graduation_year: req.body.graduationYear,
        email_address: req.body.emailAddress,
        academy_id: req.body.academyID
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

    query += " WHERE account_id=" + req.body.alumniID;

    let result = await sqlModule.makeQuery({ query: query });
    res.send(result);
})

// for Google Sheets
router.post('/getGSData', (req, res) => {
    // console.log("getGSData");
    let range = "A1:C5";
    sheetsModule.readSheets({ range: range, sheetID: sourceSheetsID });
    return res.send("Finished reading");
});

router.post('/writeGSData', (req, res) => {
    // console.log("writeGSData");
    sheetsModule.updateSheets({ query: "dummy", sheetID: sourceSheetsID });
    return res.send("Finished writing");
})



router.post('/syncData', (req, res) => {
    console.log("syncData");
    databaseSync.sync(sourceSheetsID);
    return res.send("Finished syncing");
})

router.post('/sendMessageRequest', async (req, res) => {
    // console.log("sendMessage");
    // console.log(req);
    let senderID = req.body.account_id;
    let conversationID = req.body.conversationID;
    let body = req.body.messageBody;
    // console.log(req.body);
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

router.post('/getMessageRequest', async (req, res) => {
    // console.log("getMessage");
    // let senderID = req.body.senderID;
    let conversationID = req.body.conversationID;
    // let result = await sqlAccess.readMessageFromSQLByBothIDs(senderID, receiverID);
    let result = await sqlAccess.readMessageFromSqlByConversation(conversationID);

    // console.log(result);
    return res.send(result);
})

router.get('/getClientID', async (req, res) => {
    // console.log("getClientID Session:");
    // console.log(req.session);
    // console.log("getClientID");
    // console.log(req.body.email);
    // console.log(req);
    let result = await sqlAccess.readClientID(req.query.email);
    // console.log("Client ID: " + result);
    return res.send({ clientID: result });
})

router.post('/updateProfileDataRequest', async (req, res) => {
    // console.log("updateProfileDataRequest");
    // console.log(req);
    let query = req.body;

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

router.post('/readProfileDataRequest', async (req, res) => {
    // console.log("readProfileDataRequest");
    // console.log(req);
    let query = req.body;

    // let email = query.email_address;
    // let clientID = await sqlAccess.readClientID(email);
    let clientID = query.account_id;
    let result = await sqlAccess.readProfileInfoFromSQL(clientID);

    if (result == undefined) {
        console.log("Unable to get profileInfo for id <" + clientID + ">");
        return;
    }

    result[0].academy = await sqlAccess.getAcademyStringFromID(result[0].academy_id);

    return res.send(result[0]);
})

router.post('/readProfileDataRequestByID', async (req, res) => {
    // console.log("readProfileDataRequestByID");
    // console.log(req);
    let query = req.body;
    // console.log(query);

    let targetID = query.target_id;
    let result = await sqlAccess.readProfileInfoFromSQL(targetID);

    if (result[0] == undefined) {
        console.log(result);
        console.log("Unable to get result for readProfileDataRequestByID");
        return;
    }
    result[0].academy = await sqlAccess.getAcademyStringFromID(result[0].academy_id);

    return res.send(result[0]);
})



router.post('/readSocialsRequest', async (req, res) => {
    // console.log("readSocialsRequest");

    let query = req.body;

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

router.post('/readSocialsRequestByID', async (req, res) => {
    // console.log("readSocialsRequest");

    let query = req.body;

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

router.post('/updateSocialsRequest', async (req, res) => {
    // console.log("updateSocialsRequest");

    let query = req.body;

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

router.post('/readDescriptionRequest', async (req, res) => {
    // console.log("readDescriptionRequest");

    let query = req.body;

    // let email = query.email_address;
    // let clientID = await sqlAccess.readClientID(email);
    let clientID = query.account_id;
    let result = await sqlAccess.readDescriptionFromSQL(clientID);
    return res.send(result);
})


router.post('/readDescriptionRequestByID', async (req, res) => {
    // console.log("readDescriptionRequest");

    let query = req.body;

    let clientID = query.account_id;
    let result = await sqlAccess.readDescriptionFromSQL(clientID);
    return res.send(result);
})



// const express = require('express');
// const app = express();
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// const checkJwt = (data) => {
//     console.log(data);
//     auth({
//         audience: 'dev-f59msytf.us.auth0.com',
//         issuerBaseURL: `https://dev-f59msytf.us.auth0.com/`,
//     })(data);
// };

const checkJwt = auth({
    audience: 'https://academies-alumni-server-api',
    issuerBaseURL: `https://dev-f59msytf.us.auth0.com/`,
});

// This route needs authentication
// app.get('/api/private', checkJwt, function (req, res) {
//     res.json({
//         message: 'Hello from a private endpoint! You need to be authenticated to see this.'
//     });
// });


router.post('/updateDescriptionRequest', checkJwt, async (req, res) => {
    // console.log("updateDescriptionRequest");

    let query = req.body;

    // let email = query.email_address;
    // let clientID = await sqlAccess.readClientID(email);
    let clientID = query.account_id;
    let accessToken = query.access_token;

    // var webAuth = new auth0.WebAuth({
    //     domain:       'dev-f59msytf.us.auth0.com',
    //     clientID:     '26xeGjN92uf2j0WDsB4GSV3S01Q39Keh'
    // });
    var options = {
        method: 'GET',
        url: "https://dev-f59msytf.us.auth0.com/userinfo",
        headers: {'content-type': 'application/json', authorization: 'Bearer ' + accessToken},
        clientID: process.env.AUTH0_CLIENT_ID
    };

    // let check = axios.get("https://dev-f59msytf.us.auth0.com/userinfo", options).then(res => {
    //     let data = res.data;
    //     console.log(url);
    //     console.log(data);
    //     // console.log(func);
    //     // if ((func != null) && (data != null)) {
    //     //     func(data);
    //     // }
    //     return data;
    // }).catch(err => {
    //     console.log("Error has occurred when trying to get user data:");
    //     console.log(err);
    // });
    
    // let data = await check;
    // console.log("done");

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

router.post('/syncMissingData', async (req, res) => {
    // console.log("syncMissingData");
    let result = await databaseSync.sync(sourceSheetsID);
    return res.send(result);
})

router.post('/exportData', async (req, res) => {
    // console.log("exportData");
    let result = await databaseSync.exportSqlToSheets(exportSheetsID);
    return res.send(result);
})

router.post('/getConversationsRequest', async (req, res) => {
    // console.log("getConversationsRequest");

    let query = req.body;

    // let email = query.email;
    // // console.log(email);
    // let clientID = await sqlAccess.readClientID(email);
    let clientID = query.account_id;
    // console.log(clientID);
    let result = await sqlAccess.readAvailableConversations(clientID);
    // console.log(result);
    return res.send(result);
})

router.post('/getPeopleList', async (req, res) => {
    let query = req.body;
    let nameFilter = query.name_filter || "";
    let yearFilters = query.year_filter || [];
    let academyFilters = query.academy_filter || [];
    // console.log("getPeopleList");
    // console.log(req);
    // console.log(query);
    // console.log(nameFilter);
    // console.log(yearFilters);
    // console.log(academyFilters);

    let result = await sqlAccess.readAlumniDataWithFilter(nameFilter, yearFilters, academyFilters);

    // console.log(result)
    return res.send(result);
})

router.post('/createConversation', async (req, res) => {
    let query = req.body;
    let clientID = query.account_id;
    let targetID = query.targetID;

    let result = await sqlAccess.writeConversation(clientID, targetID);
    return res.send(result);
})

router.post('/getProfilePicture', async (req, res) => {
    let query = req.body;
    let alumniID = query.account_id;

    let result = await sqlAccess.readProfilePictureFromSQL(alumniID);
    return res.send(result);
})

router.post('/writeProfilePicture', async (req, res) => {
    let query = req.body;
    let alumniID = query.account_id;
    let image = query.image;

    let result = await sqlAccess.writeProfilePictureFromSQL(alumniID, image);
    return res.send(result);
})

// var Tokens = require('csrf');
// let tokens = new Tokens();

// router.post('/getCSRF', async (req, res) => {
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
    // console.log(req.csrfToken());
    // console.log(req.csrfToken());
    return res.json({ CSRFToken: req.csrfToken() });
});

module.exports = router;