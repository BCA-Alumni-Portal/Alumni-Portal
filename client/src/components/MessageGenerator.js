import { React, useState } from 'react'
import person from "../images/person1.png"
function MessageGenerator(props) {
    console.log(props);
    var senderID = 1;
    var messages = [
        {
            senderID: 0,
            text: "Well, hello!"
        },
        {
            senderID: 1,
            text: "Hey, how's it going?"
        },
        {
            senderID: 0,
            text: "Not too bad, how about you?"
        }
    ]
    messages = props.input;
    console.log(messages);

    return (
        <div class="list-group">
            {messages.map((item) => {
                var data = {}
                if (item.sender_id == senderID) {
                    return (
                        <div className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={person} />
                                </div>
                            </div>
                            <div className="chat-header">
                                Anakin
                                <time className="text-xs opacity-50">{item.sent_datetime}</time>
                            </div>
                            <div className="chat-bubble">{item.body}</div>
                        </div>
                    );
                } else {
                    return (
                        <div className="chat chat-end">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={person} />
                                </div>
                            </div>
                            <div className="chat-header">
                                Anakin
                                <time className="text-xs opacity-50">{item.sent_datetime}</time>
                            </div>
                            <div className="chat-bubble">{item.body}!</div>
                        </div>
                    );
                }
            })}
        </div>

    )
}


export default MessageGenerator
