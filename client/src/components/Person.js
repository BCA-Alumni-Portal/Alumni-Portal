import React, { useEffect, useState } from 'react';
import personImage2 from '../images/person2.png';
import NonEditableProfilePicture from './NonEditableProfilePicture';
import NonEditableUserInformation from './NonEditableUserInformation';

function Person(props) {
    return (
        <div className='w-full grid grid-cols-3 gap-8 mt-4'>
            <div>
                <NonEditableProfilePicture alumniID={props.alumniID} />
            </div>
            <div className='col-span-2'>
                <NonEditableUserInformation alumniID={props.alumniID} />
            </div>
        </div>
    )
}

export default Person;