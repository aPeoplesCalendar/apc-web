import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Homepage } from "./components/Homepage/Homepage";
import { ROUTES } from "./constants/routes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
