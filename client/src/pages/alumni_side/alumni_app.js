import AlumniNavbar from "./AlumniNavBar"
import JobPostings from "./JobPostings"
import Profile from "./Profile"
import Messages from "./Msgs"
import Directory from "./Directory"
import { Route, Routes } from "react-router-dom"

function alumni_app() {
  return (
    <>
      <AlumniNavbar />
      <div className="container">
        <Routes>
          {/* directory list of people */}
          <Route path="/" element={<Directory />} />
          <Route path="/jobs" element={<JobPostings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>

      </div>
    </>
  )
}

export default alumni_app;