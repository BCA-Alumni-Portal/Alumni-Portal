import React from "react"
import ReactDOM from "react-dom/client"
import Admin from "./pages/admin_side/admin_app.js"
import "./App.css"
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <div>
  <React.StrictMode>
    <BrowserRouter>
      <Admin />
    </BrowserRouter>
  </React.StrictMode>
  </div>
)
