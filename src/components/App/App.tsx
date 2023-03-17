import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { About } from "../About/About";
import { Calendar } from "../Calendar/Calendar";
import { SpecificEvent } from "../Calendar/SpecificEvent/SpecificEvent";
import { Contact } from "../Contact/Contact";
import { Homepage } from "../Homepage/Homepage";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { ROUTES } from "../../constants/routes";
import { backgroundColor, theme } from "../../constants/globalStyles";
import { ResponsiveAppContainer } from "../ResponsiveAppContainer/ResponsiveAppContainer";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import { NotFound } from "../NotFound/NotFound";
import { AppMetaTags } from "./AppMetaTags";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App" style={{ backgroundColor }}>
      <HelmetProvider>
        <AppMetaTags />
        <QueryClientProvider client={queryClient}>
          <ToastContainer
            autoClose={800}
            theme={"dark"}
            hideProgressBar
            closeButton={false}
          />
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <Router>
              <NavigationBar />
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
      </HelmetProvider>
    </div>
  );
}

export default App;
