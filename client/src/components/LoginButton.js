import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; 
import '../index.css'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button class="bg-blue hover:bg-hover-blue text-2xl text-cream font-semibold py-2 px-4 rounded-full" onClick={() => {loginWithRedirect({ redirectUri: 'http://localhost:3000'})}}>
      Login
    </button>
    );
  
};

export default LoginButton;