import { React, useState } from 'react'
import person from "../images/person1.png"


function ConversationGenerator(props) {
    let conversations = props.conversations;
    let gray = true;
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


export default ConversationGenerator
