const sqlAccess = require('./sqlAccess');

let socketContainer = {}
let senderToConversation = {}
let wss = null;

function setWSS(newWSS) {
    wss = newWSS
}

function accept(req, res) {
    // all incoming requests must be websockets
    if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
        res.end();
        return;
    }

    // can be Connection: keep-alive, Upgrade
    if (!req.headers.connection.match(/\bupgrade\b/i)) {
        res.end();
        return;
    }

    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

function onConnect(ws) {
    ws.on('message', function (message) {
        message = message.toString();
        console.log("onConnect:");
        console.log(message);
        message = JSON.parse(message);
        let senderID = message.senderID;
        if (message.conversationID != null) { // Create a new conversation socket
            console.log("we have conversationID");
            let conversationID = message.conversationID;

            if (socketContainer[conversationID] == null) {
                socketContainer[conversationID] = {}
            }
            socketContainer[conversationID][senderID] = ws

            ws.onclose = function(event) {
                // Clear out the entry in socketContainer
                delete socketContainer[conversationID][senderID];
                if (Object.keys(socketContainer[conversationID]) == null) {
                    delete socketContainer[conversationID];
                }
            };

            senderToConversation[senderID] = conversationID

        } else if (message.messageBody != null) { // Send a message in a socket
            console.log("we have messageBody");
            let messageBody = message.messageBody
            let conversationID = senderToConversation[senderID];

            // Check if the other person is connected
            let keys = Object.keys(socketContainer[conversationID]);
            console.log(JSON.stringify(keys));
            if (keys.length > 1) {
                keys.forEach((id) => {
                    if (id != senderID) {
                        let socket = socketContainer[conversationID][id]
                        if (socket != null) {
                            socket.send(messageBody);
                        }
                    }
                })
            }

            sqlAccess.writeMessageToSQL(senderID, conversationID, messageBody).then((result) => {
                console.log("written to sql");
                console.log(result);
            });
        }
        // message = message.toString();
        // let name = message.match(/([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]+)$/gu) || "Guest";
        // ws.send(`Hello from server, ${name}!`);

        // setTimeout(() => ws.close(1000, "Bye!"), 5000);
    });
}

module.exports = { setWSS, accept }