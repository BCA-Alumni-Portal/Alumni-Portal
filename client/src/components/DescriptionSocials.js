import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';

export default function DescriptionSocials() {
    const { user, isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const [description, setDescription] = useState(null);
    const [edited, setEdited] = useState(false);


    const changeDescription = (e) => {
        setDescription(e.target.value);
        setEdited(true);
    }

    const saveChanges = () => {
        setEdited(false);
        // push to database
    }

    return (
        <div>
            <textarea className="textarea w-full mt-4" placeholder="Tell us about yourself..." rows="4" onChange={(e) => changeDescription(e)}></textarea>
            {edited ?
                (<button className="btn btn-circle bg-sky-400 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 inline-block align-middle" onClick={() => saveChanges()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" color='stone-600' class="w-5 h-5 inline-block align-middle">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                    </svg>
                </button>) : null}
        </div>

    )
}