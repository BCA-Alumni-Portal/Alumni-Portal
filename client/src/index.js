import {
  Ripple,
  initTE,
} from "tw-elements";


import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import "./App.css"
import { BrowserRouter } from "react-router-dom"
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"))
initTE({ Ripple });
root.render(
  <div>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>
)
