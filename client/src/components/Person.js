import React, { useEffect, useState } from 'react';
import personImage2 from '../images/person2.png';
import NonEditableProfilePicture from './NonEditableProfilePicture';
import NonEditableUserInformation from './NonEditableUserInformation';

function Person(props) {
    const [profilePictureFile, setProfilePictureFile] = useState(null);

    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [graduationYear, setGraduationYear] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [academy, setAcademy] = useState("");




    useEffect(() => {
        // pull profilepicture from database
        // if null: setProfilePictureFile(personImage2);
        // else: setProfilePictureFile(string)
        setProfilePictureFile(personImage2);
    }, []);


    return (
        <div className='flex justify-center'>
            <div className='max-w-xl grid grid-cols-3 gap-8 mt-4'>
                <div>
                    <NonEditableProfilePicture alumniID={props.alumniID}/>
                </div>
                <div className='col-span-2'>
                    <NonEditableUserInformation alumniID={props.alumniID}/>
                </div>
            </div>
        </div>
    )
}

export default Person;