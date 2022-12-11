import AlumniNavbar from "./AlumniNavBar"
import News from "./News"
import Profile from "./Profile"
import Messages from "./Msgs"
import Default_screen from "../../Default_screen"
import { Route, Routes } from "react-router-dom"

function alumni_app() {
  return (
    <>
      <AlumniNavbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Default_screen />} />
          <Route path="/news" element={<News />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>

      </div>
    </>
  )
}

export default alumni_app;