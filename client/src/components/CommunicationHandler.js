import axios from 'axios';

const LINK_HEADER = "/api/";

let clientID = -1;

async function getClientID() {
    if (clientID != -1) {
        console.log("cached id");
        console.log(clientID);
        return clientID;
    }
    // console.log("called requestClientID");
    let email;

    await axios.get('/auth/current-session').then(({ data }) => {
        console.log("got email: <" + data.email + ">");
        email = data.email;
    })
    console.log("getClientID - email: " + email);
    let result = axios.get(LINK_HEADER + "getClientID", { params: { email: email } }).then(res => {
        let data = res.data.clientID;
        console.log("<CH> clientID: " + res.data.clientID);
        clientID = data;
        // setClientID(data);
        // getName();
        // setClientName(user.first_name + " " + user.last_name);
    });
    await result;
    console.log("after await: " + clientID);
    return clientID;
}

async function getSocialsInfoByID(dataFunction, id) {
    if (id == undefined) {
        id = await getClientID();
    }
    let data = { alumni_id: id };
    let result = axios.get(LINK_HEADER + "readSocialsRequestByID", { params: data }).then(res => {
        let data = res.data;
        console.log(data);
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
    let result = axios.get("/api/readDescriptionRequest", { params: data }).then(res => {
        let data = res.data;
        console.log(res);
        console.log(data);
        if (data != null) {
            dataFunction(data);
        }
    });
}

async function writeDescription(description) {
    let id = await getClientID();
    let data = { alumni_id: id, description: description };
    let result = axios.get("/api/updateDescriptionRequest", { params: data }).then(res => {

    });
}

async function getProfileDataByID(dataFunction, id) {
    if (id == undefined) {
        id = await getClientID();
    }
    let data = { alumni_id: id };

    let result = axios.get("/api/readProfileDataRequestByID", { params: data }).then(res => {
        let data = res.data;
        if (data != null) {
            dataFunction(data);
        }
    });
}

async function writeProfileData(data) {
    data.alumni_id = await getClientID();

    let result = axios.get("/api/updateProfileDataRequest", { params: data }).then(res => {
        let data = res.data;
        console.log(data);
        if (data != null) {

        }
    });
}

async function writeSocialsInfo(data) {
    data.alumni_id = await getClientID();

    let result = axios.get("/api/updateSocialsRequest", { params: data }).then(res => {

    });
}

async function getMessages(dataFunction, conversationID) {
    // const submitGetMessageRequest = () => {
    // const data = packGetData();
    // console.log(data);
    let data = { conversationID: conversationID };
    let result = axios.get("/api/getMessageRequest", { params: data }).then(res => {
        let resultData = res.data;
        if (resultData != null) {
            dataFunction(resultData);
        }
    });
    // }
}

async function writeMessage(conversationID, messageBody) {
    let data = { conversationID: conversationID, messageBody: messageBody };
    axios.get("/api/sendMessageRequest", { params: data }).then(res => console.log(res)).catch((err) => {

    });
}

async function getConversations(dataFunction) {
    let id = await getClientID();
    let data = { alumni_id: id };
    axios.get("/api/getConversationsRequest", { params: data }).then(res => {
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
    let result = axios.get("/api/createConversation", { params: data }).then(res => {

    });
}

async function getPeopleList(dataFunction, data) {
    let result = axios.get("/api/getPeopleList", { params: data }).then(res => {
        let data = res.data;
        if (data != null) {
            dataFunction(data);
        }
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

    getConversations,
    writeConversation,

    getPeopleList
}