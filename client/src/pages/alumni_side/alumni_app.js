import AlumniNavbar from "./AlumniNavBar"
import JobPostings from "./JobPostings"
import People from "./People"
import Messages from "./Msgs"
import { Route, Routes } from "react-router-dom"

function alumni_app() {
  return (
    <>
      <AlumniNavbar />
      <div className="container">
        <Routes>
          {/* directory list of people */}
          <Route path="/" element={<JobPostings />} />
          <Route path="/people" element={<People />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>

      </div>
    </>
  )
}

export default alumni_app;