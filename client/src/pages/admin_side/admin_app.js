import AdminNavbar from "./AdminNavBar"
import Customize from "./Customize"
import Data from "./Data"
import Email from "./Email"
import Default_screen from "../../Default_screen"
import { Route, Routes } from "react-router-dom"

function Admin() {
  return (
    <>
      <AdminNavbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Default_screen />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/data" element={<Data />} />
          <Route path="/email" element={<Email />} />
          
        </Routes>
      </div>
    </>
  )
}

export default Admin;