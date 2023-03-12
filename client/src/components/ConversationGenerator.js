import { React, useState } from 'react'
import data from "./ListData.json"
import person from "../images/person1.png"


function ConversationGenerator(props) {
    //create a new array by filtering the original array
    // const filteredData = data.filter((el) => {
    //     //if no input the return the original
    //     if (props.input === '') {
    //         return el;
    //     }
    //     //return the item which contains the user input
    //     else {
    //         return el.text.toLowerCase().includes(props.input)
    //     }
    // })
    let conversations = props.conversations;
    // console.log(conversations);
    return (
        // // <ul className="block border-black border">
        //     {/* <li className="text-black  block  hover:bg-hover-cream py-3 text-sm" key={0}>Conversations</li> */}

        <div class="list-group">

            {
                conversations.map((convo) => {

                    let func = props.functionGenerator(convo);
                    // func = (th) => {
                    //     console.log("Function called on click!");
                    //     console.log(th);
                    // }
                    // console.log(func);
                    // func("hey");

                    return (
                        <div>
                        <div className="grid card h-25 hover:bg-stone-200  focus:bg-stone-200 rounded-box" onClick={func}>
                            <div className="avatar py-3 text-sm row flex gap-3 px-2">
                                <div className="lg:w-20 rounded-full">
                                    <img src={person} />
                                </div>
                                <p className="text-lg">{convo.first_name} {convo.last_name}</p>
                                {/* <li class="list-group-item list-group-item-action" id={convo.conversation_id}></li> */}
                            </div>
                        </div>
                        
                        <div className="divider"></div>
                        </div>
                    )
                })
            }

        </div>

        // {/* //</ul> */}
    )
}


export default ConversationGenerator
