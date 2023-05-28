import * as React from 'react';
import axios from 'axios';
import { TextInput } from 'flowbite-react/lib/cjs/components/TextInput';
import MessageGenerator from "../components/MessageGenerator";
import ConversationGenerator from "../components/ConversationGenerator";
import Home from './Home';
import CommunicationHandler from '../components/CommunicationHandler';

//will change this to messages.css later after consulting Kevin
import 'boxicons'
import './styles/Messages.css'
import { useState, useEffect, useRef } from 'react';


function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Messages() {
  const [auth, setAuth] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  useEffect(() => {
    axios.get('/auth/current-session').then(({ data }) => {
      // console.log("got auth");
      setAuth(data);
    })
  }, []);

  useEffect(() => {
    if (auth !== null) {
      setProfilePictureFile(auth.picture)
    }
  }, [auth])

  const [messages, setMessages] = React.useState([]);
  const [clientID, setClientID] = React.useState(0);
  const [targetID, setTargetID] = React.useState(0);
  const [conversationID, setConversationID] = React.useState(0);
  const [conversations, setConversations] = React.useState([]);
  const [conversation, setConversation] = React.useState({});
  const [currentName, setCurrentName] = React.useState("Select a conversation");
  const [clientName, setClientName] = React.useState("Johnathan Dough");
  // let clientID = 0;
  // let targetID = 10;
  const [messageBody, setMessageBody] = useState("");
  const [chatSocket, setChatSocket] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingConversations, setLoadingConversations] = useState(true);
  let input;

  let inputHandler = (e) => {
    // Get text from the message inp\ut
    // messageBody = e.target.value;
    // console.log(e);
    // input = e.target;
    setMessageBody(e.target.value);
  };

  const setConversationInfo = (data) => {
    setClientName(data.first_name + " " + data.last_name);
  }

  const getName = () => {
    CommunicationHandler.getProfileDataByID(setConversationInfo);
  }

  async function requestClientID() {
    setClientID(await CommunicationHandler.getClientID());
    getName();
  }

  const packSendData = () => {
    return {
      senderID: clientID,
      conversationID: conversationID,
      messageBody: messageBody
    }
  }

  const packGetData = () => {
    return {
      conversationID: conversationID
    }
  }

  const onGetMessages = (data) => {
    setMessages(data);
    if (conversation.first_name == undefined) {
      setCurrentName("Select a conversation");
    } else {
      setCurrentName(conversation.first_name + " " + conversation.last_name);
    }
    // console.log("get messages");
    setLoadingMessages(false);
  }

  const submitGetMessageRequest = () => {
    CommunicationHandler.getMessages(onGetMessages, conversationID);
  }

  const submitSendMessageRequest = () => {
    CommunicationHandler.writeMessage(conversationID, messageBody);
    // CommunicationHandler.writeMessage(chatSocket, messageBody);

    if (input != null) {
      input.value = "";
    }
  };

  const submitGetConversationsRequest = () => {
    CommunicationHandler.getConversations((data) => {
      setConversations(data);
      setLoadingConversations(false);
    });
  };

  //= React.MouseEvent
  const handleClick = (e) => {
    submitSendMessageRequest();
    submitGetMessageRequest();
    setMessageBody("")
  };

  const switchConversation = (conversation) => {
    // console.log("C.CID: " + conversation.conversation_id);
    setConversationID(conversation.conversation_id);
    setConversation(conversation);
    setLoadingMessages(true);

    // let onOpenFunction = (chatSocket) => {
    //   setCurrentName(conversation.first_name + " " + conversation.last_name);
    // }

    // let onMessageFunction = (event) => {
    //   let message = event.data;
    //   console.log(message);
    //   console.log(conversationID);
    //   submitGetMessageRequest();
    // }

    // if (chatSocket != null) {
    //   console.log(chatSocket);
    //   chatSocket.close();
    //   setChatSocket(null);
    // }
    // CommunicationHandler.createConversationConnection(conversation.conversation_id, onOpenFunction, onMessageFunction).then((socket) => {
    //   setChatSocket(socket);
    // });

    // submitGetMessageRequest();
  }

  // Client pings
  useInterval(() => {
    if (auth == null) {
      return;
    }
    requestClientID();
    submitGetMessageRequest();
    submitGetConversationsRequest();
  }, 5000);

  // Initial update
  useEffect(() => {
    // console.log("useEffect called");
    setLoadingMessages(true);
    setLoadingConversations(true);
    requestClientID();
    submitGetMessageRequest();
    submitGetConversationsRequest();
  }, [auth]);

  const conversationSelectionFunctionGenerator = (conversation) => {
    return () => {
      switchConversation(conversation);
    }
  };

  useEffect(() => {
    submitGetMessageRequest();
  }, [conversationID]);

  if (auth) {
    return (
        <div className="columns-2 gap-8">
          <div className="overflow-auto">
            <div className="flex grid px-20">
            <h1 className="py-3 text-3xl font-bold text-stone-600 inline-block align-middle">Inbox</h1>

              {/* <br className="space-y-5"></br>
              <div className="btn-group place-content-center">
                <button className="btn btn-md sm:px-2  h-10 text-white btn-info hover:bg-gradient-to-r hover:from-sky-100 hover:to-sky-200 hover:border-sky-200 hover:text-black">Accepted</button>
                <button className="btn btn-md sm:px-2    h-10 text-white btn-info hover:bg-gradient-to-r hover:from-sky-100 hover:to-sky-200 hover:border-sky-200 hover:text-black">Pending</button>
                <button className="btn btn-md sm:px-2   h-10 text-white btn-info hover:bg-gradient-to-r hover:from-sky-100 hover:to-sky-200 hover:border-sky-200 hover:text-black">Blocked</button>
              </div> */}

              <ConversationGenerator loadingConversations={loadingConversations} conversations={conversations} functionGenerator={conversationSelectionFunctionGenerator}></ConversationGenerator>

            </div>
          </div>



          <div className="conversation">
            <div className="overflow-auto flex grid " id="conversation-box">
              <h2 className="py-3 text-2xl text-sky-400">{currentName}</h2>

              <MessageGenerator loadingMessages={loadingMessages} input={messages} currentName={currentName} clientID={clientID} clientName={clientName} profilePictureFile={profilePictureFile}/>
              <div className="BOTTOM  row flex gap-2 place-content-center py-3">
                <div>
                  <input type="text" value={messageBody} onChange={inputHandler} id="message-input" placeholder="Message" className=" input input-bordered input-info w-full max-w-xs focus:border-sky-400 focus:ring-0" />
                </div>
                <br className="space-x-2"></br>
                <div>
                  <button
                    className="drop-shadow-lg text-lg border rounded py-2 px-4 bg-sky-100 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 hover:text-white"
                    onClick={handleClick}
                  >
                    Send
                  </button>
                </div>
              </div>

              <div>
              </div>
            </div>
          </div>
        </div>
    )
  }
  else if (auth === null) {
    // loading
    return <div></div>
  }
  else {
    return <Home />
  }
}