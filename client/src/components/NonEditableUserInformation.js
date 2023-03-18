import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';


function NonEditableUserInformation(props) {

  // user information
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [academy, setAcademy] = useState("");

  useEffect(() => {
    // pull from database and fill in fields: company, graduationYear (as string), pronouns, academy
    // graduationYear, academy = required
    // pronouns, company = optional
    // SQL -> client
    getInfo();
    // console.log("UPDATING USER INFO");
  }, [props]);
  

  const getInfo = () => {
      let data = packGetData();
      // console.log(props.info);
      // console.log(props.alumniID);
      let result = axios.get("/api/readProfileDataRequestByID", { params: data }).then(res => {
        let data = res.data;
        // console.log(data);
        if (data != null) {
          setCompany(data.company || "");
          setGraduationYear(data.graduation_year);
          setPronouns(data.pronouns || "");
          setAcademy(data.academy);
          setName(data.first_name + " " + data.last_name);
        }
      });
  }

  const packGetData = () => {
    return {
      alumni_id: props.alumniID
    }
  }

  const checkCompany = () => {
    return company != "";
  }

  const checkPronouns = () => {
    return pronouns != "";
  }

  return (
    <div className="text-left ml-12">
      <div className='mb-5'>
        <h1 className="text-4xl font-bold text-stone-600 mr-6 inline-block align-middle">{name}</h1>
        <div>
          <div className='mb-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 float-left mt-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
            <p class="text-3xl font-semibold text-stone-600 dark:text-white w-full max-w-xs ml-4 mt-2 inline-block align-middle">Class of {graduationYear}</p>
          </div>
          <div className='mb-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 float-left mt-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
            <p class="text-3xl font-semibold  text-stone-600 dark:text-white w-full max-w-xs ml-4 mt-2 inline-block align-middle">{academy}</p>
          </div>
          {checkCompany() ? (
            <div className='mb-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 float-left mt-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
              </svg>
              <p class="text-3xl font-semibold  text-stone-600 dark:text-white w-full max-w-xs ml-4 mt-2 inline-block align-middle">{company}</p>
            </div>
          ) : null
          }
          {checkPronouns() ? (
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 float-left mt-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <p class="text-3xl font-semibold text-stone-600 dark:text-white w-full max-w-xs ml-4 mt-2 inline-block align-middle">{pronouns}</p>
            </div>
          ) : null
          }
        </div>
      </div>
    </div>
  );
}


export default NonEditableUserInformation;