import Navbar from "./components/NavBar"
import Home from "./pages/Home"
import About from "./pages/About"
import People from "./pages/People"
import Jobs from "./pages/Jobs"
import Messages from "./pages/Messages"
import Me from "./pages/Me"

import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div>
      <Navbar/>
       <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/people" element={<People />}/>
          <Route path="/jobs" element={<Jobs />}/>
          <Route path="/messages" element={<Messages />}/>
          <Route path="/me" element={<Me />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App;
