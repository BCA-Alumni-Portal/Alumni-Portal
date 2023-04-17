import axios from 'axios';

const LINK_HEADER = "/api/";

let clientID = -1;

async function getClientID() {
    if (clientID != -1) {
        return clientID;
    }
    // console.log("called requestClientID");
    let email;

    await axios.get('/auth/current-session').then(({ data }) => {
        // console.log("got email: <" + data.email + ">");
        email = data.email;
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

async function getSocialsInfoByID(dataFunction, id) {
    if (id == undefined) {
        id = await getClientID();
    }
    let data = { alumni_id: id };
    let result = axios.get(LINK_HEADER + "readSocialsRequestByID", { params: data }).then(res => {
        let data = res.data;
        // console.log(data);
        if (data != null) {
            dataFunction(data);
        }
        return undefined;
    });
}

async function getDescriptionByID(dataFunction, id) {
    if (id == undefined) {
        id = await getClientID();
    }
    let data = { alumni_id: id };
    let result = axios.get(LINK_HEADER + "readDescriptionRequest", { params: data }).then(res => {
        let data = res.data;
        // console.log(res);
        // console.log(data);
        if (data != null) {
            dataFunction(data);
        }
    });
}

async function writeDescription(description) {
    let id = await getClientID();
    let data = { alumni_id: id, description: description };
    let result = axios.get(LINK_HEADER + "updateDescriptionRequest", { params: data }).then(res => {

    });
}

async function getProfileDataByID(dataFunction, id) {
    if (id == undefined) {
        id = await getClientID();
    }
    let data = { alumni_id: id };

    let result = axios.get(LINK_HEADER + "readProfileDataRequestByID", { params: data }).then(res => {
        let data = res.data;
        if (data != null) {
            dataFunction(data);
        }
    });
}

async function writeProfileData(data) {
    data.alumni_id = await getClientID();

    let result = axios.get(LINK_HEADER + "updateProfileDataRequest", { params: data }).then(res => {
        let data = res.data;
        // console.log(data);
        if (data != null) {

        }
    });
}

async function writeSocialsInfo(data) {
    data.alumni_id = await getClientID();

    let result = axios.get(LINK_HEADER + "updateSocialsRequest", { params: data }).then(res => {

    });
}

async function getMessages(dataFunction, conversationID) {
    // const submitGetMessageRequest = () => {
    // const data = packGetData();
    // console.log(data);
    let data = { conversationID: conversationID };
    let result = axios.get(LINK_HEADER + "getMessageRequest", { params: data }).then(res => {
        let resultData = res.data;
        if (resultData != null) {
            dataFunction(resultData);
        }
    });
    // }
}

async function writeMessage(conversationID, messageBody) {
    let id = await getClientID();
    let data = { senderID: id, conversationID: conversationID, messageBody: messageBody };
    axios.get(LINK_HEADER + "sendMessageRequest", { params: data }).then(res => console.log(res)).catch((err) => {

    });
}

// async function writeMessage(chatSocket, messageBody) {
//     let id = await getClientID();
//     let data = { senderID: id, messageBody: messageBody }
//     chatSocket.send(JSON.stringify(data));
// }

async function createConversationConnection(conversationID, onOpenFunction, onMessageFunction) {
    let id = await getClientID();
    let onOpenData = { senderID: id, conversationID: conversationID };
    // let socket = new WebSocket("ws://localhost:8080");
    let socket = new WebSocket('ws://' + window.location.hostname + ':8080');

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
    let id = await getClientID();
    let data = { alumni_id: id };
    axios.get(LINK_HEADER + "getConversationsRequest", { params: data }).then(res => {
        let data = res.data;
        // console.log(data);
        if (data != null) {
            dataFunction(data);
        }
    });
}

async function writeConversation(otherID) {
    let data = {
        clientID: await getClientID(),
        targetID: otherID
    }
    let result = axios.get(LINK_HEADER + "createConversation", { params: data }).then(res => {

    });
}

async function getPeopleList(dataFunction, data) {
    let result = axios.get(LINK_HEADER + "getPeopleList", { params: data }).then(res => {
        let data = res.data;
        if (data != null) {
            dataFunction(data);
        }
    });
}

async function getProfilePicture(dataFunction, id) {
    let data = { alumni_id: id };
    axios.get(LINK_HEADER + "getProfilePicture", { params: data }).then(res => {
        let data = res.data;
        // console.log(data);
        if (data != null) {
            dataFunction(data);
        }
    });
}

async function writeProfilePicture(picture) {
    let data = {
        clientID: await getClientID(),
        image: picture
    }
    let result = axios.get(LINK_HEADER + "writeProfilePicture", { params: data }).then(res => {

    });
}

export default {
    getClientID,

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
    writeProfilePicture
}