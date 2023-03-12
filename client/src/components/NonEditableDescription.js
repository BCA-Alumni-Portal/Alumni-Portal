import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function NonEditableDescription(props) {

    const [description, setDescription] = useState("");

    useEffect(() => {
        // pull from database and setDescription
        getInfo();
    }, []);

    const packGetData = () => {
        return {
            alumni_id: props.alumniID
        }
    }

    const getInfo = () => {
        let data = packGetData();
        let result = axios.get("http://localhost:5000/readDescriptionRequestByID", { params: data }).then(res => {
            let data = res.data;
            console.log(res);
            console.log(data);
            if (data != null) {
                if(data.description=="" || data.description==null){
                    setDescription("This person likes to stay secretive...")
                }
                else{
                    setDescription(data.description);
                }
            }
        });
    }
    return (
        <div className='mt-4'>
            <p class="text-xl w-11/12 font-semibold text-stone-600 dark:text-white inline-block align-middle float-left text-left">{description}</p>
        </div>

    )
}