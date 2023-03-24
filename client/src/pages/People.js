import * as React from 'react';
import ReactDOM from 'react-dom/client'
// import { TextInput } from 'flowbite-react/lib/cjs/components/TextInput';
import List from "../components/SearchBar";
import YearFilterComponent from "../components/YearFilter"
import AcademyFilterComponent from "../components/AcademyFilter"
import YearFilterToast from "../components/YearFilterToast";
import AcademyFilterToast from "../components/AcademyFilterToast";
import PeopleGeneratorComponent from "../components/PeopleGenerator";
// import { Label } from 'flowbite-react/lib/cjs/components/Label';
import Person from '../components/Person';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './styles/People.css'
import Home from './Home';

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
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get('/auth/current-session').then(({ data }) => {
      setAuth(data);
    })
  }, []);
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // const handleClick = (e = React.MouseEvent) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [currentAlumniID, setCurrentAlumniID] = React.useState(0);
  const [people, setPeople] = React.useState([]);
  const [clientID, setClientID] = React.useState(0);

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

  // //check if year is valid 
  // function Year_filter() {
  //   inputYear = document.getElementById("year").value;
  //   console.log(document.getElementById("year").value);
  //   if (isNaN(inputYear) == false) {
  //     inputYear = Number(inputYear);
  //     YearFilterHandler(inputYear);
  //   }
  // };

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
      name_filter: inputText,
      academy_filter: AcademyFilter,
      year_filter: YearFilter
    };
  }

  const submitGetPeopleRequest = () => {
    // console.log("Get people!");

    let data = getPackedData();
    console.log(data);
    data.test_array = [];
    let result = axios.get("/api/getPeopleList", { params: data }).then(res => {
      let data = res.data;
      console.log(data);
      if (data != null) {
        // setClientName(data.first_name + " " + data.last_name);
        setPeople(data);
      }
    });
  }

  const requestClientID = () => {
    // console.log("called requestClientID");
    let email = auth.email;
    let result = axios.get("/api/getClientID", { params: { email: email } }).then(res => {
      let data = res.data.clientID;
      // console.log("HERE!2");
      // console.log(res.data);
      setClientID(data);
      // getName();
      // setClientName(user.first_name + " " + user.last_name);
    });
  }

  const createConversation = (alumni_id) => {
    let data = {
      clientID: clientID,
      targetID: alumni_id
    }
    console.log(data);
    let result = axios.get("/api/createConversation", { params: data }).then(res => {
      let data = res.data;
      // console.log(data);
      if (data != null) {
        // setClientName(data.first_name + " " + data.last_name);
        // setPeople(data);
      }
    });
  }

  const switchFunctionGenerator = (alumni_id) => {
    return () => {
      setCurrentAlumniID(alumni_id);
    }
  };

  const createConversationFunctionGenerator = (alumni_id) => {
    return () => {
      createConversation(alumni_id);
    }
  }

  useInterval(() => {
    // console.log("interval called");
    submitGetPeopleRequest();
    requestClientID();
  }, 5000);

  if (auth) {
    return (
      <div className="grid grid-cols-2 divide-x h-full">
        <div className="">
          <h1 className="py-3 text-3xl font-bold text-stone-600 mr-6 inline-block align-middle">Directory</h1>
          <div className="search px-10">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="search" onChange={inputHandler} placeholder="Search for alum" className="input input-bordered input-info block w-full focus:border-sky-400 focus:ring-0 pl-10"></input>
            </div>
            <br className="space-y-8"></br>

           <YearFilterComponent input={YearFilterHandler}></YearFilterComponent> 
           <AcademyFilterComponent Academies={academy_array} RegisterFilters={Academy_filter}></AcademyFilterComponent>
            <YearFilterToast input={YearFilter}></YearFilterToast>
            <AcademyFilterToast input={AcademyFilter}></AcademyFilterToast>
            
            <br className="space-y-5"></br>
            <br className="space-y-5"></br>
            <PeopleGeneratorComponent people={people} switchFunctionGenerator={switchFunctionGenerator} createConversationFunctionGenerator={createConversationFunctionGenerator} />
          </div>
        </div>
        <div>
          <Person alumniID={currentAlumniID} />
        </div>
      </div>

    )
  }
  else if (auth === null) {
    // loading
    return <div></div>
  }
  else {
    return <Home />
  }

}


export default People;