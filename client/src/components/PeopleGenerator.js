import { React, useState } from 'react'
import data from "./ListData.json"
import CommunicationHandler from './CommunicationHandler';

function PeopleGenerator(props) {
    let people = props.people;
    let isAdmin = CommunicationHandler.getIsAdminStatus();

    const academy_id_map = [null, "AAST", "AMST", "AEDT", "ABF", "ATCS", "ACAHA", "AVPA-M", "AVPA-V", "AVPA-T"]
    // console.log(people);
    return (
        <div class="list-group h-[60vh] overflow-y-scroll divide-y">
            {
                people.map((person) => {
                    let switchFunc = props.switchFunctionGenerator(person.account_id);
                    // let createConversationFunc = props.createConversationFunctionGenerator(person.account_id);
                    // let archiveUser = props.createArchiveUserFunctionGenerator(person.account_id);
                    //  ({academy_id_map[person.academy_id]}, {person.graduation_year})
                    return (
                        <div className="cursor-pointer">
                            <div className="group/item hover:bg-slate-100 grid card h-25 hover:bg-sky-200 focus:bg-sky-300 box py-2" onClick={switchFunc}>
                                <div className="text-sm row flex gap-3 px-2">

                                    {/* <button
                                        onClick={createConversationFunc}
                                        className="place-content-left drop-shadow-lg border-2 w-7 h-7 border rounded py-1 px-1 btn-info hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-500 hover:sky-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="16" height="16" viewBox="0 0 24 24"> <path d="M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm2-10h4V7h2v4h4v2h-4v4h-2v-4H7v-2z"></path></svg>
                                    </button> */}
                                    {/* <div> */}
                                        <p className="text-lg font-bold">{person.first_name} {person.last_name}</p>
                                        <p className="text-lg">({academy_id_map[person.academy_id]}, {person.graduation_year})</p>
                                    {/* </div> */}
                                    {/* <li class="group/item hover:bg-slate-100 ..."> */}
                                    {/* <img src="{person.imageUrl}" alt="" /> */}
                                </div>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default PeopleGenerator
