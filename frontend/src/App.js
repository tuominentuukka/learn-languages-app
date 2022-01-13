import React from "react";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import AdminPage from "./AdminPage";
import LearningPage from "./LearningPage";
import Box from "@mui/material/Box";

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

class App extends React.Component {
  componentDidMount() {
    document.title = "Opettele kieliä";
  }

  render() {
    return (
      <BrowserRouter>
        <Box className="App">
          <Box>
            <AppBar position="static">
              <Toolbar color="white" style={{ backgroundColor: "white" }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    marginRight: "100px",
                  }}
                >
                  <Link to="/">oppilas</Link>
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    marginLeft: "100px",
                  }}
                >
                  <Link to="/teacher">opettaja</Link>
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>

          <Routes>
            <Route path="/" element={<LearningPage />} />
            <Route path="/teacher" element={<AdminPage />} />
            <Route path="*" element={<h1>Väärä osoite</h1>} />
          </Routes>
        </Box>
      </BrowserRouter>
    );
  }
}

export default App;
