import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './styles/Me.css';
import ProfilePicture from '../components/ProfilePicture';
import UserInformation from '../components/UserInformation';
import Description from '../components/Description';
import Socials from '../components/Socials';
import Home from './Home';


export default function Me() {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        axios.get('/auth/current-session').then(({ data }) => {
            setAuth(data);
        })
    }, [])
    if (auth) {
        return (
            <div className='flex justify-center'>
                <div className='max-w-4xl grid grid-cols-3 gap-8 mt-4'>
                    <div>
                        <ProfilePicture auth={auth} />
                    </div>
                    <div className='col-span-2'>
                        <UserInformation auth={auth} />
                    </div>
                    <div className='col-span-3'>
                        <Description auth={auth} />
                    </div>
                    <div className='col-span-3'>
                        <Socials auth={auth} />
                        <input type="checkbox" checked="checked" className="checkbox" />

                    </div>
                </div>

            </div>
        )
    }
    else if (auth === null) {
        // loading
        return <div></div>
    }
    else {
        return <Home />;
    }

}