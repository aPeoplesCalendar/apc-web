import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { About } from "./components/About/About";
import { Calendar } from "./components/Calendar/Calendar";
import { Contact } from "./components/Contact/Contact";
import { Homepage } from "./components/Homepage/Homepage";
import { NavBar } from "./components/Navbar/NavBar";
import { SpecificEvent } from "./components/SpecificEvent/SpecificEvent";
import { ROUTES } from "./constants/routes";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path={ROUTES.HOME} element={<Homepage />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.CALENDAR} element={<Calendar />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.SPECIFIC_EVENT} element={<SpecificEvent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
