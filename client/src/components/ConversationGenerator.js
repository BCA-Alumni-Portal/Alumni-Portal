import { React, useState } from 'react'
import data from "./ListData.json"
import person from "../images/person1.png"


function ConversationGenerator(props) {
    let conversations = props.conversations;
    return (
        <div class="list-group">
            {
                conversations.map((convo) => {
                    let func = props.functionGenerator(convo);
                    // console.log(convo);
                    return (
                        <div>
                            <div className="grid card h-25 hover:bg-stone-200  focus:bg-stone-200 rounded-box" onClick={func}>
                                <div className="avatar py-3 text-sm row flex gap-3 px-2">
                                    <div className="lg:w-20 rounded-full">
                                        <img src={person} />
                                    </div>
                                    <p className="text-lg">{convo.first_name} {convo.last_name}</p>
                                </div>
                            </div>

                            <div className="divider"></div>
                        </div>
                    )
                })
            }
        </div>
    )
}


export default ConversationGenerator
