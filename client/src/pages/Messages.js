import * as React from 'react';
import axios from 'axios';
import { TextInput } from 'flowbite-react/lib/cjs/components/TextInput';
import MessageList from "../components/MessageGenerator";
import { useAuth0 } from '@auth0/auth0-react';

//will change this to messages.css later after consulting Kevin
import 'boxicons'
import './styles/Messages.css'
import { useState, useEffect, useRef } from 'react';

import person from "../images/person1.png"

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
  const [messages, setMessages] = React.useState([]);
  const { user, isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [clientID, setClientID] = React.useState(0);
  const [targetID, setTargetID] = React.useState(0);
  // let clientID = 0;
  // let targetID = 10;
  let messageBody = "";
  let input;

  let inputHandler = (e) => {
    // Get text from the message inp\ut
    // messageBody = e.target.value;
    // console.log(e);
    // input = e.target;
    messageBody = document.getElementById("message-input").value;
  };

  const requestClientID = () => {
    // console.log("called requestClientID");
    let email = user.email;
    // console.log(email);
    // console.log("HERE!1");
    // console.log(clientID);
    // console.log(targetID);
    let result = axios.get("http://localhost:5000/getClientID", { params: {email: email} }).then(res => {
      let data = res.data.clientID;
      // console.log("HERE!2");
      // console.log(res.data);
      setClientID(data);
    });
  }

  const packSendData = () => {
    return {
      senderID: clientID,
      receiverID: targetID,
      messageBody: messageBody
    }
  }

  const packGetData = () => {
    return {
      senderID: targetID,
      receiverID: clientID
    }
  }

  const submitGetMessageRequest = () => {
    const data = packGetData();
    console.log(data)
    let result = axios.get("http://localhost:5000/getMessageRequest", { params: data }).then(res => {
      let data = res.data;
      console.log(data);
      if (data != null) {
        setMessages(data);
      }
    });
  }

  const submitSendMessageRequest = () => {
    const data = packSendData();
    console.log(data)
    axios.get("http://localhost:5000/sendMessageRequest", { params: data }).then(res => console.log(res)).catch((err) => {
      if (err.response) {
        console.log(err.response)
      }
    }
    );

    if (input != null) {
      input.value = "";
    }
  };

  const handleClick = (e = React.MouseEvent) => {
    console.log("Clicked!");
    submitSendMessageRequest();
    submitGetMessageRequest();
  };

  useInterval(() => {
    // console.log("interval called");
    requestClientID();
    submitGetMessageRequest();
  }, 3000);

  // useEffect(() => {
  //   console.log("Called useEffect!");
  //   requestClientID();
  // }, []); 

  return (
    <div className="container-fluid">
      <div className="columns-2 gap-8 block divide-x-8">
        <div className="overflow-auto">
          <div className="flex grid px-20">
            <div className="py-3 text-2xl row flex gap-3">
              <h2>Inbox </h2>
              <button
                className="place-content-right drop-shadow-lg border-2 w-7 border rounded py-1 px-1 btn-info hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-500 hover:sky-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="16" height="16" viewBox="0 0 24 24"> <path d="M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm2-10h4V7h2v4h4v2h-4v4h-2v-4H7v-2z"></path></svg>
              </button>
            </div>

            <br className="space-y-5"></br>
            <div className="btn-group place-content-center">
              <button className="btn btn-md sm:px-2  h-10 text-white btn-info hover:bg-gradient-to-r hover:from-sky-100 hover:to-sky-200 hover:border-sky-200 hover:text-black">Accepted</button>
              <button className="btn btn-md sm:px-2    h-10 text-white btn-info hover:bg-gradient-to-r hover:from-sky-100 hover:to-sky-200 hover:border-sky-200 hover:text-black">Pending</button>
              <button className="btn btn-md sm:px-2   h-10 text-white btn-info hover:bg-gradient-to-r hover:from-sky-100 hover:to-sky-200 hover:border-sky-200 hover:text-black">Blocked</button>
            </div>

            <br className="space-y-2"></br>
            <div className="flex flex-col place-content-left">
              <div className="grid card h-25 hover:bg-stone-200  focus:bg-stone-200 rounded-box">
                <div className="avatar py-3 text-sm row flex gap-3 px-2">
                  <div className="lg:w-20 rounded-full">
                    <img src={person} />
                  </div>
                  <p className="text-lg ">Hayun Jung </p>
                </div>
              </div>
              <div className="divider"></div>
              <div className="grid card h-25 hover:bg-stone-200  focus:bg-stone-200 rounded-box">
                <div className="avatar py-3 text-sm row flex gap-3 px-2">
                  <div className="lg:w-20  rounded-full">
                    <img src={person} />
                  </div>
                  <p className="text-lg place-content-center">Kevin Liu</p>
                </div>
              </div>
              <div className="divider"></div>
              <div className="grid card h-25 hover:bg-stone-200  focus:bg-stone-200 rounded-box">
                <div className="avatar py-3 text-sm row flex gap-3 px-2">
                  <div className="lg:w-20 rounded-full">
                    <img src={person} />
                  </div>
                  <p className="text-lg ">Remington Kim </p>
                </div>
              </div>
              <div className="divider"></div>
              <div className="grid card h-25 hover:bg-stone-200  focus:bg-stone-200 rounded-box">
                <div className="avatar py-3 text-sm row flex gap-3 px-2">
                  <div className="lg:w-20 rounded-full">
                    <img src={person} />
                  </div>
                  <p className="text-lg ">Benen Sullivan </p>
                </div>
              </div>
              <div className="divider"></div>
              <div className="grid card h-25 hover:bg-stone-200  focus:bg-stone-200 rounded-box">
                <div className="avatar py-3 text-sm row flex gap-3 px-2">
                  <div className="lg:w-20 rounded-full">
                    <img src={person} />
                  </div>
                  <p className="text-lg ">Jack Sparrow</p>
                </div>
              </div>
            </div>

          </div>
        </div>



        <div className="conversation">
          <div className="overflow-auto flex grid " id="conversation-box">
            <h2 className="py-3 text-2xl text-sky-400">Jonathan Doe</h2>

            <MessageList input={messages} />
            <div className="row flex gap-2 place-content-center py-3">
              <div> 
                <input type="text" onChange={inputHandler} id="message-input" placeholder="Message" className=" input input-bordered input-info w-full max-w-xs focus:border-sky-400 focus:ring-0" />
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
            {/* <div className="search">
              <TextInput
                type="search"
                onChange={inputHandler}
                placeholder="Message"
                className="bg-defaultblue border border-defaultblue placeholder-defaultblue rounded-lg focus:ring-defaultblue focus:border-defaultblue block w-full"
              />
            </div> */}
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}