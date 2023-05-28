import axios from 'axios';

const axiosCookieJarSupport = require('axios-cookiejar-support');
const tough = require('tough-cookie');
// console.log(axiosCookieJarSupport);
// axiosCookieJarSupport(axios);

const LINK_HEADER = "/api/";

let clientID = -1;
let accessToken;
let axiosInstance;
let adminStatus;

async function getClientID() {
    if (clientID != -1) {
        return clientID;
    }
    // console.log("called requestClientID");
    let email;

    await axios.get('/auth/current-session').then(({ data }) => {
        // console.log("got email: <" + data.email + ">");
        // console.log("auth data:")
        // console.log(data);
        email = data.email;
        accessToken = data.access_token;
    })
    // console.log("getClientID - email: " + email);
    let result = axios.get(LINK_HEADER + "getClientID", { params: { email: email } }).then(res => {
        let data = res.data.clientID;
        // console.log("<CH> clientID: " + res.data.clientID);
        clientID = data;
        // setClientID(data);
        // getName();
        // setClientName(user.first_name + " " + user.last_name);
    });
    await result;
    // console.log("after await: " + clientID);
    return clientID;
}

async function getCSRF() {
    if (axiosInstance != undefined) {
        return axiosInstance;
    }

	let cookieJar = new tough.CookieJar();

	let instance = await axios.create({
		jar:cookieJar,
		withCredentials: true
		// httpsAgent: new https.Agent({ rejectUnauthorized: false, requestCert: true, keepAlive: true})
	});
	// let res = await instance.get(LINK_HEADER + "getCSRF");
	// // console.log(res.locals.csrf);
    // console.log(res);
    // let token = res.data.csrf_token;

    // const csrfToken = document.querySelector("meta[name=csrf-token]").content
    // console.log("csrfToken: " + csrfToken);

    const getCSRFToken = async () => {
        const response = await axios.get(LINK_HEADER + 'getCSRFToken');
        let token = response.data.CSRFToken;
        instance.defaults.headers.post['X-CSRF-Token'] = token;
        // console.log(token);
    };

    await getCSRFToken();

    // instance.defaults.headers.common = {
    //     'X-Requested-With': 'XMLHttpRequest',
    //     'X-CSRF-TOKEN' : token,
    //     // 'CSRF-TOKEN' : token,
    //     // 'xsrfCookieName' : token
    // };

	// instance.defaults.headers['x-csrf-token'] = token;
    // console.log(axios.defaults.headers);

	// res = await instance.post('https://172.16.220.133/login',{username:name,password:pass});
    axiosInstance = instance;
    return instance;
}

function getClientIDImmediate() {
    return clientID;
}

async function makeRequest(url, params={}, func) {
    let id = await getClientID();
    if (id == undefined) {
        console.log("Undefined client ID, will not send request");
        return;
    }
    params.account_id = id;
    let instance = await getCSRF();
    // console.log(instance);
    // console.log(LINK_HEADER + url);
    // console.log(params);

    // accessToken = auth0.getAccessTokenSilently();
    // console.log(accessToken);

    var options = {
        method: 'POST',
        url: LINK_HEADER + url,
        headers: {'content-type': 'application/json', authorization: 'Bearer ' + accessToken}
    };
    params.access_token = accessToken;
    
    // axios.request(options).then(function (response) {
    //     console.log(response.data);
    // }).catch(function (error) {
    //     console.error(error);
    // });

    let result = instance.post(LINK_HEADER + url, params, options).then(res => {
        let data = res.data;
        // console.log(url);
        // console.log(data);
        // console.log(func);
        if ((func != null) && (data != null)) {
            func(data);
        }
        return data;
    });
    return result;
}

async function getSocialsInfoByID(dataFunction, id) {
    let data = { target_id: id };
    let result = makeRequest("readSocialsRequestByID", data, dataFunction);
}

async function getDescriptionByID(dataFunction, id) {
    let data = { target_id: id || await getClientID() };
    let result = makeRequest("readDescriptionRequestByID", data, dataFunction);
}

async function writeDescription(description) {
    let data = { description: description };
    let result = makeRequest("updateDescriptionRequest", data);
}

async function getProfileDataByID(dataFunction, id) {
    let data = { target_id: id || await getClientID() };
    let result = makeRequest("readProfileDataRequestByID", data, dataFunction);
}

async function writeProfileData(data) {
    let result = makeRequest("updateProfileDataRequest", data);
}

async function writeVisibility(data){
    let result = makeRequest('updateVisibilityRequest', data);
}

async function writeAdmin(data){
    let result = makeRequest('updateAdminRequest', data);
}

async function writeSocialsInfo(data) {
    let result = makeRequest("updateSocialsRequest", data);
}

async function getMessages(dataFunction, conversationID) {
    let data = { conversationID: conversationID };
    let result = makeRequest("getMessageRequest", data, dataFunction);
}

async function writeMessage(conversationID, messageBody) {
    let data = { conversationID: conversationID, messageBody: messageBody };
    let result = makeRequest("sendMessageRequest", data);
}

async function createConversationConnection(conversationID, onOpenFunction, onMessageFunction) {
    let onOpenData = { conversationID: conversationID };
    // let socket = new WebSocket("ws://localhost:5001");
    let socket = new WebSocket('ws://' + window.location.hostname + ':5001');

    socket.onopen = function (e) {
        // alert("[open] Connection established");
        // alert("Sending to server");
        // socket.send(onOpenData.toString());
        socket.send(JSON.stringify(onOpenData));
        onOpenFunction(socket);
    };

    // socket.onmessage = function (event) {
    //     alert(`[message] Data received from server: ${event.data}`);
    // };
    socket.onmessage = onMessageFunction

    // socket.onclose = function (event) {
    //     if (event.wasClean) {
    //         alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    //     } else {
    //         // e.g. server process killed or network down
    //         // event.code is usually 1006 in this case
    //         alert('[close] Connection died');
    //     }
    // };

    socket.onerror = function (error) {
        // alert(`[error]`);
        console.log(error);
    };

    return socket;
}

async function getConversations(dataFunction) {
    let result = makeRequest("getConversationsRequest", {}, dataFunction);
}

async function writeConversation(otherID) {
    let data = {
        targetID: otherID
    }
    let result = makeRequest("createConversation", data);
}

async function getPeopleList(dataFunction, data) {
    let result = makeRequest("getPeopleList", data, dataFunction);
}

async function getProfilePicture(dataFunction, id) {
    let data = { target_id: id }
    let result = makeRequest("getProfilePicture", data, dataFunction);
}

async function getProfilePictureByID(dataFunction, id) {
    let data = { target_id: id }
    let result = makeRequest("getProfilePictureByID", data, dataFunction);
}

async function writeProfilePicture(picture) {
    let data = {
        image: picture
    }
    let result = makeRequest("writeProfilePicture", data);
}

async function syncMissingData() {
    let result = makeRequest("syncData");
}

async function exportData() {
    let result = makeRequest("exportData");
}

async function isAdmin() {
    if (adminStatus != undefined) {
        return adminStatus;
    }
    let result = await makeRequest("isAdmin");
    adminStatus = result.is_admin == 1;
    return adminStatus;
}

function getIsAdminStatus() {
    return adminStatus;
}

async function archiveUser(targetID) {
    let data = {
        target_id: targetID
    }
    let result = await makeRequest("archiveUser", data);
}

export default {
    getClientID,
    getClientIDImmediate,

    getSocialsInfoByID,
    writeSocialsInfo,

    getDescriptionByID,
    writeDescription,

    getProfileDataByID,
    writeProfileData,

    getMessages,
    writeMessage,
    createConversationConnection,

    getConversations,
    writeConversation,

    getPeopleList,

    getProfilePicture,
    getProfilePictureByID,
    writeProfilePicture,

    syncMissingData,
    exportData,

    isAdmin,
    getIsAdminStatus,
    
    writeVisibility,
    writeAdmin,

    archiveUser
}