import React from "react";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import AdminPage from "./AdminPage";
import LearningPage from "./LearningPage";

class App extends React.Component {
  componentDidMount() {
    document.title = "Opettele kieliä";
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <nav>
            <ul className="nav">
              <li className="navBar">
                <Link to="/">oppilas</Link>
              </li>
              <li className="navBar">
                <Link to="/teacher">opettaja</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<LearningPage />} />
            <Route path="/teacher" element={<AdminPage />} />
            <Route path="*" element={<h1>Väärä osoite</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
