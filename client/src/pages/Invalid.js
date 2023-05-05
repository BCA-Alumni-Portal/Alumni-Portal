import axios from 'axios';
import LoginButton from '../components/LoginButton';
import InvalidLogoutButton from '../components/InvalidLogoutButton';
import '../index.css';
import React, { useEffect, useState } from 'react';

export default function Home() {
    //   const [auth, setAuth] = useState(null);

    //   useEffect(() => {
    //     axios.get('/auth/current-session').then(({ data }) => {
    //       setAuth(data);
    //       console.log(data)
    //     })
    //   }, [])
    return (
        <div className="centered space-y-2">
            <h1 className="text-5xl font-bold text-stone-600 align-bottom mt-4 self-center">You're not supposed to be here!</h1>
            <InvalidLogoutButton/>
        </div>
    );


}