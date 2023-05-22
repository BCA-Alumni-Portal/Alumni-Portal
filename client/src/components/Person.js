import React, { useEffect, useState } from 'react';
import NonEditableProfilePicture from './NonEditableProfilePicture';
import NonEditableUserInformation from './NonEditableUserInformation';
import NonEditableDescription from './NonEditableDescription';
import ClickableSocials from './ClickableSocials';

function Person(props) {
    let createConversationFunc = props.createConversationFunctionGenerator(props.accountsID);

    return (
        <div className='w-full grid grid-cols-3 gap-8 mt-4 ml-10'>
            <div>
                <NonEditableProfilePicture accountsID={props.accountsID} />
            </div>
            <div className='col-span-2'>
                <NonEditableUserInformation accountsID={props.accountsID} />
            </div>
            <div className='col-span-3'>
                <NonEditableDescription accountsID={props.accountsID} />
            </div>
            <div className='col-span-3'>
                <ClickableSocials accountsID={props.accountsID} />
            </div>
            <div className="col-span-3">
                <button className="btn bg-sky-400 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 float-left normal-case text-xl" onClick={createConversationFunc}>Message</button>
            </div>
        </div>
    )
}

export default Person;