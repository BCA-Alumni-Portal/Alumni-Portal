import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './styles/Me.css';
import ProfilePicture from '../components/ProfilePicture';
import UserInformation from '../components/UserInformation';
import Description from '../components/Description';
import Socials from '../components/Socials';
import Home from './Home';
import Admin from './Admin'
import CommunicationHandler from '../components/CommunicationHandler';


export default function Me() {
    const [auth, setAuth] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        axios.get('/auth/current-session').then(({ data }) => {
            setAuth(data);
        })
        CommunicationHandler.getProfileData(setVisibility);
        CommunicationHandler.isAdmin().then((result) => {
            if (result != null) {
              setIsAdmin(result);
            }
          });
    }, [])

    const [visible, setVisible] = useState(null);


    const setVisibility = (data) => {
        setVisible(data.is_visible);
    }

    const packSendData = () => {
        return {
            email_address: auth.email,
            is_visible: visible
        }
    }

    useEffect(() => {
        if (auth) {
            let data = packSendData();
            console.log(data);
            CommunicationHandler.writeVisibility(data);
        }

    }, [visible])

    const changeVisibility = () => {
        if (visible == 1) {
            setVisible(0);
        }
        else {
            setVisible(1);
        }
    }

    if (auth && !isAdmin) {
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
                    </div>
                    <div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span>Make my profile public</span>
                                <input type="checkbox" defaultChecked={visible} className="checkbox checkbox-info" onClick={() => changeVisibility()} />
                            </label>
                        </div>
                        {/* <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Remember me</span>
                                <input type="checkbox" defaultChecked={visible}  className="toggle toggle-info" onChange={() => changeVisibility()}  />
                            </label>
                        </div> */}
                    </div>
                </div>

            </div>
        )
    }
    else if(auth){
        return <Admin />
    }
    else if (auth === null) {
        // loading
        return <div></div>
    }
    else {
        return <Home />;
    }

}