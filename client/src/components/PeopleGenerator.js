import { React, useState } from 'react'
import data from "./ListData.json"
import personImage from "../images/person1.png"


function PeopleGenerator(props) {
    let people = props.people;
    // console.log(people);
    return (
        <div class="list-group">
            {
                people.map((person) => {
                    let switchFunc = props.switchFunctionGenerator(person.alumni_id);
                    let createConversationFunc = props.createConversationFunctionGenerator(person.alumni_id);
                    return (
                        <div>
                            <div className="grid card h-25 hover:bg-stone-200  focus:bg-stone-200 rounded-box" onClick={switchFunc}>
                                <div className="avatar py-3 text-sm row flex gap-3 px-2">
                                    <div className="lg:w-20 rounded-full">
                                        <img src={personImage} />
                                    </div>
                                    <p className="text-lg">{person.first_name} {person.last_name}</p>
                                    
                                    <button
                                        onClick={createConversationFunc}
                                        className="place-content-right drop-shadow-lg border-2 w-7 border rounded py-1 px-1 btn-info hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-500 hover:sky-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="16" height="16" viewBox="0 0 24 24"> <path d="M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm2-10h4V7h2v4h4v2h-4v4h-2v-4H7v-2z"></path></svg>
                                    </button>
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

export default PeopleGenerator
