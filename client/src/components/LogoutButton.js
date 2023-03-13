import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../index.css'

const LogoutButton = () => {

  return (
    <a href="/auth/logout">
      <button
        className="drop-shadow-lg text-3xl font-semibold hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 bg-amber-100 border border-amber-100 hover:border-amber-400 rounded py-2 px-4 "
      >
        Logout
      </button>
    </a>

  );

};

export default LogoutButton;