import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { NotFound } from "./components/NotFound/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App" style={{ backgroundColor }}>
      <QueryClientProvider client={queryClient}>
        <AppMetaTags />
        <ToastContainer
          autoClose={800}
          theme={"dark"}
          hideProgressBar
          closeButton={false}
        />
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <Router>
            <NavBar />
            <ErrorBoundary>
              <ResponsiveAppContainer>
                <Routes>
                  <Route path={ROUTES.HOME} element={<Homepage />} />
                  <Route path={ROUTES.ABOUT} element={<About />} />
                  <Route
                    path={ROUTES.CALENDAR_GENERIC}
                    element={<Calendar />}
                  />
                  <Route path={ROUTES.CONTACT} element={<Contact />} />
                  <Route
                    path={ROUTES.SPECIFIC_EVENT}
                    element={<SpecificEvent />}
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ResponsiveAppContainer>
            </ErrorBoundary>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
