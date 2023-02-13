import { React, useState } from 'react'

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
                    data.class = "message-container";
                    data.imgClass = "img-left";
                    data.timeClass = "time-right";
                } else {
                    data.class = "message-container darker";
                    data.imgClass = "img-right";
                    data.timeClass = "time-left";
                }
            
                return (<div class={data.class}>
                    <box-icon name='user-circle' type='solid' color='#4691f2' class={data.imgClass}></box-icon>
                    <p>{item.body}</p>
                    <span class={data.timeClass}>{item.sent_datetime}</span>
                </div>)
            })}
        </div>

    )
}


export default MessageGenerator
