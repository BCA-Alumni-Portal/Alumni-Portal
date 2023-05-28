import { React, useState } from 'react'
import { Circles, Grid } from 'react-loader-spinner'
import person from "../images/person1.png"
import NonEditableProfilePicture from './NonEditableProfilePicture';

function MessageGenerator(props) {
    // console.log(props);
    // var senderID = 1;
    var messages = props.input;
    var conversation = props.conversation;
    var clientID = props.clientID;
    var currentName = props.currentName;
    var clientName = props.clientName;
    var loading = props.loadingMessages;
    // console.log(messages);

    if (loading) {
        return (
            <div className="flex justify-center items-center ml-8 mt-8">
                <Grid
                    height="80"
                    width="80"
                    color="#38bdf7"
                    ariaLabel="grid-loading"
                    radius="12.5"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        )
    }
    else {
        return (
            <div class="list-group">
                {messages.map((item) => {
                    // console.log(item);
                    if (item.sender_id != clientID) {
                        return (
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <NonEditableProfilePicture accountsID={item.sender_id} width={10}></NonEditableProfilePicture>
                                    </div>
                                </div>
                                <div className="chat-header">
                                    {currentName} -
                                    <time className="text-xs opacity-50"> {item.sent_datetime}</time>
                                </div>
                                <div className="chat-bubble">{item.body}</div>
                            </div>
                        );
                    } else {
                        return (
                            <div className="chat chat-end">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={props.profilePictureFile} />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    {clientName} -
                                    <time className="text-xs opacity-50"> {item.sent_datetime}</time>
                                </div>
                                <div className="chat-bubble">{item.body}</div>
                            </div>
                        );
                    }
                })}
            </div>

        )
    }
}


export default MessageGenerator;
