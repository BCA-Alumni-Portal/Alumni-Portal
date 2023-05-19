import { React, useState } from 'react'
import data from "./ListData.json"


function PeopleGenerator(props) {
    let people = props.people;
    // console.log(people);
    return (
        <div class="list-group max-h-screen overflow-y-scroll">
            {
                people.map((person) => {
                    let switchFunc = props.switchFunctionGenerator(person.alumni_id);
                    let createConversationFunc = props.createConversationFunctionGenerator(person.alumni_id);
                    return (
                        <div>
                            <div className="group/item hover:bg-slate-100 grid card h-25 hover:bg-stone-200  focus:bg-stone-200 box py-2" onClick={switchFunc}>
                                <div className="text-sm row flex gap-3 px-2">

                                    {/* <button
                                        onClick={createConversationFunc}
                                        className="place-content-left drop-shadow-lg border-2 w-7 h-7 border rounded py-1 px-1 btn-info hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-500 hover:sky-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="16" height="16" viewBox="0 0 24 24"> <path d="M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm2-10h4V7h2v4h4v2h-4v4h-2v-4H7v-2z"></path></svg>
                                    </button> */}
                                    <p className="text-lg place-content-right">{person.first_name} {person.last_name}</p>

                                    {/* <li class="group/item hover:bg-slate-100 ..."> */}
                                        {/* <img src="{person.imageUrl}" alt="" /> */}
                                        <div>
                                            {/* <a href="{person.url}">{person.name}</a>
<p>{person.title}</p> */}
                                        </div>
                                        <span class="group/edit invisible hover:bg-slate-200 group-hover/item:visible ..." href="tel:{person.phone}">
                                            {/* <span class="group-hover/edit:text-gray-700 ...">Call</span> */}
                                            <span style={{display:"inline-block", width: "20px"}}>

</span>
                                            <span class="text-gray-700">
                                                Message this alumni
                                            </span>
                                            <span style={{display:"inline-block", width: "10px"}}>

                                            </span>
                                            <button
                                                onClick={createConversationFunc}
                                                className="place-content-left drop-shadow-lg border-2 w-7 h-7 border rounded py-1 px-1 btn-info hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-500 hover:sky-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="16" height="16" viewBox="0 0 24 24">
                                                <path d="M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm2-10h4V7h2v4h4v2h-4v4h-2v-4H7v-2z"></path></svg>
                                            </button>
                                            {/* <svg class="group-hover/edit:translate-x-0.5 group-hover/edit:text-slate-500 ..."> */}
                                            {/* <!-- ... --> */}
                                            {/* </svg> */}
                                        </span>
                                    {/* </li> */}

                                </div>
                            </div>

                            {/* <div className="divider"></div> */}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PeopleGenerator
