import { React, useState } from 'react'
import { Circles, Grid } from 'react-loader-spinner'
import person from "../images/person1.png"
import NonEditableProfilePicture from "./NonEditableProfilePicture"
import CommunicationHandler from './CommunicationHandler';


function ConversationGenerator(props) {
    let conversations = props.conversations;
    let loading = props.loadingConversations;

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
            <div class="list-group divide-y">
                {
                    conversations.map((convo) => {
                        let func = props.functionGenerator(convo);
                        let otherID = convo.first_id;
                        if (otherID == CommunicationHandler.getClientIDImmediate()) {
                            otherID = convo.second_id;
                        }
                        // console.log(convo);

                        return (
                            <div>
                                <div className="grid card h-25 hover:bg-sky-200 focus:bg-sky-200" onClick={func}>
                                    <div className="avatar py-3 text-sm row flex gap-3 px-2">
                                        <NonEditableProfilePicture accountsID={otherID} width={16}></NonEditableProfilePicture>
                    {/* <div>
                        <div className="avatar" >
                            <div className="w-64 rounded-full">
                                <img id="pfp" src={profilePicture} referrerpolicy="no-referrer"/>
                            </div>
                        </div>
                    </div> */}
                                        <p className="text-lg">{convo.first_name} {convo.last_name}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}


export default ConversationGenerator
