import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import AddCredential from "./pages/AddCredential";
import MatchesPage from "./pages/MatchesPage";
import TeamPage from "./pages/TeamPage";
import "./style.css";
import React, { Component } from "react";

class App extends Component {
  state = {
    role: 0,
  };
  handleSetRole = (newRole) => {
    this.setState({ role: newRole });
  };
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  role={this.state.role}
                  onSetRole={this.handleSetRole}
                />
              }
            />
            <Route path="/add" element={<Add role={this.state.role} />} />
            <Route
              path="/add_credential"
              element={<AddCredential role={this.state.role} />}
            />
            <Route
              path="/login"
              element={
                <Login role={this.state.role} onSetRole={this.handleSetRole} />
              }
            />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/get/matches/:year" element={<MatchesPage />} />
            <Route path="/get/team/:year" element={<TeamPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
