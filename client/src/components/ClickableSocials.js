import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ClickableSocials(props) {
    const [linkedIn, setLinkedIn] = useState("");
    const [linkedInLink, setLinkedInLink] = useState("");

    useEffect(() => {
        // pull from database and setLinkedIn
        getInfo();
        console.log(linkedIn)
        setLinkedInLink("https://linkedin.com/in/" + linkedIn + "/");
    }, [props]);


    const packGetData = () => {
        return {
            alumni_id: props.alumniID
        }
    }


    const getInfo = () => {
        let data = packGetData();
        let result = axios.get("/api/readSocialsRequestByID", { params: data }).then(res => {
            let data = res.data;
            console.log(data);
            if (data != null) {
                setLinkedIn(data.linkedin);
            }
        });
    }

    return (
        <div>
            {linkedIn == null ? null :
                <a href={linkedInLink} target="_blank" rel="noopener noreferrer">
                    <button className="btn bg-sky-400 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 float-left normal-case text-xl" >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                        </svg>
                        {"LinkedIn"}
                    </button>
                </a>
            }
        </div>
    )
}
