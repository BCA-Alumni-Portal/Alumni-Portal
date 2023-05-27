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
      console.log(data);
    })
  }, [])
  if (auth) {
    return (
      <div >
        <div className="container">
          <div className="centered space-y-2">
            {/* <img class="h-auto max-w-3xl rounded-lg self-center mb-6 mt-6" src={alumni1} /> */}
            <div class="relative">
              <img class="h-auto max-w-full rounded-lg self-center mb-6 mt-6" src={alumni1} />
              <div class="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                <h1 class="text-7xl text-black mt-2 mb-2 ml-2 mr-2 tracking-wides">
                  Welcome to the BCA Alumni Portal!
                </h1>
              </div>
            </div>
            {/* <h1 className="text-5xl font-bold text-stone-600 align-bottom mt-4 self-center">Welcome to the BCA Alumni portal!</h1> */}
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
      // <div>
      //   <div className="container">
      //     <div className="centered space-y-2">
      //       <img class="h-auto max-w-3xl rounded-lg self-center mb-6 mt-6" src={alumni1} />
      //       <h1 className="text-5xl font-bold text-stone-600 align-bottom self-center">Welcome to the BCA Alumni portal - log in to continue!</h1>
      //       <LoginButton />
      //     </div>
      //   </div>
      // </div>
      <div >
        <div className="container">
          <div className="centered space-y-2">
            {/* <img class="h-auto max-w-3xl rounded-lg self-center mb-6 mt-6" src={alumni1} /> */}
            <div class="relative">
              <img class="h-auto max-w-full rounded-lg self-center mb-6 mt-6" src={alumni1} />
              <div class="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                <h1 class="text-4xl text-black mt-2 ml-2 mr-2 tracking-wides">
                  Welcome to the BCA Alumni portal - log in to continue!
                </h1>
                <LoginButton/>
              </div>
            </div>
            {/* <h1 className="text-5xl font-bold text-stone-600 align-bottom mt-4 self-center">Welcome to the BCA Alumni portal!</h1> */}
          </div>
        </div>
      </div>)
  }

}