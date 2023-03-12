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
                    let func = props.functionGenerator(person.alumni_id);
                    return (
                        <div>
                            <div className="grid card h-25 hover:bg-stone-200  focus:bg-stone-200 rounded-box" onClick={func}>
                                <div className="avatar py-3 text-sm row flex gap-3 px-2">
                                    <div className="lg:w-20 rounded-full">
                                        <img src={personImage} />
                                    </div>
                                    <p className="text-lg">{person.first_name} {person.last_name}</p>
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
