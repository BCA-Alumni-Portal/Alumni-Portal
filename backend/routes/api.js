const sheetsModule = require('../sheetsModule');
const sqlModule = require('../sqlModule');
const databaseSync = require('../databaseSync');
const passport = require('passport');

// Remove this after testing messages
const sqlAccess = require('../sqlAccess');

const sharp = require('sharp');

const express = require('express');
const router = express.Router();
const axios = require('axios');

const sourceSheetsID = process.env.GS_SOURCE_SHEET;
const exportSheetsID = process.env.GS_EXPORT_SHEET;

router.post('/sendMessageRequest', async (req, res) => {
    await authenticateClient(req, res);
    let senderID = req.body.account_id;
    let conversationID = req.body.conversationID;
    let body = req.body.messageBody;

    let result = await sqlAccess.writeMessageToSQL(senderID, conversationID, body);
    return res.send("Finished sending");
})

router.post('/getMessageRequest', async (req, res) => {
    await authenticateClient(req, res);
    let conversationID = req.body.conversationID;
    let result = await sqlAccess.readMessageFromSqlByConversation(conversationID);

    return res.send(result);
})

router.get('/getClientID', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;
    // console.log("SHOULD NOT BE CALLED!")
    // let result = await sqlAccess.readClientID(req.query.email);

    return res.send(query);
})

async function authenticateClient(req, res) {
    let query = req.body;
    let promise = new Promise(function (resolve, reject) {
        passport.authenticate('jwt', { session: false }, async (err, user) => {
            if (err) {
                reject();
            }
            // console.log(user);
            if (user == null) {
                reject();
            }
            query.account_id = await sqlAccess.readClientID(user.email);
            let adminResult = (await sqlAccess.readIsAdminFromSQL(query.account_id))[0];
            // console.log("here");
            // console.log((await sqlAccess.readIsAdminFromSQL(query.account_id))[0]);
            // console.log(adminResult);
            if (adminResult == undefined) {
                query.is_admin = false;
            } else {
                query.is_admin = (adminResult.is_admin == 1);
            }
            resolve();
        })(req, res);
    });
    
    return promise;
}

router.post('/updateProfileDataRequest', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;

    let clientID = query.account_id;
    let company = query.company;
    let graduationYear = query.graduationYear;
    let pronouns = query.pronouns;
    let academy = query.academy;
    let first_name = query.first_name;
    let last_name = query.last_name;
    let profile_picture = query.profile_picture;

    let result = await sqlAccess.updateProfileInfoToSQL(clientID, company, graduationYear, pronouns, academy, first_name, last_name, profile_picture);
    databaseSync.exportSqlToSheets(sourceSheetsID);
    return res.send("Finished sending");
})

router.post('/updateProfileDataRequestAdmin', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;

    // Make sure the person sending the request is an admin...
    if (!query.is_admin) {
        return;
    }

    let clientID = query.target_id;
    let company = query.company;
    let graduationYear = query.graduationYear;
    let pronouns = query.pronouns;
    let academy = query.academy;
    let first_name = query.first_name;
    let last_name = query.last_name;
    let profile_picture = query.profile_picture;

    let result = await sqlAccess.updateProfileInfoToSQL(clientID, company, graduationYear, pronouns, academy, first_name, last_name, profile_picture);
    databaseSync.exportSqlToSheets(sourceSheetsID);
    return res.send("Finished sending");
})

router.post('/readVisibilityRequest', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;

    let clientID = query.target_id;
    let result = await sqlAccess.readVisibilityFromSQL(clientID);

    return res.send(result[0]);
})

router.post('/updateVisibilityRequest', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;

    let clientID = query.account_id;
    let visibility = query.is_visible;

    let result = await sqlAccess.updateVisibilityToSQL(clientID, visibility);

    return res.send('Finished sending');
})

router.post('/updateVisibilityRequestAdmin', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;

    if (!query.is_admin) {
        return;
    }

    let clientID = query.target_id;
    let visibility = query.is_visible;

    let result = await sqlAccess.updateVisibilityToSQL(clientID, visibility);

    return res.send('Finished sending');
})

router.post('/updateAdminRequest', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;

    if (!query.is_admin) {
        return;
    }

    let clientID = query.account_id;
    let admin = query.is_admin;

    let result = await sqlAccess.updateAdminToSQL(clientID, admin);

    return res.send('Finished sending');
})

router.post('/readProfileDataRequest', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;

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
    await authenticateClient(req, res);
    let query = req.body;

    let targetID = query.target_id;
    let result = await sqlAccess.readProfileInfoFromSQL(targetID);

    if (result[0] == undefined) {
        console.log(result);
        console.log(query);
        console.log("Unable to get result for readProfileDataRequestByID");
        return;
    }
    result[0].academy = await sqlAccess.getAcademyStringFromID(result[0].academy_id);

    return res.send(result[0]);
})

router.post('/readSocialsRequest', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;

    let clientID = query.account_id;
    if (clientID == undefined) {
        console.log("Undefined client ID for email <" + email + ">");
    }

    let result = await sqlAccess.readSocialsFromSQL(clientID);
    if (result == undefined) {
        return res.send(undefined);
    }

    return res.send(result[0]);
})

router.post('/readSocialsRequestByID', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;

    let clientID = query.target_id;
    let result = await sqlAccess.readSocialsFromSQL(clientID);
    if (result == undefined) {
        return res.send(undefined);
    }
    return res.send(result[0]);
})

router.post('/updateSocialsRequest', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;

    let clientID = query.account_id;
    let socials = [
        query.linkedin
    ];

    let result = await sqlAccess.readSocialsFromSQL(clientID);

    if (result[0] == undefined) {
        let result = await sqlAccess.writeSocialsToSQL(clientID, socials);
    } else {
        let result = await sqlAccess.updateSocialsToSQL(clientID, socials);
    }
    return res.send("Finished updating");
})

router.post('/updateSocialsRequestAdmin', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;

    if (!query.is_admin) {
        return;
    }

    let clientID = query.target_id;
    let socials = [
        query.linkedin
    ];

    let result = await sqlAccess.readSocialsFromSQL(clientID);

    if (result[0] == undefined) {
        let result = await sqlAccess.writeSocialsToSQL(clientID, socials);
    } else {
        let result = await sqlAccess.updateSocialsToSQL(clientID, socials);
    }
    return res.send("Finished updating");
})

router.post('/readDescriptionRequest', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;

    let clientID = query.account_id;
    let result = await sqlAccess.readDescriptionFromSQL(clientID);
    return res.send(result);
})

router.post('/readDescriptionRequestByID', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;

    let targetID = query.target_id;
    let result = await sqlAccess.readDescriptionFromSQL(targetID);
    return res.send(result);
})

router.post('/updateDescriptionRequest', async (req, res) => {
    let query = req.body;

    let clientID = query.account_id;
    let accessToken = query.access_token;

    var options = {
        method: 'GET',
        url: "https://dev-f59msytf.us.auth0.com/userinfo",
        headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken },
        clientID: process.env.AUTH0_CLIENT_ID
    };

    let description = [
        query.description
    ];

    let result = await sqlAccess.readDescriptionFromSQL(clientID);
    if (result == undefined) {
        let result = await sqlAccess.writeDescriptionToSQL(clientID, description);
    } else {
        let result = await sqlAccess.updateDescriptionToSQL(clientID, description);
    }
    return res.send("Finished updating");
})

router.post('/updateDescriptionRequestAdmin', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;

    if (!query.is_admin) {
        return;
    }

    let clientID = query.target_id;
    let accessToken = query.access_token;

    var options = {
        method: 'GET',
        url: "https://dev-f59msytf.us.auth0.com/userinfo",
        headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken },
        clientID: process.env.AUTH0_CLIENT_ID
    };

    let description = [
        query.description
    ];

    let result = await sqlAccess.readDescriptionFromSQL(clientID);
    if (result == undefined) {
        let result = await sqlAccess.writeDescriptionToSQL(clientID, description);
    } else {
        let result = await sqlAccess.updateDescriptionToSQL(clientID, description);
    }
    return res.send("Finished updating");
})

router.post('/syncMissingData', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;
    if (!query.is_admin) {
        return;
    }
    let result = await databaseSync.sync(sourceSheetsID);
    return res.send(result);
})

router.post('/exportData', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;
    if (!query.is_admin) {
        return;
    }
    let result = await databaseSync.exportSqlToSheets(exportSheetsID);
    return res.send(result);
})

router.post('/getConversationsRequest', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;

    let clientID = query.account_id;
    let result = await sqlAccess.readAvailableConversations(clientID);

    return res.send(result);
})

router.post('/getPeopleList', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;
    let nameFilter = query.name_filter || "";
    let yearFilters = query.year_filter || [];
    let academyFilters = query.academy_filter || [];
    let clientID = query.account_id;

    let result = await sqlAccess.readAccountsDataWithFilter(clientID, nameFilter, yearFilters, academyFilters);

    return res.send(result);
})

router.post('/createConversation', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;
    let clientID = query.account_id;
    let targetID = query.targetID;

    let result = await sqlAccess.writeConversation(clientID, targetID);
    return res.send(result);
})

router.post('/getProfilePicture', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;
    let accountsID = query.account_id;

    let result = await sqlAccess.readProfilePictureFromSQL(accountsID);
    return res.send(result[0].profile_picture);
})

router.post('/getProfilePictureByID', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;
    let accountsID = query.target_id;

    let result = await sqlAccess.readProfilePictureFromSQL(accountsID);
    return res.send(result[0].profile_picture);
})

router.post('/writeProfilePicture', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;
    let accountsID = query.account_id;
    let image = query.image;
    // console.log(accountsID);

    let result = await sqlAccess.writeProfilePictureToSQL(accountsID, image);
    return res.send(result);
})

router.post('/isAdmin', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;
    console.log("isAdmin " + query);
    return res.send(query);
})

router.post('/archiveUser', async (req, res) => {
    await authenticateClient(req, res);
    let query = req.body;
    if (!query.is_admin) {
        return;
    }
    let accountsID = query.account_id;
    let targetID = query.target_id;

    let result = await sqlAccess.archiveUserInSQL(targetID);
    console.log("Archived user with ID: " + targetID);
    return
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

router.get('/getCSRFToken', async (req, res) => {
    await authenticateClient(req, res);
    // console.log(req.csrfToken());
    // console.log(req.csrfToken());
    return res.json({ CSRFToken: req.csrfToken() });
});

module.exports = router;