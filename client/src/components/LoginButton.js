import React from "react";
// import { useAuth0 } from "@auth0/auth0-react"; 
import '../index.css'

const LoginButton = () => {
  // const { loginWithRedirect } = useAuth0();

  return (
    <a href="/auth/login">
      <button
        className="drop-shadow-lg text-3xl font-semibold hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 bg-amber-100 border border-amber-100 hover:border-amber-400 rounded py-2 px-4 mb-2"
      >
        Login
      </button>
    </a>

  );

};

export default LoginButton;