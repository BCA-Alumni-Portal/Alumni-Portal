import axios from 'axios';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import '../index.css';
import React, { useEffect, useState } from 'react';
import alumni1 from '../images/alumni1.jpg';

export default function Home() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get('/auth/current-session').then(({ data }) => {
      setAuth(data);
      console.log(data)
    })
  }, [])
  if (auth) {
    return (
      <div>
        <div className="container">
          <div className="centered space-y-2">
            <img class="h-auto max-w-3xl rounded-lg self-center mb-6 mt-6" src={alumni1} />
            <h1 className="text-5xl font-bold text-stone-600 align-bottom mt-4 self-center">Welcome to BCA Alumni!</h1>
          </div>
        </div>
      </div>
    );
  }
  else if (auth === null) {
    return <div></div>;
  }
  else {
    return (
    <div>
      <div className="container">
        <div className="centered space-y-2">
          <img class="h-auto max-w-3xl rounded-lg self-center mb-6 mt-6" src={alumni1} />
          <h1 className="text-5xl font-bold text-stone-600 align-bottom self-center">Welcome to BCA Alumni - log in to continue!</h1>
          <LoginButton />
        </div>
      </div>
    </div>)
  }

}