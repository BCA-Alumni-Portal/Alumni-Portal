import * as React from 'react';
import ReactDOM from 'react-dom/client'
// import { TextInput } from 'flowbite-react/lib/cjs/components/TextInput';
import List from "../components/SearchBar";
import YearFilterComponent from "../components/YearFilter"
import AcademyFilterComponent from "../components/AcademyFilter"
import YearFilterToast from "../components/YearFilterToast";
import AcademyFilterToast from "../components/AcademyFilterToast";
import PeopleGeneratorComponent from "../components/PeopleGenerator";
import AcademyFilterCheckboxes from "../components/AcademyFilterCheckboxes";
// import { Label } from 'flowbite-react/lib/cjs/components/Label';
import Person from '../components/Person';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './styles/People.css'
import Home from './Home';
import CommunicationHandler from '../components/CommunicationHandler';

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
  const [loggedInID, setLoggedInID] = useState(null);
  useEffect(() => {
    axios.get('/auth/current-session').then(({ data }) => {
      setAuth(data);
    })
  }, []);

  useEffect(() => {
    if (auth !== null) {
      CommunicationHandler.getClientID().then((res) => {
        setLoggedInID(res)
      })
    }
  }, [auth])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // const handleClick = (e = React.MouseEvent) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [currentAccountsID, setCurrentAccountsID] = React.useState(-1);
  const [people, setPeople] = React.useState([]);
  const [lastFilterGroup, setLastFilterGroup] = React.useState("");

  //search bar filtering 
  const [inputText, setInputText] = React.useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  //for filters
  const [yearFilter, setYearFilter] = React.useState([]);
  const [academyFilter, setAcademyFilter] = React.useState([]);

  let inputYear = "";
  // const academy_array = ['AAST', 'AMST', 'AVPA', 'ABF', 'ATCS', 'ACAHA', 'AEDT', 'APT', 'ABCT', 'ACA', 'AVAGC', 'GLE'];
  const academy_array = ['AAST', 'AMST', 'ABF', 'ATCS', 'ACAHA', 'AEDT', 'AVPA-M', 'AVPA-V', 'AVPA-T'];


  let YearFilterHandler = (newElement) => {
    var current_array = [...yearFilter, newElement];
    let uniqueArray = current_array.filter(function (item, pos) {
      return current_array.indexOf(item) == pos;
    })
    setYearFilter(uniqueArray);
  };

  const getPackedData = () => {
    return {
      name_filter: inputText,
      academy_filter: academyFilter,
      year_filter: yearFilter
    };
  }

  const submitGetPeopleRequest = () => {
    let data = getPackedData();
    let stringData = JSON.stringify(data)
    if (lastFilterGroup == stringData) {
      return;
    }
    console.log("Made request");
    setLastFilterGroup(stringData);
    CommunicationHandler.getPeopleList(setPeople, data);
  }

  const createConversation = (account_id) => {
    CommunicationHandler.writeConversation(account_id);
  }

  const archiveUser = (account_id) => {
    CommunicationHandler.archiveUser(account_id);
  }

  const switchFunctionGenerator = (account_id) => {
    return () => {
      setCurrentAccountsID(account_id);
    }
  };

  const createConversationFunctionGenerator = (account_id) => {
    return () => {
      createConversation(account_id);
    }
  }

  const createArchiveUserFunctionGenerator = (account_id) => {
    return () => {
      archiveUser(account_id);
      let data = getPackedData();
      CommunicationHandler.getPeopleList(setPeople, data);
    }
  }

  const academyFilterFunctionGenerator = (academy) => {
    return () => {
      if (academyFilter.indexOf(academy) == -1) {
        academyFilter.push(academy);
      } else {
        academyFilter.pop(academy);
      }
    }
  }

  const initializeAcademyFilters = () => {
    setAcademyFilter(academy_array);
  }

  useInterval(() => {
    submitGetPeopleRequest();
  }, 100);

  useEffect(() => {
    submitGetPeopleRequest();
    initializeAcademyFilters();
  }, [])

  if (auth) {
    return (
      <div className="w-full grid grid-cols-2 divide-x h-auto overflow-x-hidden">
        <div className="">
          <h1 className="py-3 text-3xl font-bold text-stone-600 inline-block align-middle">Directory</h1>
          <div className="search px-10">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="search" onChange={inputHandler} placeholder="Search alumni directory" className="input input-bordered input-info block w-full focus:border-sky-400 focus:ring-0 pl-10"></input>
            </div>
            <div className="form-control">
              <h1 className="text-lg font-bold text-left mt-2">Academies</h1>
              <AcademyFilterCheckboxes academies={academy_array} entriesPerRow={5} filterFunctionGenerator={academyFilterFunctionGenerator}></AcademyFilterCheckboxes>
              {/* <label className="label cursor-pointer">
                <span className="text-sm">AAST</span>
                <input type="checkbox" defaultChecked={true} className="checkbox checkbox-info checkbox-sm" onClick={() => null} />
                <span className="text-sm">AMST</span>
                <input type="checkbox" defaultChecked={true} className="checkbox checkbox-info checkbox-sm" onClick={() => null} />
                <span className="text-sm">AEDT</span>
                <input type="checkbox" defaultChecked={true} className="checkbox checkbox-info checkbox-sm" onClick={() => null} />
                <span className="text-sm">ABF</span>
                <input type="checkbox" defaultChecked={true} className="checkbox checkbox-info checkbox-sm" onClick={() => null} />
                <span className="text-sm">ATCS</span>
                <input type="checkbox" defaultChecked={true} className="checkbox checkbox-info checkbox-sm" onClick={() => null} />
              </label>
              <label className="label cursor-pointer">
                <span className="text-sm">ACAHA</span>
                <input type="checkbox" defaultChecked={true} className="checkbox checkbox-info checkbox-sm" onClick={() => null} />
                <span className="text-sm">AVPA-M</span>
                <input type="checkbox" defaultChecked={true} className="checkbox checkbox-info checkbox-sm" onClick={() => null} />
                <span className="text-sm">AVPA-V</span>
                <input type="checkbox" defaultChecked={true} className="checkbox checkbox-info checkbox-sm" onClick={() => null} />
                <span className="text-sm">AVPA-T</span>
                <input type="checkbox" defaultChecked={true} className="checkbox checkbox-info checkbox-sm" onClick={() => null} />
              </label> */}
              <h1 className="text-lg font-bold text-left mt-2">Graduation Year</h1>

              <input type="range" min="0" max="100" value="40" className="range range-info" />

            </div>
            {/* <YearFilterComponent input={YearFilterHandler}></YearFilterComponent>
            <AcademyFilterComponent Academies={academy_array} RegisterFilters={Academy_filter}></AcademyFilterComponent>
            
            <YearFilterToast input={yearFilter}></YearFilterToast>
            <AcademyFilterToast input={academyFilter}></AcademyFilterToast> */}
            <div className="divider"></div>
            <PeopleGeneratorComponent createArchiveUserFunctionGenerator={createArchiveUserFunctionGenerator} people={people} switchFunctionGenerator={switchFunctionGenerator} createConversationFunctionGenerator={createConversationFunctionGenerator} />
          </div>
        </div>
        <div>
          <Person accountsID={currentAccountsID} createConversationFunctionGenerator={createConversationFunctionGenerator} loggedInID={loggedInID} />
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