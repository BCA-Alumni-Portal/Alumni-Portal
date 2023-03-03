import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Socials() {
    const { user, isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();


    const [linkedIn, setLinkedIn] = useState("");

    useEffect(() => {
        // pull from database and setLinkedIn
        getInfo();
    }, []);

    const toggleLinkedInModal = () => {
        document.getElementById('linkedin-modal').checked = !document.getElementById('linkedin-modal').checked;
    }

    const changeLinkedIn = (e) => {
        setLinkedIn(e.target.value);
    }

    const packGetData = () => {
        return {
            email_address: user.email
        }
    }

    const packSendData = () => {
        return {
            email_address: user.email,
            linkedin: linkedIn
        }
    }

    const getInfo = () => {
        let data = packGetData();
        let result = axios.get("http://localhost:5000/readSocialsRequest", { params: data }).then(res => {
            let data = res.data;
            console.log(data);
            if (data != null) {
                setLinkedIn(data.linkedin);
            }
        });
    }

    const saveChanges = () => {
        document.getElementById('linkedin-modal').checked = false;

        // push linkedin to database

        let data = packSendData();
        let result = axios.get("http://localhost:5000/updateSocialsRequest", { params: data }).then(res => {
            let data = res.data;
            console.log(data);
            if (data != null) {

            }
        });
    }

    return (
        <div>
            <button className="btn bg-sky-400 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 float-left normal-case text-xl" onClick={() => toggleLinkedInModal()}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
                {"Add your LinkedIn"}
            </button>
            <input type="checkbox" id="linkedin-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <div className="text-left mb-2">
                        <h3 className="text-xl font-bold text-stone-600">Add your LinkedIn</h3>
                        <button className="btn btn-sm btn-circle absolute right-2 top-2 bg-stone-600" onClick={() => toggleLinkedInModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text"></span>
                        </label>
                        <label className="input-group">
                            <span>linkedin.com/in/</span>
                            <input type="text" placeholder="username" value={linkedIn} onChange={(e) => changeLinkedIn(e)} className="input input-bordered input-info input-lg focus:border-sky-400 focus:ring-0 w-full max-w-xs" />
                        </label>
                    </div>
                    <div>
                        <button
                            className="drop-shadow-lg text-lg font-bold mt-4 text-stone-600 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 bg-amber-100 border border-amber-100 hover:border-amber-400 rounded py-2 px-4 "
                            onClick={() => saveChanges()}
                        >
                            Add LinkedIn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
