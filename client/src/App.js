import Navbar from "./components/NavBar"
import Home from "./pages/Home"
import About from "./pages/About"
import People from "./pages/People"
import Jobs from "./pages/Jobs"
import Messages from "./pages/Messages"
import Me from "./pages/Me"
import Register from "./pages/Register"
import Test from "./pages/Test"
import Admin from "./pages/Admin"
import Invalid from './pages/Invalid'

import { Route, Routes } from "react-router-dom"

function App() {
  console.log(process.env.NODE_ENV)

  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/people" element={<People />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/me" element={<Me />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<Test />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/invalid" element={<Invalid />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App;
