import axios from 'axios';

const LINK_HEADER = "/api/";

let clientID = -1;

function getClientID() {
    // console.log("called requestClientID");
    let email = "orgwirelist123@gmail.com";
    let result = axios.get(LINK_HEADER + "getClientID", { params: { email: email } }).then(res => {
        let data = res.data.clientID;
        // console.log("HERE!2");
        console.log(res);
        console.log(data);
        console.log("<CH> clientID: " + res.data.clientID);
        clientID = data;
        // setClientID(data);
        // getName();
        // setClientName(user.first_name + " " + user.last_name);
    });
}

function getClientToken() {

}

function getBaseInfo() {
    return {
        clientID
    }
}

function getSocialsInfo(setLinkedIn, id) {
    let data = { alumni_id: id };
    let result = axios.get(LINK_HEADER + "readSocialsRequestByID", { params: data }).then(res => {
        let data = res.data;
        console.log(data);
        if (data != null) {
            setLinkedIn(data.linkedin);
        }
        return undefined;
    });
}

export default {
    getSocialsInfo
}