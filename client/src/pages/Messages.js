import * as React from 'react';
import axios from 'axios';
import { TextInput } from 'flowbite-react/lib/cjs/components/TextInput';
import MessageList from "../components/MessageGenerator";

import '../index.css'
import 'boxicons'
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
  //search bar filtering 
  const [messages, setMessages] = React.useState([]);
  let messageBody = "";
  let input;

  let testData = {
    senderID: 0,
    receiverID: 1
  }

  let inputHandler = (e) => {
    //convert input text to lower case
    // var lowerCase = e.target.value.toLowerCase();
    // setInputText(lowerCase);
    messageBody = e.target.value;
    input = e.target;
  };

  const getPackedData = () => {
    return {
      senderID: 0,
      receiverID: 1,
      messageBody: messageBody
    }
  }

  const submitGetMessageRequest = () => {
    let result = axios.get("http://localhost:5000/getMessageRequest", { params: testData }).then(res => {
      let data = res.data;
      if (data != null) {
        setMessages(data);
      }
    });
  }

  const submitSendMessageRequest = () => {
    const data = getPackedData();
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
    submitGetMessageRequest();
  }, 3000);

  return (
    <div className="container-fluid">
      <div className="columns-2 gap-8 block min-h-screen">
        <div className="directory">
          <div className="overflow-auto">
            <h2 className="py-3">Directory</h2>
            {/* <text>Here!</text> */}
          </div>
        </div>

        <div className="conversation">
          <div className="overflow-auto" id="conversation-box">
            <h2 className="py-3">Jonathan Doe</h2>

            {/* <div class="message-container">
              <box-icon name='user-circle' type='solid' color='#4691f2' class="img-left"></box-icon>
              <p>Hello. How are you today?</p>
              <span class="time-right">11:00</span>
            </div>

            <div class="message-container darker">
              <box-icon name='user-circle' type='solid' color='#4691f2' class="img-right"></box-icon>
              <p>Hey! I'm fine. Thanks for asking!</p>
              <span class="time-left">11:01</span>
            </div>

            <div class="message-container">
              <box-icon name='user-circle' type='solid' color='#4691f2' class="img-left"></box-icon>
              <p>Sweet! So, what do you wanna do today?</p>
              <span class="time-right">11:02</span>
            </div>

            <div class="message-container darker">
              <box-icon name='user-circle' type='solid' color='#4691f2' class="img-right"></box-icon>
              <p>Nah, I dunno. Play soccer.. or learn more coding perhaps?</p>
              <span class="time-left">11:05</span>
            </div> */}
            <MessageList input={messages} />
            <div className="search">
              <TextInput
                type="search"
                onChange={inputHandler}
                placeholder="Message"
                className="bg-defaultblue border border-defaultblue placeholder-defaultblue rounded-lg focus:ring-defaultblue focus:border-defaultblue block w-full"
              />
            </div>
            <div>
              <div className="py-1">
                <button
                  id="align-left"
                  className="drop-shadow-xl text-xs border rounded py-2 px-2 bg-sky-100 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 hover:text-white"
                  onClick={handleClick}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* where the rest of directory will be implemented */}
        {/* <h2 className="py-3">Jonathan Doe</h2> */}
        <div className="">

        </div>
      </div>
    </div>
  )
}