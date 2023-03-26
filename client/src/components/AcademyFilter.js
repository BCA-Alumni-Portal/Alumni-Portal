import * as React from 'react';

function AcademyFilter(props) {
    let academies = props.Academies;
    console.log(academies);

    return (
        <div>
            <ul className="component-list block menu menu-horizontal bg-base-100 w-30 align-self-left">
                <li tabIndex="0">
                    <span className="text-sm border border-1 border-red-300">Academy</span>
                    <ul className="component-list menu bg-base-100 w-30 border border-1 border-red-300">
                        {academies.map((item) => {
                            return (<li className="hover:bg-stone-200 focus:none">
                                <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                                    <label className="flex" >
                                        <input id={item} type="checkbox" className="place-content-start focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                                        <br className="space-x-2"></br>
                                        <p className="text-xs place-content-right">{item}</p>
                                    </label>
                                </div>
                            </li>)
                        })}
                        <button onClick={props.RegisterFilters} className="drop-shadow-lg border-2 text-xs border  py-2 px-2 bg-red-300 hover:bg-red-400 border-red-300 hover:text-white hover:border-red-400">Add</button>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default AcademyFilter;