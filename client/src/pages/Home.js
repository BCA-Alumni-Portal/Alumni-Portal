import axios from 'axios';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import '../index.css';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get('/auth/current-session').then(({data}) => {
      setAuth(data);
      console.log(data)
    })
  }, [])

  return (
    <div>
      <div className="container">
        <div className="centered space-y-2">
          <h1 className="text-5xl font-bold text-stone-600 align-bottom">Welcome to BCA Alumni{auth ? "!": " - log in to continue!"}</h1>
          {!auth ? <LoginButton />: null}
        </div>
      </div>
    </div>
  );
}