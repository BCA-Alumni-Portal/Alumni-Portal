import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./App.css"
import { BrowserRouter } from "react-router-dom"
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <div>
  <React.StrictMode>
    <BrowserRouter>
    <Auth0Provider
    // audience="https://dev-bh0d0r0nk8n1svw.us.auth0.com"
    cacheLocation="localstorage"
    domain= "dev-bh0d0r0nk8n1svwf.us.auth0.com"
    clientId= "hljLjyws5AJTCoNyZxFtG9F4HqS53e6P"
    redirectUri="http://localhost:3000">
      <App />
    </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
  </div>
)
