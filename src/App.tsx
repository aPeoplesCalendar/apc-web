import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About } from "./components/About/About";
import { Calendar } from "./components/Calendar/Calendar";
import { SpecificEvent } from "./components/Calendar/SpecificEvent/SpecificEvent";
import { Contact } from "./components/Contact/Contact";
import { Homepage } from "./components/Homepage/Homepage";
import { NavBar } from "./components/Navbar/NavBar";
import { ROUTES } from "./constants/routes";
import { backgroundColor, theme } from "./constants/globalStyles";

function App() {
  return (
    <div className="App" style={{ backgroundColor }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Router>
          <NavBar />
          {/* TO DO: proper layout component goes here */}
          <div style={{ width: "80%", margin: "auto" }}>
            <Routes>
              <Route path={ROUTES.HOME} element={<Homepage />} />
              <Route path={ROUTES.ABOUT} element={<About />} />
              <Route path={ROUTES.CALENDAR_GENERIC} element={<Calendar />} />
              <Route path={ROUTES.CONTACT} element={<Contact />} />
              <Route path={ROUTES.SPECIFIC_EVENT} element={<SpecificEvent />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
