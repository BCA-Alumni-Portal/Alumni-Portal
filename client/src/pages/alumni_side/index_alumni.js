import React from "react"
import ReactDOM from "react-dom/client"
import Alumni_app from "./pages/alumni_side/alumni_app.js"
import "./App.css"
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <div>
  <React.StrictMode>
    <BrowserRouter>
      <Alumni_app />
    </BrowserRouter>
  </React.StrictMode>
  </div>
)
