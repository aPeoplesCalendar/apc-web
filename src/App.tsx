import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About } from "./components/About/About";
import { Calendar } from "./components/Calendar/Calendar";
import { SpecificEvent } from "./components/Calendar/SpecificEvent/SpecificEvent";
import { Contact } from "./components/Contact/Contact";
import { Homepage } from "./components/Homepage/Homepage";
import { NavBar } from "./components/Navbar/NavBar";
import { ROUTES } from "./constants/routes";
import { backgroundColor, theme } from "./constants/globalStyles";
import { ResponsiveAppContainer } from "./components/ResponsiveAppContainer/ResponsiveAppContainer";
import { AppMetaTags } from "./AppMetaTags";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App" style={{ backgroundColor }}>
      <QueryClientProvider client={queryClient}>
        <AppMetaTags />
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <Router>
            <NavBar />
            <ResponsiveAppContainer>
              <Routes>
                <Route path={ROUTES.HOME} element={<Homepage />} />
                <Route path={ROUTES.ABOUT} element={<About />} />
                <Route path={ROUTES.CALENDAR_GENERIC} element={<Calendar />} />
                <Route path={ROUTES.CONTACT} element={<Contact />} />
                <Route
                  path={ROUTES.SPECIFIC_EVENT}
                  element={<SpecificEvent />}
                />
              </Routes>
            </ResponsiveAppContainer>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
