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
    username: "",
  };
  handleSetRole = (newRole) => {
    this.setState({ role: newRole });
  };
  handleSetUsername = (newUsername) => {
    this.setState({ username: newUsername });
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
              element={<AddCredential role={this.state.role} username = {this.state.username} onSetUsername={this.handleSetUsername}/>}
            />
            <Route
              path="/login"
              element={
                <Login role={this.state.role} onSetRole={this.handleSetRole} username = {this.state.username} onSetUsername={this.handleSetUsername}/>
              }
            />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/get/matches/:year" element={<MatchesPage 
              role={this.state.role}
              onSetRole={this.handleSetRole}
            />} />
            <Route path="/get/team/:year" element={<TeamPage role={this.state.role} onSetRole={this.handleSetRole}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
