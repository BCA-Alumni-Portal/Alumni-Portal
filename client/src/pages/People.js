import * as React from 'react';
import ReactDOM from 'react-dom/client'
// import { TextInput } from 'flowbite-react/lib/cjs/components/TextInput';
import List from "../components/SearchBar";
import YearFilterComponent from "../components/YearFilterToast";
import AcademyFilterComponent from "../components/AcademyFilterToast";
import PeopleGeneratorComponent from "../components/PeopleGenerator";
// import { Label } from 'flowbite-react/lib/cjs/components/Label';
import Person from '../components/Person';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';


function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function People() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e = React.MouseEvent) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [currentAlumniID, setCurrentAlumniID] = React.useState(0);
  const [people, setPeople] = React.useState([]);

  //search bar filtering 
  const [inputText, setInputText] = React.useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  //for filters
  const [YearFilter, setYearFilter] = React.useState([]);
  const [AcademyFilter, setAcademyFilter] = React.useState([]);

  let inputYear = "";
  const academy_array = ['AAST', 'AMST', 'AVPA', 'ABF', 'ATCS', 'ACAHA', 'AEDT'];

  let YearFilterHandler = (newElement) => {
    var current_array = [...YearFilter, newElement];
    let uniqueArray = current_array.filter(function (item, pos) {
      return current_array.indexOf(item) == pos;
    })
    setYearFilter(uniqueArray);
  };

  let AcademyFilterHandler = (newArray) => {
    // var current_array = [...AcademyFilter, newElement];
    // let uniqueArray = current_array.filter(function (item, pos) {
    //   return current_array.indexOf(item) == pos;
    // })
    // setAcademyFilter(uniqueArray);
    // let chars = ['A', 'B', 'A', 'C', 'B'];
    let mergedArray = [...AcademyFilter, ...newArray];

    let uniqueArray = mergedArray.filter((e, index) => {
        return mergedArray.indexOf(e) === index;
    });

    console.log(uniqueArray);

    setAcademyFilter(uniqueArray); //[...AcademyFilter, "\"" + newElement + "\""]);
  };

  //check if year is valid 
  function Year_filter() {
    inputYear = document.getElementById("year").value;
    console.log(document.getElementById("year").value);
    if (isNaN(inputYear) == false) {
      inputYear = Number(inputYear);
      YearFilterHandler(inputYear);
    }
  };

  //Pushing Academy Values, checking if checkbox checked
  function Academy_filter() {
    let checked_array = []
    for (let i = 0; i < 7; i++) {
      var current = academy_array[i]
      var checkedValue = document.querySelector('.' + current).checked;
      if (checkedValue == true) {
        checked_array.push("\"" + academy_array[i] + "\"");
      }
    }
    AcademyFilterHandler(checked_array);
  };

  const getPackedData = () => {
    return {
      academy_filter: AcademyFilter,
      year_filter: YearFilter
    };
  }

  const submitGetPeopleRequest = () => {
    // console.log("Get people!");

    let data = getPackedData();
    // console.log(data);
    let result = axios.get("http://localhost:5000/getPeopleList", { params: data }).then(res => {
      let data = res.data;
      // console.log(data);
      if (data != null) {
        // setClientName(data.first_name + " " + data.last_name);
        setPeople(data);
      }
    });
  }

  const functionGenerator = (alumni_id) => {
    // console.log("Make a function");
    // process.stdout.write("Make a function for: ");
    // console.log(conversation);
    return () => {
      // console.log("Called!");
      // console.log(th);
      // console.log(alumni_id);
      setCurrentAlumniID(alumni_id);
      // console.log(currentAlumniID);
    }
  };
  
  useInterval(() => {
    // console.log("interval called");
    submitGetPeopleRequest();
  }, 1000);

  return (
    <div className="grid grid-cols-2 divide-x ">
      <div className="">
        <div className="overflow-auto">
          <h2 className="py-3 text-lg">Directory</h2>
          <div className="search px-10">
            <input type="search" onChange={inputHandler} placeholder="Text" className="input input-bordered input-info w-full max-w-xs focus:border-sky-400 focus:ring-0"></input>
            <br className="space-y-8"></br>
            <br className="space-y-1"></br>
            <div className="px-10 flex grid grid-cols-3 gap-1 place-content-center">
              <div>
                <ul className="block menu menu-horizontal bg-base-100 border border border-1 border-amber-300">
                  <li tabIndex="0">
                    <span className="text-sm">Graduation Year</span>
                    <ul>
                      <div className="bg-base-100 border border-1 border-amber-300">
                        <div className="px-2 py-3">
                          <input type="text" placeholder="2023" id="year" className="text-xs input input-bordered input-warning w-full max-w-xs focus:border-amber-400 focus:ring-0"></input>
                          <div>
                            <br></br>
                            <button onClick={Year_filter} className="drop-shadow-md border-2 text-xs bg-amber-200 border border-amber-300 rounded hover:bg-amber-300 py-2 px-10">
                              Add
                            </button>
                          </div>
                        </div>
                      </div>

                    </ul>
                  </li>
                </ul>
              </div>
              <br className="space-x-4"></br>
              <div>
                <ul className="block menu menu-horizontal bg-base-100 w-30 align-self-left">
                  <li tabIndex="0">
                    <span className="text-sm border border-1 border-red-300">Academy</span>
                    <ul className="menu bg-base-100 w-30 border border-1 border-red-300">
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-6 " >
                            <p className="text-xs">AAST</p>
                            <input id="AAST" type="checkbox" className=" AAST focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-5 " >
                            <p className="text-xs">AMST</p>
                            <input id="AMST" type="checkbox" className="AMST focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-6">
                            <p className="text-xs">AVPA</p>
                            <input id="AVPA" type="checkbox" className="AVPA focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-8 ">
                            <p className="text-xs">ABF</p>
                            <input id="ABF" type="checkbox" className="ABF focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-6 ">
                            <p className="text-xs">ATCS</p>
                            <input id="ATCS" type="checkbox" className="ATCS focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-3 ">
                            <p className="text-xs">ACAHA</p>
                            <input id="ACAHA" type="checkbox" className="ACAHA focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-3 ">
                            <p className="text-xs">AEDT</p>
                            <input id="AEDT" type="checkbox" className="AEDT focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <button onClick={Academy_filter} className="drop-shadow-lg border-2 text-xs border  py-2 px-2 bg-red-300 hover:bg-red-400 border-red-300 hover:text-white hover:border-red-400">Add</button>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <br className="space-y-8"></br>
            <div className="space-y-8" id="tag-area">
              <YearFilterComponent input={YearFilter} />
              <AcademyFilterComponent input={AcademyFilter} />
            </div>

            <br className="space-y-5"></br>
            <br className="space-y-5"></br>
            <br className="space-y-5"></br>
            <br className="space-y-5"></br>
            <br className="space-y-5"></br>
            <br className="space-y-5"></br>
            <br className="space-y-5"></br>
            <br className="space-y-5"></br>
            <br className="space-y-5"></br>
            <br className="space-y-5"></br>
            <br className="space-y-5"></br>
            <br className="space-y-5"></br>
            {/* <List input={inputText} /> */}
            <PeopleGeneratorComponent people={people} functionGenerator={functionGenerator} />
          </div>
        </div>
        
      </div>
      <div className="">
          <Person alumniID={currentAlumniID}/>
          {/* replace 11 with the ID of the alumni that you clicked on */}
        </div>
    </div>


  );
}


export default People;