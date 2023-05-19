import * as React from 'react';
import { Transition } from '@headlessui/react'
import { useState } from 'react'

function AcademyFilter(props) {
    const [isOpen, setIsOpen] = useState(false);
    let academies = props.Academies;
    // console.log(academies);

    return (
        <div className="inline-block px-10 flex grid grid-cols-3 gap-1 place-content-center">
            
            {/* <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
            <Transition
                show={isOpen}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            > */}
                {/* Will fade in and out */}
                <ul className="block menu menu-horizontal bg-base-100 w-30 align-self-left">
                <li tabIndex="0">
                    <button onClick={() => setIsOpen(!isOpen)} className="rounded-lg text-sm border border-1 border-red-300">Academy</button>
                    <ul className="rounded-lg component-list bg-base-100 w-30 border border-1 border-red-300">
                        {academies.map((item) => {
                            return (
                                <li className="hover:bg-stone-200 focus:none">
                                    <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                                        <label className="flex">
                                            <input id={item} type="checkbox" className="place-content-start focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                                            <br className="space-x-2"></br>
                                            <p className="text-xs place-content-right">{item}</p>
                                        </label>
                                    </div>
                                </li>
                            )
                        })}
                        <button onClick={props.RegisterFilters} className="drop-shadow-lg border-2 text-xs border  py-2 px-2 bg-red-300 hover:bg-red-400 border-red-300 hover:text-white hover:border-red-400">Add</button>
                    </ul>
                </li>
            </ul>
            {/* </Transition> */}
        </div>
    )
}

export default AcademyFilter;