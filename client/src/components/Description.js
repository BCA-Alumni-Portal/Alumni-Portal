import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';

export default function Description() {
    const { user, isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    // user.email == remkim23@bergen.org

    const [description, setDescription] = useState("");
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        // pull from database and setDescription

    }, []);

    const changeDescription = (e) => {
        setDescription(e.target.value);
    }

    const edit = () => {
        setEditing(true);
    }
    const saveChanges = () => {
        setEditing(false);
        // push description to database
    }

    return (
        <div>
            {editing ?
                <div className='mt-4'>
                    <textarea className="textarea textarea-info text-xl w-11/12 focus:border-sky-400 focus:ring-0 inline-block align-middle float-left" placeholder="Tell us about yourself..." rows="2" value={description} onChange={(e) => changeDescription(e)}></textarea>
                    <button className="btn btn-circle bg-green-400 hover:bg-gradient-to-r hover:from-green-300 hover:to-green-400 hover:border-green-300 border-green-100 inline-block align-bottom float-right" onClick={() => saveChanges()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline-block align-middle">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </button>
                </div>
                :
                <div className='mt-4'>
                    <p class="text-xl w-5/6 font-semibold text-stone-600 dark:text-white inline-block align-middle text-left">{description == "" ? "Tell us about yourself..." : description}</p>
                    <button className="btn btn-circle bg-sky-400 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 inline-block align-bottom float-right" onClick={() => edit()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block align-middle">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                </div>}
        </div>

    )
}