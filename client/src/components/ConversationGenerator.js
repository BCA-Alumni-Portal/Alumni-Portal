import { React, useState } from 'react'
import { Circles, Grid } from 'react-loader-spinner'
import person from "../images/person1.png"


function ConversationGenerator(props) {
    let conversations = props.conversations;
    let gray = true;
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
                        gray = !gray;
                        // console.log(convo);
                        gray = true;
                        if (gray) {
                            return (
                                <div>
                                    <div className="ripple-bg-gray-300 grid card h-25 hover:bg-sky-200 focus:bg-sky-300" onClick={func}>
                                        <div className="avatar py-3 text-sm row flex gap-3 px-2">
                                            <div className="lg:w-10 rounded-full">
                                                <img src={person} />
                                            </div>
                                            <p className="text-lg">{convo.first_name} {convo.last_name}</p>
                                        </div>
                                    </div>
                                </div>
                            )

                        } else {
                            return (
                                <div>
                                    <div className="grid card h-25 hover:bg-sky-200 focus:bg-sky-200" onClick={func}>
                                        <div className="avatar py-3 text-sm row flex gap-3 px-2">
                                            <div className="lg:w-10 rounded-full">
                                                <img src={person} />
                                            </div>
                                            <p className="text-lg">{convo.first_name} {convo.last_name}</p>
                                        </div>
                                    </div>
                                </div>
                            )

                        }
                    })
                }
            </div>
        )
    }
}


export default ConversationGenerator
