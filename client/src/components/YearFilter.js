import * as React from 'react';


function YearFilter(props) {
    let func = () => {
        let inputYear = document.getElementById("year").value;
        // console.log(document.getElementById("year").value);
        if (isNaN(inputYear) == false) {
            inputYear = Number(inputYear);
            props.input(inputYear);
        }
    };

    return (
        <div className="px-10 flex grid grid-cols-3 gap-1 place-content-center">
            <div>
                <ul className="component-list block menu menu-horizontal bg-base-100 border border border-1 border-amber-300">
                    <li tabIndex="0">
                        <span className="component-list text-sm">Graduation Year</span>
                        <ul>
                            <div className="component-list bg-base-100 border border-1 border-amber-300">
                                <div className="component-list px-2 py-3">
                                    <input type="text" placeholder="2023" id="year" className="component-list text-xs input input-bordered input-warning w-full max-w-xs focus:border-amber-400 focus:ring-0"></input>
                                    <div>
                                        <br></br>
                                        <button onClick={func} className="component-list drop-shadow-md border-2 text-xs bg-amber-200 border border-amber-300 rounded hover:bg-amber-300 py-2 px-10">
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </ul>
                    </li>
                </ul>
            </div>
           
        </div>

    )
}

export default YearFilter;