import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route exact path="/home" element={<Home/>} />
          {/* <Route exact path="/analyze" element={<Analyze/>} /> */}
          <Route exact path="/about" element={<About/>} />
        </Routes>
      </Router>
      
    </>
  )
}