import React, { useEffect, useState } from 'react';
import personImage2 from '../images/person2.png';
import NonEditableProfilePicture from './NonEditableProfilePicture';
import NonEditableUserInformation from './NonEditableUserInformation';
import NonEditableDescription from './NonEditableDescription';
import ClickableSocials from './ClickableSocials';

function Person(props) {
    return (
        <div className='w-full grid grid-cols-3 gap-8 mt-4 ml-10'>
            <div>
                <NonEditableProfilePicture alumniID={props.alumniID} />
            </div>
            <div className='col-span-2'>
                <NonEditableUserInformation alumniID={props.alumniID} />
            </div>
            <div className='col-span-3'>
                <NonEditableDescription alumniID={props.alumniID} />
            </div>
            <div className='col-span-3'>
                <ClickableSocials alumniID={props.alumniID}/>
            </div>
        </div>
    )
}

export default Person;