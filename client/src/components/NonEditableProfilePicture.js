import personImage2 from '../images/person2.png';
import React, { useEffect, useState } from 'react';
import CommunicationHandler from './CommunicationHandler';

function NonEditableProfilePicture(props) {
    const [profilePictureFile, setProfilePictureFile] = useState(null);

    // pull profile picture from database using props.alumniID
    useEffect(() => {
        // pull profilepicture from database
        // if null: setProfilePictureFile(personImage2);
        // else: setProfilePictureFile(string)
        setProfilePictureFile(personImage2);
        CommunicationHandler.getProfilePicture(setProfilePictureFile, props.alumniID);
    }, []);


    return (
        <div className="avatar" >
            <div className="w-64 rounded-full">
                <img id="pfp" src={profilePictureFile} />
            </div>
        </div>
    );
}

export default NonEditableProfilePicture;