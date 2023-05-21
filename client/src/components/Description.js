import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommunicationHandler from './CommunicationHandler';
import { Circles, Grid } from 'react-loader-spinner'

export default function Description(props) {

    const [description, setDescription] = useState("");
    const [editing, setEditing] = useState(false);
    const [auth, setAuth] = useState(props.auth);


    useEffect(() => {
        // pull from database and setDescription
        CommunicationHandler.getDescriptionByID(setDescriptionData);
    }, []);

    const setDescriptionData = (data) => {
        setDescription(data.description);
    }

    const changeDescription = (e) => {
        setDescription(e.target.value);
    }

    const edit = () => {
        setEditing(true);
    }

    const saveChanges = () => {
        setEditing(false);
        // push description to database
        CommunicationHandler.writeDescription(description);
    }

    return (
        <div>
            <Grid
                height="40"
                width="40"
                color="#38bdf7"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            {editing ?
                <div className='mt-4'>
                    <textarea className="textarea textarea-info text-xl w-11/12 focus:border-sky-400 focus:ring-0 inline-block align-middle float-left" placeholder="Tell us about yourself..." rows="4" value={description} maxLength={500} onChange={(e) => changeDescription(e)}></textarea>
                    <button className="btn btn-circle bg-green-400 hover:bg-gradient-to-r hover:from-green-300 hover:to-green-400 hover:border-green-300 border-green-100 inline-block align-bottom float-right" onClick={() => saveChanges()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline-block align-middle">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </button>
                </div>
                :
                <div className='mt-4'>
                    <p class="text-xl w-11/12 font-semibold text-stone-600 dark:text-white inline-block align-middle float-left text-left">{description == "" || description == null ? "Tell us about yourself..." : description}</p>
                    <button className="btn btn-circle bg-sky-400 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 inline-block align-bottom float-right" onClick={() => edit()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block align-middle">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                </div>}
        </div>

    )
}